import { SafeAreaView,StyleSheet } from "react-native";
import ActiveIndicator from "./ActiveIndicator";
import { memo } from "react";


const ComponentLoading = () => {
    return (
       <SafeAreaView style={styles.pending}><ActiveIndicator/></SafeAreaView>
    );
    }

    const styles = StyleSheet.create({
        pending: {
            flex: 1,
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          
            backgroundColor: "#2B9AAF",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 10,
          },
    });
       

export default memo(ComponentLoading);