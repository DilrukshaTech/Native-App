import TopHeader from "@/app/components/topHeader/TopHeader";

import { SafeContainer } from "@/components/SafeContainer";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { FlatList } from "react-native";

export default function About() {
  const router = useRouter();

  const data=[
   {
    id: 1,
  
    description: "✅ Stay focused by managing your daily tasks in one place.",
   },
   {
    id: 2,

    description: "📊 Track your personal performance and progress over time.",
   },
   {
    id: 3,
   
    description: "🎯 Build better habits by completing tasks consistently.",
   },
   {
    id: 4,
  
    description: "💯Enjoy a completely free experience no hidden costs, ever",
   },
   

]
  return (
    <SafeContainer>
      <TopHeader
        icon={
          <AntDesign
            name="arrowleft"
            size={30}
            color="#1E1E1E"
            onPress={() => router.push("/profile")}
          />
        }
        title="About Daily.do"
      />

      <ThemedView
        style={{ flex: 1, gap: 20, alignItems: "center", paddingTop: 80 }}
      >
        <ThemedText>
          Daily.do is your simple and powerful task management app designed to
          help you stay on track every day. Unlike other task apps, Daily.do not
          only helps you organize tasks but also tracks your performance based
          on how consistently you complete them.{" "}
        </ThemedText>

        <ThemedText>
          With Daily.do, you can,
         {
            data.map((item)=>
            <ThemedText key={item.id} style={{fontWeight:"bold"}}> {"\n"}{item.description}</ThemedText>
            )
         }
         
        </ThemedText>
      </ThemedView>
    </SafeContainer>
  );
}
