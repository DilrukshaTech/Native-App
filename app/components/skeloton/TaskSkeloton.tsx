import { SafeAreaView, StyleSheet, View } from "react-native";
import { Skeleton } from "react-native-skeletons";


const TaskSkeloton: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inner}>
      
        {/* Task cards */}
        <Skeleton width={350} height={80} borderRadius={16} />
        <View style={{ height: 12 }} />
        <Skeleton width={350} height={80} borderRadius={16} />
        <View style={{ height: 12 }} />
        <Skeleton width={350} height={80} borderRadius={16} />
        <View style={{ height: 12 }} />
        <Skeleton width={350} height={80} borderRadius={16} />
        <View style={{ height: 12 }} />
        <Skeleton width={350} height={80} borderRadius={16} />
        <View style={{ height: 12 }} />
        <Skeleton width={350} height={80} borderRadius={16} />
        <View style={{ height: 12 }} />
        <Skeleton width={350} height={80} borderRadius={16} />
        <View style={{ height: 12 }} />
        <Skeleton width={350} height={80} borderRadius={16} />
       
       
      </View>
    </SafeAreaView>
  );
}   

export default TaskSkeloton;

const styles = StyleSheet.create({
  container: {
  flex: 1,
    position: "absolute",
    top: 60,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#ffffff",
 
    alignItems: "center",
    zIndex: 10,
    },

    inner: {
       padding: 16,
        },
    });


