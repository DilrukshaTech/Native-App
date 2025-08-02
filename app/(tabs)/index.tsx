import { SafeAreaView, StyleSheet } from "react-native";

import { HelloWave } from "@/components/HelloWave";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import  useUserStore  from "../stores/useUserStore";
import { Card } from "../components/card/Card";

export default function HomeScreen() {
  const { user } = useUserStore();

  

  return (
    <SafeAreaView style={styles.container}>
      <ThemedView style={styles.headerContainer}>
        <ThemedText type="title" style={styles.subtitle}>Good Morning</ThemedText>
        <ThemedView style={styles.subHeaderContainer}>
          <ThemedText type="title">{user?.name}</ThemedText>
          <HelloWave />
        </ThemedView>
      </ThemedView>
      <ThemedView style={styles.cardContainer}>
         <Card title="Today" subtitle="4" style={styles.card1}/>
         <Card title="Today" subtitle="4" style={styles.card2}/>
         <Card title="Today" subtitle="4" style={styles.card3}/>
      </ThemedView>
      <ThemedView></ThemedView>
      <ThemedView></ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop:50,
    backgroundColor: "#E9F4FA",
  },
  headerContainer: {
    flexDirection: "column",
    gap: 12,
    backgroundColor: "transparent",
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
    flex: 1,
    flexDirection:'row',
    gap:5,
    marginTop: 26,
   backgroundColor: "transparent",
  },

  card1:{
    backgroundColor:'#2B9AAF'
  },
  card2:{
    backgroundColor:'#608197'
  },
  card3:{
    backgroundColor:'#8678DA'
  }
});
