import TopHeader from "@/app/components/topHeader/TopHeader";
import { ThemedView } from "@/components/ThemedView";

import { useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView, StyleSheet } from "react-native";
import useUserStore from "../../stores/useUserStore";
import useAxios from "../../utils/axios/useAxios";

import ComponentLoading from "@/app/components/Loading/ComponentLoading";
import TaskCard from "@/app/components/card/TaskCard";
import useFeedbackAlertStore from "@/app/stores/useFeedbackAlertStore";
import { ThemedText } from "@/components/ThemedText";
import { AntDesign } from "@expo/vector-icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback, useMemo } from "react";
import { FlatList } from "react-native-gesture-handler";
import { SafeContainer } from "@/components/SafeContainer";


interface taskProps{
  id:number
}

export default function Tasks() {
  const router = useRouter();
  const { user } = useUserStore();
  const { AxiosRequest } = useAxios();
  const { listId } = useLocalSearchParams<{ listId: string }>();
  const { title } = useLocalSearchParams<{ title: string }>();

  const queryClient = useQueryClient();
  const { showFeedback } = useFeedbackAlertStore();

  // mylist
  const { data: myTasks, isLoading } = useQuery({
    queryKey: ["tasksbylist", listId],
    queryFn: async () => {
      const response = await AxiosRequest({
        url: `/lists/u?listId=${listId}&userId=${user?.id}&completed=false`,
        method: "GET",
      });
      return response.data;
    },
    enabled: !!listId, // prevents unnecessary fetches. only renders when listId is available
    refetchOnWindowFocus: false,
  });

  console.log("myTasks", myTasks);
  const renderTasks = () => {
    if (isLoading) {
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

    return myTasks?.tasks?.map((task: any) => {
      const taskDate = new Date(task.Date);
      const today = startOfLocalDay(new Date());
      const d0 = startOfLocalDay(taskDate);
      const tomorrow = new Date(today);
      tomorrow.setDate(today.getDate() + 1);

      let computedLabel = "";
      if (isSameLocalDay(d0, today)) {
        computedLabel = "Today";
      } else if (isSameLocalDay(d0, tomorrow)) {
        computedLabel = "Tomorrow";
      } else {
        computedLabel = formatYYYYMMDDLocal(taskDate);
      }

      const displayLabel =
        task.delayLabel && task.completed === false
          ? task.delayLabel
          : computedLabel;

      return {
        ...task,
        id: task.id,
        category: myTasks.title,
        displayLabel,
      };
    });
  }, [myTasks]);


  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (id:taskProps) => {
      try {
        const response = await AxiosRequest({
          url: `/tasks/complete?id=${id}&userId=${user?.id}`,
          method: "PATCH",
          data:{
            completed:true
          }
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

  const onSubmit=async (id:taskProps)=>{
    await mutateAsync(id)
  }

  const renderItem = useCallback(
    ({ item }: { item: any }) => (
      <TaskCard
        category={item.category}
        title={item.title}
        date={item.displayLabel}
        time={item.startTime}
        dataStyle={{
          color: item.delayLabel && item.completed === false ? "red" : "#777",
        }}
        onPress={()=>onSubmit(item.id)}
      />
    ),
    []
  );

  return (
    <SafeContainer>
      {renderTasks()}
      <TopHeader
        title={title || "Tasks"}
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
        {tasks?.length ? (
          <FlatList
            data={tasks}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
            renderItem={renderItem}
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
    backgroundColor: "#fff",
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
    height: "85%",
    borderTopLeftRadius: 26,
    borderTopRightRadius: 26,
    paddingHorizontal: 20,
  },
});
