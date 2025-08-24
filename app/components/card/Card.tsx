import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { StyleSheet,ViewStyle } from "react-native";

interface CardProps {
  title: string;
  subtitle?: number;
 style?: ViewStyle | ViewStyle[];
}

export const Card = ({ title, subtitle, style }: CardProps) => {
  return (
    <ThemedView style={[styles.card, style] }>
      <ThemedView>
        <ThemedText style={styles.title}>{title || "Today"}</ThemedText>
      </ThemedView>
      <ThemedView style={styles.subtitleContainer}>
        <ThemedText style={styles.subtitle}>{subtitle || "0"}</ThemedText>
        <ThemedText style={styles.task}>tasks</ThemedText>
      </ThemedView> 
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    flexDirection: "column",
    maxHeight:100,
    justifyContent: "space-between",
    padding:12,
     borderRadius:20,
    
  },
  title: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: 500,
    lineHeight: 16,
    backgroundColor:'transparent',
  },
  subtitleContainer: {
  
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },

  subtitle:{
    color:'#fff',
    fontSize:26,
    fontWeight:600
  },

  task:{
   color:'#fff',
   fontSize:12,
   fontWeight:400
  }
});
