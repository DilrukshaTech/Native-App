import { View,StyleSheet } from "react-native";
import ActiveIndicator from "./ActiveIndicator";
import { memo } from "react";


const ComponentLoading = () => {
    return (
       <View style={styles.pending}><ActiveIndicator/></View>
    );
    }

    const styles = StyleSheet.create({
        pending: {
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9,
          },
    });
       

export default memo(ComponentLoading);