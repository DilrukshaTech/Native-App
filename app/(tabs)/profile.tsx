import { Collapsible } from "@/components/Collapsible";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { SafeAreaView } from "react-native";

export default function Calendar() {
  return (
    <SafeAreaView>
      <ThemedView>
        <ThemedText type="title">Calendar</ThemedText>
   
      </ThemedView>

      <Collapsible title="Learn more">
        <ThemedText>
          Explore the calendar to manage your tasks and events effectively.
        </ThemedText>
      </Collapsible>
    </SafeAreaView>
  );
}