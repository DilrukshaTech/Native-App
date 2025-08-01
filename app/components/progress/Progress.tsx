import { ProgressBar, MD3Colors } from "react-native-paper";
import { StyleSheet, View } from "react-native";

interface ProgressBarProps {
  progress: number;
  color?: string;
}
const Progress: React.FC<ProgressBarProps> = ({ progress, color }) => {
  return (
    <View>
      <ProgressBar
        progress={progress}
        color={color || MD3Colors.primary80}
        style={{
          height: 10,
          borderRadius: 5,
    
          backgroundColor: "#E4E6FF",
        }}
      />
    </View>
  );
};

export default Progress;
