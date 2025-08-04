import { HelloWave } from "@/components/HelloWave";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { Card } from "../components/card/Card";
import ComponentLoading from "../components/Loading/ComponentLoading";
import { CircularProgress } from "../components/progress/CircularProgress";
import useUserStore from "../stores/useUserStore";
import useAxios from "../utils/axios/useAxios";
import { taskProgressMessages } from "@/constants/Title";

export default function HomeScreen() {
  const [todayTasks, setTodayTasks] = useState(0);
  const [upcomingTasks, setUpcomingTasks] = useState(0);
  const [completedTask, setCompletedTask] = useState(0);

  const { user } = useUserStore();
  const { AxiosRequest } = useAxios();

  useEffect(() => {
    if (user?.list?.length) {
      const allTasks = user.list.flatMap((list) => list.tasks || []);
      const todayTaskCount = allTasks.filter(
        (task) => task.period === "Today"
      ).length;
      const upcomingTaskCount = allTasks.filter(
        (task) => task.period === "Upcoming"
      ).length;
      const completedTaskCount = allTasks.filter(
        (task) => task.completed === true
      ).length;
      setTodayTasks(todayTaskCount);
      setUpcomingTasks(upcomingTaskCount);
      setCompletedTask(completedTaskCount);
    }
  }, [user]);

  const { data: completedTasksRate, isLoading: isCompletedRateLoading } =
    useQuery({
      queryKey: ["completedTasksRate"],
      queryFn: async () => {
        const response = await AxiosRequest({
          url: `/users/rate/${user?.id}`,
          method: "GET",
        });
        return response.data;
      },
      refetchOnWindowFocus: false,
    });


    //get message randomly

    const getMessageByRate=(rate:number)=>{
      return taskProgressMessages.find(({range}) =>rate>= range[0] && rate<=range[1]);
    }

  const message = getMessageByRate(completedTasksRate?.completionRate || 0);

  return (
    <SafeAreaView style={styles.container}>
      {isCompletedRateLoading && <ComponentLoading />}
      <ThemedView style={styles.headerContainer}>
        <ThemedText type="title" style={styles.subtitle}>
          Good Morning
        </ThemedText>
        <ThemedView style={styles.subHeaderContainer}>
          <ThemedText type="title">{user?.name}</ThemedText>
          <HelloWave />
        </ThemedView>
      </ThemedView>
      <ThemedView style={styles.cardContainer}>
        <Card title="Today" subtitle={todayTasks} style={styles.card1} />
        <Card title="Upcoming" subtitle={upcomingTasks} style={styles.card2} />
        <Card title="Completed" subtitle={completedTask} style={styles.card3} />
      </ThemedView>
      <ThemedView style={styles.performanceContainer}>
        <ThemedView style={{ width: 140 }}>
<CircularProgress
          size={140}
          strokeWidth={15}
          progress={completedTasksRate?.completionRate || 0}
          color="#2B9AAF"
          content={
            <ThemedView>
              <ThemedView style={styles.innerIcon}>
                <SimpleLineIcons name="fire" size={15} color="#ffffff" />
              </ThemedView>
              <ThemedText style={styles.innerCircleText}>
                {completedTasksRate?.completedTasks} out of{" "}
                {completedTasksRate?.totalTasks} tasks
              </ThemedText>
              <ThemedText type="subtitle" style={styles.innerCircleValue}>
                {completedTasksRate?.completionRate}%
              </ThemedText>
            </ThemedView>
          }
        />
        </ThemedView>
        
        <ThemedView style={styles.performanceRightContainer}>
          <ThemedText type="defaultSemiBold" style={{ color: "#292D32" }}>
            Performance
          </ThemedText>
          <ThemedView style={styles.tips}>
            <MaterialCommunityIcons
              name="lightbulb-on-outline"
              size={24}
              color="#256679"
            />
            <ThemedText
              style={{ color: "#256679", fontSize: 15, fontWeight: "500" }}
            >
              Tips
            </ThemedText>
          </ThemedView>
          <ThemedView style={styles.messages}>
            <ThemedView style={styles.messageTitle}>
           
              <ThemedText
                style={{
                  color: "#000000",
                  fontSize: 14,
                  fontWeight: "600",
                  textAlign: "center",
                }}
              >
                {message?.title}
              </ThemedText>
            </ThemedView>
            <ThemedText type="subtitle" style={styles.messageText}>
              {message?.description}
            </ThemedText>
          </ThemedView>
        </ThemedView>
      </ThemedView>
      <ThemedView></ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 50,
    backgroundColor: "#E9F4FA",
  },

  headerContainer: {
    flexDirection: "column",
    gap: 12,
    backgroundColor: "transparent",
  },
  filling: {
    width: "100%",
    height: 10,
    backgroundColor: "#2B9AAF",
    borderRadius: 5,
  },

  subtitle: {
    color: "#696969",
    opacity: 0.5,
    fontWeight: "500",
  },
  subHeaderContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "transparent",
  },

  cardContainer: {
    flexDirection: "row",
    height: 115,
    gap: 5,
    marginTop: 26,
    backgroundColor: "transparent",
  },

  card1: {
    backgroundColor: "#2B9AAF",
  },
  card2: {
    backgroundColor: "#608197",
  },
  card3: {
    backgroundColor: "#8678DA",
  },

 performanceContainer: {
  flexDirection: "row",
  gap: 16,
  borderRadius: 20,
  marginTop: 16,
  paddingHorizontal: 16,
  paddingVertical: 16,
  backgroundColor: "#fff",
  alignItems: "center",
},

  tips: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 2,
    padding: 8,
    backgroundColor: "#D7F2F6",
    borderRadius: 40,
    width: 76,
  },
  performanceRightContainer: {
     flex: 1,
  flexDirection: "column",
  gap: 8,
  flexShrink: 1,
  },
  performanceLeftContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 2,

    padding: 13,
  },
  innerIcon: {
    width: 31,
    height: 31,
    borderRadius: "50%",
    backgroundColor: "#2B9AAF",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  innerCircleText: {
    color: "#4C677D",
    fontSize: 10,
    fontWeight: "500",
  },
  innerCircleValue: {
    color: "#292D32",
    textAlign: "center",
  },

  messages: {
    alignItems: "center",
    gap:3,
  },
  messageTitle: {
    flexDirection: "row",
    alignSelf: "flex-start",
    gap: 8,
  },
  messageText: {
    color: "#4C677D",
    fontSize: 12,
    fontWeight: "500",
   
   
  },
});
