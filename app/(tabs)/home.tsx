import { HelloWave } from "@/components/HelloWave";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { taskProgressMessages } from "@/constants/Title";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import FloatingButton from "../components/buttons/FloatButton";
import { Card } from "../components/card/Card";
import ListCard from "../components/card/ListCard";
import ComponentLoading from "../components/Loading/ComponentLoading";
import { CircularProgress } from "../components/progress/CircularProgress";
import { ListProgressCircle } from "../components/progress/ListProgressCircle";
import useUserStore from "../stores/useUserStore";
import useAxios from "../utils/axios/useAxios";
import { EditFirbasePassword } from "../utils/firebase/firebaseAuth";

export default function HomeScreen() {
  const [todayTasks, setTodayTasks] = useState(0);
  const [upcomingTasks, setUpcomingTasks] = useState(0);
  const [completedTask, setCompletedTask] = useState(0);
  const [Time, setTime] = useState("");

  const { user,setUser} = useUserStore();
  const { AxiosRequest } = useAxios();
  const router = useRouter();

  const { data: userData, isLoading: userLoading } = useQuery({
    queryKey: ["user", user?.id],
    queryFn: async () => {
      const response = await AxiosRequest({
        url: `/users/${user?.id}`,
        method: "GET",
      });

      return response.data;
    },
    refetchOnWindowFocus: false,
    enabled: !!user?.id,
  
  });



  useEffect(() => {
    if (userData?.list?.length) {
      const allTasks = userData.list.flatMap((list: any) => list.tasks || []);
      const todayTaskCount = allTasks.filter(
        (task: any) => task.period === "Today"
      ).length;
      const upcomingTaskCount = allTasks.filter(
        (task: any) => task.period === "Upcoming"
      ).length;
      const completedTaskCount = allTasks.filter(
        (task: any) => task.completed === true
      ).length;
      setTodayTasks(todayTaskCount);
      setUpcomingTasks(upcomingTaskCount);
      setCompletedTask(completedTaskCount);
    }
  }, [userData]);

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

  // My list
  const { data: myList, isLoading: myListLoading } = useQuery({
    queryKey: ["lists"],
    queryFn: async () => {
      const response = await AxiosRequest({
        url: `/users/completed-rate/${user?.id}`,
        method: "GET",
      });
      return response.data;
    },
    refetchOnWindowFocus: false,
  });

  // console.log("My List", myList);
  //get message randomly

  const getMessageByRate = (rate: number) => {
    return taskProgressMessages.find(
      ({ range }) => rate >= range[0] && rate <= range[1]
    );
  };

  const message = getMessageByRate(completedTasksRate?.completionRate || 0);

  //current time calculation

  useEffect(() => {
    const currentHour = new Date().getHours();
    console.log("Current Hour:", currentHour);

    if (currentHour >= 0 && currentHour < 6) {
      setTime("Good Night");
    } else if (currentHour >= 6 && currentHour < 12) {
      setTime("Good Morning");
    } else if (currentHour >= 12 && currentHour < 17) {
      setTime("Good Afternoon");
    } else {
      setTime("Good Evening");
    }
   
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {(myListLoading || isCompletedRateLoading || userLoading) && (
        <ComponentLoading />
      )}

      <FloatingButton onPress={() => router.push("/list/createlist")} />
      <ScrollView
        scrollEnabled={true}
        showsVerticalScrollIndicator={false}
        style={{ flex: 1, backgroundColor: "#E9F4FA" }}
      >
        <ThemedView style={styles.headerContainer}>
          <ThemedText type="title" style={styles.subtitle}>
            {Time}
          </ThemedText>
          <ThemedView style={styles.subHeaderContainer}>
            <ThemedText type="title">{userData?.name}</ThemedText>
            <HelloWave />
          </ThemedView>
        </ThemedView>
        <ThemedView style={styles.cardContainer}>
          <Card title="Today" subtitle={todayTasks} style={styles.card1} />
          <Card
            title="Upcoming"
            subtitle={upcomingTasks}
            style={styles.card2}
          />
          <Card
            title="Completed"
            subtitle={completedTask}
            style={styles.card3}
          />
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
        <ThemedView style={styles.listContainer}>
          <ThemedText
            type="defaultSemiBold"
            style={{ color: "#272623", marginTop: 20 }}
          >
            My Lists
          </ThemedText>
          <ThemedView style={styles.mylistsContainer}>
            {myList?.listRates.map((list: any) => (
              <ListCard
                key={list.listId}
                rate={list.completionRate}
                title={list.listTitle}
                progress={
                  <ListProgressCircle
                    size={25}
                    progress={list.completionRate}
                    color={list.color}
                    backgroundColor="#D7F2F6"
                  />
                }
                taskCount={list.totalTasks}
                color={list.color}
                backgroundOpacity={0.2}
                onPress={() =>
                  router.push(
                    `/list/TasksByListId?listId=${list.listId}&title=${list.listTitle}`
                  )
                }
              />
            ))}
          </ThemedView>
        </ThemedView>
      </ScrollView>
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
    gap: 3,
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
  listContainer: {
    flexDirection: "column",
    gap: 10,
    width: "100%",
  },
  mylistsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",

    gap: 8,
  },
});
