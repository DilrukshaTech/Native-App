import * as React from "react";
import { Button } from "react-native-paper";
import { GestureResponderEvent, StyleSheet, TouchableOpacity } from "react-native";
import { IconSource } from "react-native-paper/lib/typescript/components/Icon";
import { SafeAreaView } from "react-native-safe-area-context";
import hexToRgba from "@/constants/hexToRgba";

type buttonType = {
  onPress?: (e: GestureResponderEvent) => void
  icon?: IconSource
  mode?:
    | "text"
    | "outlined"
    | "contained"
    | "elevated"
    | "contained-tonal"
    | undefined
  text?: string
  buttonColor?: string
  textColor?: string
  fontSize?: number
  primaryColor?: any
  padding?:boolean
};

const PrimaryBtn = ({
  onPress,
  icon,
  mode,
  text,
  primaryColor,
  textColor,
  fontSize = 17,
  padding
 
}: buttonType) => (
  <SafeAreaView style={padding ? styles.btnContainer:''}>
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
    >
    <Button
      icon={icon}
      mode={mode}
      style={styles.btn}
      labelStyle={{ color: textColor, fontSize }}
      buttonColor={primaryColor ? "#2B9AAF" : hexToRgba("#2B9AAF", 0.34)}
    >
      {text}
    </Button>
    </TouchableOpacity>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  btn: {
    paddingTop: 13,
    paddingBottom: 13,
    paddingLeft: 71,
    paddingRight: 71,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 6,
  
  },

  btnContainer: {
    paddingLeft: 25,
    paddingRight: 25,
    paddingBottom:32
  },
});

export default PrimaryBtn;
