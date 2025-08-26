import React from "react";
import {
  Modal,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { Ionicons } from "@expo/vector-icons";

interface listItem{
  id: number;
 label : string;
  
}
interface PopupProps {
  visible?: boolean;
  onClose?: () => void;
  children?: React.ReactNode;
  list?: listItem[];
  value?: number | string | null;
 onChange?: (val: number | string | null) => void;

}

export const Popup = ({ visible = false, onClose, children,list,value,onChange }: PopupProps) => {
  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
    >
      {/* Overlay */}
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay} />
      </TouchableWithoutFeedback>

      {/* Centered content */}
      <SafeAreaView style={styles.centered}>
        <ThemedView style={styles.popup}>{children ? children : (
          <>
           <ThemedText
            style={{ fontSize: 16, fontWeight: "600", marginBottom: 10 }}
          >
            Select List
          </ThemedText>

          {list.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.option}
              onPress={() => {
                onChange(item.id);
                onClose?.();
              }}
            >
              <Ionicons
                name={
                  value === item.id
                    ? "radio-button-on-outline"
                    : "radio-button-off-outline"
                }
                size={20}
                color={value === item.id ? "#007AFF" : "#444"}
              />
              <ThemedText style={styles.optionText}>{item.label}</ThemedText>
            </TouchableOpacity>
            
          ))}
          </>
        )}</ThemedView>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  centered: {
    position: "absolute",
    top: "30%",
    left: 0,
    right: 0,
    alignItems: "center",
  },
  popup: {
    width: "80%",
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },

  option: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  optionText: {
    marginLeft: 10,
    fontSize: 15,
  },
});
