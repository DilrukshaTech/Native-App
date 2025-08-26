import { ThemedText } from "@/components/ThemedText";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Pressable, StyleSheet, ViewStyle } from "react-native";

type PeriodType = {
  title: string; // label
  value: string; // option value
  selectedValue?: string; // the current selected one
  onChange?: (text: string) => void;
};

export default function PressableInput({
  title,
  value,
  selectedValue,
  onChange,
}: PeriodType) {
  const isSelected = value === selectedValue;

  return (
    <Pressable
      style={[styles.base, isSelected && styles.selected]}
      onPress={() => onChange?.(value)}
    >
      <Ionicons
        name="notifications-outline"
        size={15}
        color={isSelected ? "#2B9AAF" : "#4C677D"}
      />
      <ThemedText
        style={{
          fontSize: 14,
          color: isSelected ? "#2B9AAF" : "#4C677D",
          fontWeight: "400",
        }}
      >
        {title}
      </ThemedText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingVertical: 1,
    paddingHorizontal: 10,
    backgroundColor:'#E9F1FA',
    borderRadius: 20,
  } as ViewStyle,
  selected: {
   
    borderWidth: 1,
    borderColor: "#2B9AAF",
  } as ViewStyle,
});
