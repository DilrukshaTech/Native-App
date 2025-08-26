import { FlatList, StyleSheet } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { AntDesign } from "@expo/vector-icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { useMemo } from "react";

import FloatingButton from "../components/buttons/FloatButton";
import TaskCard from "../components/card/TaskCard";
import ComponentLoading from "../components/Loading/ComponentLoading";
import TopHeader from "../components/topHeader/TopHeader";
import useFeedbackAlertStore from "../stores/useFeedbackAlertStore";
import useUserStore from "../stores/useUserStore";
import useAxios from "../utils/axios/useAxios";
import { SafeContainer } from "@/components/SafeContainer";

interface taskProps {
  id: number;
}
export default function Tasks() {
  const router = useRouter();
  const { AxiosRequest } = useAxios();
  const { user } = useUserStore();
  const queryClient = useQueryClient();
  const { showFeedback } = useFeedbackAlertStore();

  // mylist
  const { data: myTasks, isFetching } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const response = await AxiosRequest({
        url: `/tasks/?completed=false&userId=${user?.id}`,
        method: "GET",
      });
      return response.data;
    },
    enabled: !!user?.id, 
    refetchOnWindowFocus: false,
  });

  const renderTasks = () => {
    if (isFetching || deleteMutate.isPending) {
      return <ComponentLoading />;
    }
  };

  // helpers (local-time aware)
  const startOfLocalDay = (d: Date) => {
    const x = new Date(d);
    x.setHours(0, 0, 0, 0);
    return x;
  };

  const isSameLocalDay = (a: Date, b: Date) =>
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();

  const formatYYYYMMDDLocal = (d: Date) => {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
  };

  // build list for FlatList

  const tasks = useMemo(() => {
    if (!myTasks) return [];

    return myTasks.map((task: any) => {
      const taskDate = new Date(task.Date); // ISO string from API
      const today = startOfLocalDay(new Date());
      const d0 = startOfLocalDay(taskDate);
      const tomorrow = new Date(today);
      tomorrow.setDate(today.getDate() + 1);

      // compute label from Date
      let computedLabel = "";
      if (isSameLocalDay(d0, today)) {
        computedLabel = "Today";
      } else if (isSameLocalDay(d0, tomorrow)) {
        computedLabel = "Tomorrow";
      } else {
        computedLabel = formatYYYYMMDDLocal(taskDate); // e.g. 2025-09-09
      }

      // prefer delayLabel if present and not completed
      const displayLabel =
        task.delayLabel && task.completed === false
          ? task.delayLabel
          : computedLabel;

      return {
        ...task,
        id: task.id,
        category: task.title,
        displayLabel,
      };
    });
  }, [myTasks]);

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (id: taskProps) => {
      try {
        const response = await AxiosRequest({
          url: `/tasks/complete?id=${id}&userId=${user?.id}`,
          method: "PATCH",
          data: {
            completed: true,
          },
        });

        return response.data;
      } catch {
        throw new Error();
      }
    },

    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      queryClient.invalidateQueries({ queryKey: ["completedTasksRate"] });
      queryClient.invalidateQueries({ queryKey: ["lists"] });
      queryClient.invalidateQueries({ queryKey: ["tasksbylist"] });
    },
    onError() {
      showFeedback("Failed to complete the task", "failed");
    },
  });

  const onSubmit = async (id: taskProps) => {
    await mutateAsync(id);
  };

  const deleteMutate = useMutation({
    mutationFn: async (id: taskProps) => {
      try {
        const response = await AxiosRequest({
          url: `/tasks/${id}}`,
          method: "DELETE",
        });

        return response.data;
      } catch {
        throw new Error();
      }
    }
    , onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      queryClient.invalidateQueries({ queryKey: ["completedTasksRate"] });
      queryClient.invalidateQueries({ queryKey: ["lists"] });
      queryClient.invalidateQueries({ queryKey: ["tasksbylist"] });
    },
    onError() {
      showFeedback("Failed to delete the task", "failed");
    }
  });

  const onDelete = async (id: taskProps) => {
    await deleteMutate.mutateAsync(id);
  };
  return (
    <SafeContainer>
      {renderTasks()}
      <FloatingButton onPress={() => router.push("/task/CreateTask")} />
      <TopHeader
        title="All Tasks"
        icon={
          <AntDesign
            name="close"
            size={30}
            color="#798494"
            onPress={() => router.push("/home")}
          />
        }
      />
      <ThemedView style={styles.tasksContainer}>
        {myTasks?.length ? (
          <FlatList
            data={tasks}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <TaskCard
                category={item.list.title}
                title={item.title}
                date={item.displayLabel}
                time={item.startTime}
                dataStyle={{
                  color:
                    item.delayLabel && item.completed === false
                      ? "red"
                      : "#777",
                }}
                onPress={() => onSubmit(item.id)}
                onDelete={() => onDelete(item.id)}
                onEdit={() => router.push(`/task/UpdateTask?id=${item.id}`)}
              />
            )}
          />
        ) : (
          <ThemedText style={{ textAlign: "center", alignItems: "center" }}>
            No tasks available
          </ThemedText>
        )}
      </ThemedView>
    </SafeContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  tasksContainer: {
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    flexDirection: "column",
    paddingTop: 20,
    gap: 16,
    backgroundColor: "#E9F1FA",
    height: "88%",
    borderTopLeftRadius: 26,
    borderTopRightRadius: 26,
    paddingHorizontal: 20,
  },
});
