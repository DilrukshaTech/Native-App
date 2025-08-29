import React, { FC } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { Skeleton } from "react-native-skeletons";

const HomeSkeleton: FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inner}>
        {/* Greeting text */}
        <Skeleton width={180} height={20} borderRadius={6} />
        <View style={{ height: 12 }} />
        <Skeleton width={120} height={28} borderRadius={6} />

        {/* Task summary boxes (Today, Upcoming, Completed) */}
        <View style={styles.row}>
          <Skeleton width={100} height={90} borderRadius={16} />
          <Skeleton width={100} height={90} borderRadius={16} />
          <Skeleton width={100} height={90} borderRadius={16} />
        </View>

        {/* Performance card */}
        <View style={styles.card}>
          <Skeleton width={120} height={120} borderRadius={80} />
          <View>
            <View style={{ height: 12 }} />
            <Skeleton width={100} height={16} borderRadius={6} />
            <View style={{ height: 6 }} />
            <Skeleton width={180} height={14} borderRadius={6} />
            <View style={{ height: 6 }} />
            <Skeleton width={150} height={14} borderRadius={6} />
          </View>
        </View>

        {/* My Lists title */}
        <View style={{ marginTop: 20 }}>
          <Skeleton width={100} height={20} borderRadius={6} />
        </View>

        {/* My Lists cards (Personal, Business) */}
        <View style={styles.ListItem}>
          <Skeleton width={160} height={120} borderRadius={16} />
          <Skeleton width={160} height={120} borderRadius={16} />
        </View>
        <View style={styles.ListItem}>
          <Skeleton width={160} height={120} borderRadius={16} />
          <Skeleton width={160} height={120} borderRadius={16} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HomeSkeleton;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  inner: {
    padding: 16,
  },
  row: {
    flexDirection: "row",
    gap: 16,
    justifyContent: "space-between",
    marginTop: 24,
  },
  card: {
    flexDirection: "row",
    gap: 16,
   justifyContent: "space-between",
   alignSelf:'flex-start',
  
    marginTop: 20,
   
  },

  ListItem: {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  marginTop: 16,
  }
});
