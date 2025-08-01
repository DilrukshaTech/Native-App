import * as React from "react";
import { Button } from "react-native-paper";
import { GestureResponderEvent, StyleSheet, TouchableOpacity, View, Text } from "react-native";
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

const SelectionBtn = ({
    onPress,
    icon,
    mode,
    text,
    primaryColor,
    textColor,
    fontSize = 13,
}: buttonType) => {
  
    const buttonBackgroundColor = primaryColor ? '#8C80FF' : '#F5F7FA';
    
    return (
        <TouchableOpacity 
            style={[
                styles.btn,
                { backgroundColor: buttonBackgroundColor }
            ]}
            onPress={onPress}
            activeOpacity={0.8}
        >
            <Button
                icon={icon}
                mode={mode}
                style={styles.innerButton}
                labelStyle={{ color: textColor, fontSize }}
                buttonColor={buttonBackgroundColor}
               
            >
                {text}
            </Button>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    btn: {
        width: 108,
         paddingHorizontal:10,
        borderRadius: 6,
        overflow: 'hidden',
    },
    innerButton: {
        width: '100%',
        paddingHorizontal:10,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 6,
    },
   
});

export default SelectionBtn;