import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";


interface TopHeaderProps {
  icon?: React.ReactNode;
  title?: string;
  text?: string;
  btn?: React.ReactNode;
  link?: any;
  
}

const MainHeader: React.FC<TopHeaderProps> = ({
  icon,
  title,

 
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={title ? styles.iconContainer : ""}>
        {icon ? icon :''}
      </TouchableOpacity>
      <View style={title ? styles.title : ""}>
        <Text style={styles.titleText}>{title}</Text>
      </View>
      

      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    top: 40,
    padding: 15,
  },
  iconContainer: {
    position: "absolute",
    paddingLeft: 0,
  },
  flexSpace: {
    flex: 1, // Pushes the right section to the corner
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
  title: {
    width: "100%",
    alignItems: "center",
  },

  titleText: {
  
    fontSize:17,
    fontWeight:700,
    fontStyle:'normal'
  },
});

export default MainHeader;
