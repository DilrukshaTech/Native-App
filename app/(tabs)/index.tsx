import { SafeAreaView, StyleSheet } from "react-native";

import { HelloWave } from "@/components/HelloWave";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ThemedView style={styles.headerContainer}>
        <ThemedText type="title" style={styles.subtitle}>Good Morning</ThemedText>
        <ThemedView style={styles.subHeaderContainer}>
          <ThemedText type="title">Dinidu!</ThemedText>
          <HelloWave />
        </ThemedView>
      </ThemedView>
      <ThemedView></ThemedView>
      <ThemedView></ThemedView>
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
});
