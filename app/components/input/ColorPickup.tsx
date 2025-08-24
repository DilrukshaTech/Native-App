import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

type ColorPickerProps = {
  value: string;
  onChange: (color: string) => void;
};

const COLORS = [
  "#2B9AAF",
  "#E67E22",
  "#8E44AD",
  "#C0392B",
  "#3498DB",
  "#7F8C8D",
];

export default function ColorPickup({ value, onChange }: ColorPickerProps) {
  return (
    <View style={styles.container}>
      <ThemedText>Select a theme color (Optional)</ThemedText>
      <ThemedView style={{ flexDirection: "row", gap: 10 }}>
        {COLORS.map((color) => {
          const selected = color === value;
          return (
            <TouchableOpacity
              key={color}
              style={[
                styles.colorCircle,
                { backgroundColor: color },
                selected && styles.selected,
              ]}
              onPress={() => onChange(color)}
            />
          );
        })}
      </ThemedView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    gap: 12,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  colorCircle: {
    width: 30,
    height: 30,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  selected: {
    borderColor: "#000",
    borderWidth: 2,
  },
});
