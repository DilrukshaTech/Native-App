import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Using Ionicons for the back icon

interface TopHeaderProps {
  icon?: React.ReactNode;
  title?: string;
  text?: string;
  btn?: React.ReactNode;
  link?: any;
  
}

const TopHeader: React.FC<TopHeaderProps> = ({
  icon,
  title,
  text,
  btn,
 
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={title ? styles.iconContainer : ""}>
        {icon ? icon :''}
      </TouchableOpacity>
      <View>
        <Text style={styles.titleText}>{title}</Text>
      </View>
      
    

      <View style={styles.rightContainer}>
        <Text style={styles.text}>{text}</Text>
        {btn && <View>{btn}</View>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    top: 50,
    zIndex: 9,
   
  },
  iconContainer: {
    position: "relative",
  },
  
  rightContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    fontFamily: "Inter",
    color: "#fff",
    fontSize: 16,
    marginRight: 10,
    fontWeight: 400,
  },


  titleText: {
    fontFamily: "Inter",
    fontSize:18,
    fontWeight:500,
    fontStyle:'normal',
    textAlign: "center",
    color:'#1E1E1E'
  },
});

export default TopHeader;
