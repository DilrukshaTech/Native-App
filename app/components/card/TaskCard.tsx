import React, { useState, useRef } from "react";
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  TouchableWithoutFeedback,
  findNodeHandle,
  UIManager,
} from "react-native";
import { Feather, MaterialIcons } from "@expo/vector-icons";

type TaskCardProps = {
  category: string;
  title: string;
  date: string;
  time: string;
  dataStyle?: TextStyle;
  onEdit?: () => void;
  onDelete?: () => void;
  onPress?: () => void;
};

export default function TaskCard({
  category,
  title,
  time,
  date,
  dataStyle,
  onEdit,
  onDelete,
  onPress,
}: TaskCardProps) {
  const [menuVisible, setMenuVisible] = useState(false);
  const [menuPosition, setMenuPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  const buttonRef = useRef<View>(null);

  const openMenu = () => {
    if (buttonRef.current) {
      const handle = findNodeHandle(buttonRef.current);
      if (handle) {
        UIManager.measureInWindow(handle, (x, y, width, height) => {
          setMenuPosition({ x, y: y + height }); // place below button
          setMenuVisible(true);
        });
      }
    }
  };

  return (
    <Pressable style={styles.card} onPress={onEdit}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Pressable onPress={onPress}>
          <View style={styles.circle} />
        </Pressable>
        <View>
          <View style={styles.categoryTag}>
            <Text style={styles.categoryText}>{category}</Text>
          </View>
          <Text style={styles.title}>{title}</Text>
          <Text style={[styles.dateTime, dataStyle]}>
            {date} {time}
          </Text>
        </View>
      </View>

      {/* 3-dot button */}
      <TouchableOpacity
        ref={buttonRef}
        onPress={openMenu}
        style={{ position: "absolute", right: 12 }}
      >
        <Feather name="more-horizontal" size={22} color="#333" />
      </TouchableOpacity>

      {/* popup menu */}
      <Modal
        visible={menuVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setMenuVisible(false)}
      >
        {/* fullscreen overlay to close when clicked outside */}
        <TouchableWithoutFeedback onPress={() => setMenuVisible(false)}>
          <View style={styles.overlay}>
            <View
              style={[
                styles.menu,
                { top: menuPosition.y, left: menuPosition.x - 120 }, // adjust left offset
              ]}
            >
              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => {
                  onEdit?.();
                  setMenuVisible(false);
                }}
              >
                <Feather name="edit-2" size={18} color="#000" />
                <Text style={styles.menuText}>Edit</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => {
                  onDelete?.();
                  setMenuVisible(false);
                }}
              >
                <MaterialIcons name="delete-outline" size={20} color="red" />
                <Text style={[styles.menuText, { color: "red" }]}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    borderWidth: 1,
    borderColor: "#B4B4FF",
    borderRadius: 20,
    backgroundColor: "#fff",
    marginBottom: 10,
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#aaa",
    marginRight: 10,
  },
  categoryTag: {
    backgroundColor: "#E9E4FF",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    alignSelf: "flex-start",
    marginBottom: 2,
  },
  categoryText: {
    fontSize: 12,
    color: "#6B4EFF",
    fontWeight: "500",
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
  },
  dateTime: {
    fontSize: 12,
  },
  overlay: {
    flex: 1,
    backgroundColor: "transparent",
  },
  menu: {
    position: "absolute",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 10,
    width: 140,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
  },
  menuText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: "500",
  },
});
