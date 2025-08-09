import React from "react";
import { SafeAreaView, View, Image, StyleSheet, Pressable } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { memo } from "react";

interface Types {
    onPress?: () => void;
    avatarSource?: any; 
}



const Upload: React.FC<Types> = ({ onPress, avatarSource }) => {
  return (
    <SafeAreaView>
      <View style={styles.parent_circle}>
        <View style={styles.inner_circle}>
          <View style={styles.imageContainer}>
            <Image
              
              source={avatarSource}
              style={styles.img}
            />
          </View>
        </View>
      </View>
     
      <View style={styles.add_btn}>
        <Pressable onPress={onPress}>
          <AntDesign name="pluscircle" size={30} color="#8C80FF" />
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    parent_circle: {
        zIndex: 1,
        alignItems: "center",
        justifyContent: "center",
        width: 149,
        height: 149,
        backgroundColor: "#fff",
        borderRadius: 75,
        borderColor: "#F0F2FF",
        borderWidth: 1,
        top: 50,
    },
    inner_circle: {
        alignItems: "center",
        justifyContent: "center",
        width: 119,
        height: 119,
        backgroundColor: "#8C80FF",
        borderRadius: 60, 
        flexShrink: 0,
    },
    imageContainer: {
        width: 119,
        height: 119,
        borderRadius: 60, 
        overflow: "hidden",
        flexShrink: 0,
    },
    img: {
        width: "100%",
        height: "100%",
        resizeMode: "contain", 
        top: 5,
        flexShrink: 0,
    },
    add_btn: {
        width: 35,
        height: 35,
        flexShrink: 0,
        borderRadius: 30,
        position: "absolute",
        zIndex: 2,
        top: 158,
        right: 4,
        backgroundColor: '#fff',
        borderColor: '#fff',
        borderWidth: 2
    },
});

export default memo(Upload);