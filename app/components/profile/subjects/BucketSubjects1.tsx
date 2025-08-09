import { View, Text, Pressable, StyleSheet } from "react-native";
import React, { memo } from "react";

interface BucketSubjectsProps {
  selectedSubjects: number[];
  toggleSelection: (subject_id: number) => void;
  subjects: { subject_id: number; subject_name: string }[];
  title:string
}

const BucketSubjects1: React.FC<BucketSubjectsProps> = ({
  selectedSubjects,
  toggleSelection,
  subjects,
  title
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>Standard subjects everyone must take.</Text>
      <View style={styles.subjectList}>
        {subjects.map((sub) => (
          <Pressable
            key={sub.subject_id}
            style={[
              styles.selectedButton,
              selectedSubjects.includes(sub.subject_id) && styles.subjectButton,
            ]}
            onPress={() => toggleSelection(sub.subject_id)}
          >
            <Text 
              style={selectedSubjects.includes(sub.subject_id) ? styles.selected : styles.normal}
            >
              {sub.subject_name}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    width: 350,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 14,
    color: "#999",
    marginBottom: 10,
  },
  subjectList: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 5,
  },
  subjectButton: {
    backgroundColor: "#8C80FF",
  },
  selectedButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    backgroundColor: "#E0E0E0",
  },
  selected: {
    fontFamily: 'Inter',
    fontSize: 14,
    color: '#ffffff',
    fontWeight: '600',
  },
  normal: {
    fontFamily: 'Inter',
    fontSize: 14,
    color: '#4A4A4A',
    fontWeight: '600',
  }
});

export default memo(BucketSubjects1);