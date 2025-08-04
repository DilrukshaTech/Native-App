import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

type CircularProgressProps = {
  size: number;
  strokeWidth: number;
  progress: number; // 0–100
  color?: string;
  content?: React.ReactNode; // Optional content to display in the center
};

export const CircularProgress = ({
  size,
  strokeWidth,
  progress,
  color = "#2B9AAF",
    content = null,
}: CircularProgressProps) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - progress / 100);

  return (
    <View style={{ width: size, height: size, position: 'relative', alignItems: 'center', justifyContent: 'center' }}>
      <Svg width={size} height={size}>
        {/* background circle */}
        <Circle
          stroke="#D7F2F6"
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
        />
        {/* progress circle */}
        <Circle
          stroke={color}
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          rotation="-90"
          origin={`${size / 2}, ${size / 2}`}
        />
      </Svg>
      {/* Optional centered text */}
      <View style={styles.centerText}>
        {content}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  centerText: {
    position: 'absolute',
   
    left: 0,
    right: 0,
    alignItems: 'center',
  },
});
