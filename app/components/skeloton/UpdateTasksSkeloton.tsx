import { SafeAreaView, StyleSheet, View } from "react-native";
import { Skeleton } from "react-native-skeletons";

const UpdateTasksSkeloton: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inner}>
        {/* Task cards */}
        <Skeleton width={100} height={20} borderRadius={6} style={{}} />
        <View style={{ height: 12 }} />
        <Skeleton width={180} height={28} borderRadius={6} />

        <View style={{ marginTop: 20, flexDirection: "row", gap: 10 }}>
          <Skeleton width={100} height={30} borderRadius={16} />
          <Skeleton width={100} height={30} borderRadius={16} />
          <Skeleton width={100} height={30} borderRadius={16} />
        </View>

        <View
          style={{
            marginTop: 20,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <Skeleton width={100} height={18} borderRadius={6} style={{}} />
          <Skeleton width={100} height={18} borderRadius={6} style={{}} />
        </View>
        <View
          style={{
            marginTop: 22,
            flexDirection: "row",
            gap: 10,
            alignItems: "flex-start",
          }}
        >
          <Skeleton width={20} height={18} style={{}} />
          <Skeleton width={100} height={18} borderRadius={6} style={{}} />
        </View>
        <View
          style={{
            marginTop: 25,
            flexDirection: "row",
            gap: 10,
            alignItems: "flex-start",
          }}
        >
          <Skeleton width={20} height={18} style={{}} />
          <Skeleton width={100} height={18} borderRadius={6} style={{}} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default UpdateTasksSkeloton;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "absolute",
    top: 60,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#ffffff",

    zIndex: 10,
  },

  inner: {
    padding: 16,
  },
});
