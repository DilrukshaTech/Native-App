import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";

interface TopHeaderProps {
    title?: string;
    btn?: React.ReactNode;
}

const Header: React.FC<TopHeaderProps> = ({ title, btn }) => {
    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.titleText}>{title}</Text>
            </View>
            <View style={styles.buttonContainer}></View>
            <View>
                {btn && <Pressable>{btn}</Pressable>}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: 'space-between',
        top: 50,
        padding: 15,
    },
    titleContainer: {
       
        flex: 1,
        alignItems: "center",
        paddingLeft:65
    },
    titleText: {
        fontFamily: "Inter",
        fontSize: 19,
        fontWeight: "700",
        fontStyle: "normal",
        color:'#fff'
    },
    buttonContainer: {
        position: 'absolute',
        right: 15,
    },
});

export default Header;
