import React from 'react';
import { View } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';

type CircularProgressProps = {
  size: number;
  progress: number; // 0–100
  color?: string;
  backgroundColor?: string;
};

export const ListProgressCircle = ({
  size,
  progress,
  color = '#2B9AAF',
  backgroundColor = '#D7F2F6',
}: CircularProgressProps) => {
  const radius = size / 2;

  if (progress === 100) {
    return (
      <View style={{ width: size, height: size }}>
        <Svg width={size} height={size}>
          {/* Full progress (color) circle */}
          <Circle
            cx={radius}
            cy={radius}
            r={radius}
            fill={color}
          />
        </Svg>
      </View>
    );
  }

  const angle = (progress / 100) * 2 * Math.PI;
  const x = radius + radius * Math.sin(angle);
  const y = radius - radius * Math.cos(angle);
  const largeArcFlag = progress > 50 ? 1 : 0;

  const pathData = `
    M ${radius},${radius}
    L ${radius},0
    A ${radius},${radius} 0 ${largeArcFlag} 1 ${x},${y}
    Z
  `;

  return (
    <View style={{ width: size, height: size }}>
      <Svg width={size} height={size}>
        {/* Background circle */}
        <Circle
          cx={radius}
          cy={radius}
          r={radius}
          fill={backgroundColor}
        />

        {/* Partial progress fill */}
        {progress > 0 && (
          <Path
            d={pathData}
            fill={color}
          />
        )}
      </Svg>
    </View>
  );
};
