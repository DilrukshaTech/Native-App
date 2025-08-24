import React from "react";
import { View } from "react-native";
import Skeleton from "./Skeloton";


export default function LoadingScreen() {
  return (
    <View style={{ padding: 16 }}>
      {/* Title Skeleton */}
      <Skeleton width="60%" height={24} />

      {/* Image Skeleton */}
      <Skeleton width="100%" height={200} borderRadius={8} style={{ marginTop: 16 }} />

      {/* Multiple Lines */}
      <Skeleton width="90%" />
      <Skeleton width="80%" />
      <Skeleton width="95%" />
    </View>
  );
}
