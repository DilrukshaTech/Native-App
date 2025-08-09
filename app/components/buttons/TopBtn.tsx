import * as React from "react";
import { Button } from "react-native-paper";
import { GestureResponderEvent, StyleSheet, TouchableOpacity } from "react-native";
import { IconSource } from "react-native-paper/lib/typescript/components/Icon";

type buttonType = {
  onPress?: (e: GestureResponderEvent) => void;
  icon?: IconSource;
  mode?:
    | "text"
    | "outlined"
    | "contained"
    | "elevated"
    | "contained-tonal"
    | undefined;
  text?: string;
  buttonColor?: string;
  textColor?: string;
  fontSize?: number;
  primaryColor?: any;
};

const TopBtn = ({
  onPress,
  icon,
  mode,
  text,
  primaryColor,
  textColor,
  fontSize = 17,
}: buttonType) => (

  <TouchableOpacity
  onPress={onPress}
  activeOpacity={0.8}
  >
  <Button
    icon={icon}
    mode={mode}
    style={styles.btn}
    labelStyle={{ color: textColor, fontSize }}
    buttonColor={primaryColor ? "rgba(255, 255, 255, 0.34)" : "#8C80FF"}
  >
    {text}
  </Button>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  btn: {
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 12,
    paddingRight: 12,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 6,
    fontStyle: "normal",
    fontWeight: 600,
  },
});

export default TopBtn;
