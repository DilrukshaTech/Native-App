import React, { useState, useRef } from "react";
import { TouchableOpacity, StyleSheet, View, Animated } from "react-native";
import { AntDesign } from "@expo/vector-icons";

type FloatingButtonProps = {
  onPress?: () => void; // For routing
  onActive?: () => void; // When FAB becomes active
  onClose?: () => void; // When FAB closes
};

export default function FloatingButton({
  onPress,
  onActive,
  onClose,
}: FloatingButtonProps) {
  const [active, setActive] = useState(false);
  const rotation = useRef(new Animated.Value(0)).current;

  const handlePress = () => {
    // Call routing function (no state change)
    if (onPress) {
      onPress();
      return;
    }

    // If no routing, toggle active state
    const newState = !active;
    setActive(newState);

    Animated.timing(rotation, {
      toValue: newState ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();

    if (newState && onActive) onActive();
    if (!newState && onClose) onClose();
  };

  const rotate = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "45deg"], // plus to cross
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.7}
        onPress={handlePress}
      >
        <Animated.View style={{ transform: [{ rotate }] }}>
          <AntDesign name="plus" size={24} color="#fff" />
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    zIndex: 8,
    bottom: 30,
    right: 20,
  },
  button: {
    backgroundColor: "#232323",
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
});
