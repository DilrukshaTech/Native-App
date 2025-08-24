import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { StyleSheet, Pressable, Platform } from "react-native";
import hexToRgba from "../../../constants/hexToRgba";
import { memo } from "react";

interface ListCardProps {
  rate: number;
  title: string;
  onPress?: () => void;
  progress?: React.ReactNode;
  taskCount: number;
  color?: string;
  backgroundOpacity?: number;
}

const defaultColor = "#725ACD";
const defaultOpacity = 0.2;

const ListCard = ({
  rate,
  title,
  progress = null,
  taskCount,
  color = defaultColor,
  backgroundOpacity = defaultOpacity,
  onPress,
}: ListCardProps) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.pressableWrapper,
        pressed && Platform.OS === "ios" && { opacity: 0.7 },
      ]}
      android_ripple={{
        color: hexToRgba(color, 0.1),
        borderless: false,
      }}
    >
      <ThemedView style={styles.listCardContainer}>
        <ThemedView style={{ flexDirection: "row", gap: 8 }}>
          <ThemedText style={styles.completeRate}>{rate || 0}%</ThemedText>
          <ThemedView style={styles.performanceTracker}>{progress}</ThemedView>
        </ThemedView>

        <ThemedView>
          <ThemedText type="defaultSemiBold" style={{ color: "#292D32" }}>
            {title}
          </ThemedText>
        </ThemedView>

        <ThemedView
          style={{
            paddingHorizontal: 8,
            borderRadius: 16,
            backgroundColor: hexToRgba(color, backgroundOpacity),
          }}
        >
          <ThemedText
            style={{ color: color, fontWeight: "500", fontSize: 14 }}
          >
            {taskCount} Tasks
          </ThemedText>
        </ThemedView>
      </ThemedView>
    </Pressable>
  );
};

export default memo(ListCard);

const styles = StyleSheet.create({
  pressableWrapper: {
    width: "48%",
    borderRadius: 28,
    overflow: "hidden",
  },
  listCardContainer: {
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
    gap: 20,
    maxHeight: 140,
    borderRadius: 28,
    padding: 16,
    justifyContent: "space-between",
  },
  completeRate: {
    fontSize: 15,
    fontWeight: "600",
    color: "#292D32",
  },
  performanceTracker: {},
});
