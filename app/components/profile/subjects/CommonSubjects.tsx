import { View, Text, Pressable, StyleSheet } from "react-native";
import React, { memo } from "react";
import { SafeAreaView } from "react-native";




interface CommonSubjectsProps {
  selectedSubjects?: string[];
  toggleSelection?: (subject_name: string) => void;
  subjects: { subject_id: number; subject_name: string }[];
}

const CommonSubjects: React.FC<CommonSubjectsProps> = ({
  selectedSubjects,
  toggleSelection,
  subjects,
}) => {
  return (
    <SafeAreaView style={styles.container}>
        <View>
      <Text style={styles.title}>Common Subjects</Text>
      <Text style={styles.subtitle}>Standard subjects everyone must take.</Text>
      <View style={styles.subjectList}>
        {subjects.map((sub) => (
          <Pressable
            key={sub.subject_id}
             style={[
              styles.subjectButton,
              selectedSubjects && styles.selectedButton,
            ]}
           
          >
            <Text style={styles.selected}>{sub.subject_name}</Text>
          </Pressable>
        ))}
      </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    width:350,
  //  borderColor:'red',
  //  borderWidth:2
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
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    backgroundColor: "#E0E0E0",
    color:'4A4A4A',
    fontFamily:'Inter',
    fontSize:13
  },
  selectedButton: {
    backgroundColor: "#8C80FF", 
   
  },

  selected:{
    fontFamily:'Inter',
    fontSize:14,
    color:'#ffffff',
    fontWeight:600
  }

});


export default memo(CommonSubjects);
