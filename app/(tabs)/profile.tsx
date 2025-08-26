import { SafeContainer } from "@/components/SafeContainer";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Pressable, StyleSheet } from "react-native";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../utils/axios/useAxios";
import TopHeader from "../components/topHeader/TopHeader";
import useUserStore from "../stores/useUserStore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Alart from "../components/alert/Alart";
import { useState } from "react";
import { EditFirbasePassword } from "../utils/firebase/firebaseAuth";

export default function Calendar() {
  const [visible, setVisible] = useState(false);
  const hideDialog = () => setVisible(false);

  const router = useRouter();
  const { user } = useUserStore();
  const { AxiosRequest } = useAxios();

  const { data: userData} = useQuery({
      queryKey: ["user", user?.id],
      queryFn: async () => {
        const response = await AxiosRequest({
          url: `/users/${user?.id}`,
          method: "GET",
        });
  
        return response.data;
      },
      refetchOnWindowFocus: false,
      enabled: !!user?.id,
    
    });
  
console.log("Profile User Data", userData);

 const Logout = async () => {
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("user");
    await AsyncStorage.removeItem("refreshToken");
    router.push("/signin");
  };

  const handlePopup = () => {
     EditFirbasePassword(user?.email);
    setVisible(true);

  }
  return (
    <SafeContainer>
      <TopHeader
        icon={
          <AntDesign
            name="arrowleft"
            size={30}
            color="#1E1E1E"
            onPress={() => router.push("/home")}
          />
        }
        title="Profile"
      />
      <Alart 
      hideDialog={hideDialog}
      visible={visible}
      title="Password Reset Email Sent"
      description={`A password reset email has been sent to ${user?.email}. Please check your inbox to reset your password.`}
      icon="email"
      />
      <ThemedView style={styles.container}>
        <ThemedView style={styles.card}>
          <ThemedText style={styles.profileText}>{userData?.name}</ThemedText>
        </ThemedView>
        <Pressable onPress={() => router.push(`/user/EditName?name=${userData?.name}`)}>
          <ThemedView style={styles.card}>
            <Ionicons name="person-sharp" size={24} color="#798494" />
            <ThemedText style={styles.text}>Change Name</ThemedText>
            <ThemedView style={{ flex: 1, alignItems: "flex-end" }}>
              <Ionicons name="chevron-forward" size={24} color="#1B293D" />
            </ThemedView>
          </ThemedView>
        </Pressable>
        <Pressable onPress={() => router.push(`/user/EditEmail?email=${userData?.email}`)}>
          <ThemedView style={styles.card}>
            <Ionicons name="mail" size={24} color="#798494" />
            <ThemedText style={styles.text}>Change Email</ThemedText>
            <ThemedView style={{ flex: 1, alignItems: "flex-end" }}>
              <Ionicons name="chevron-forward" size={24} color="#1B293D" />
            </ThemedView>
          </ThemedView>
        </Pressable>
        <Pressable onPress={handlePopup}>
          <ThemedView style={styles.card}>
            <Ionicons name="lock-closed" size={24} color="#798494" />
            <ThemedText style={styles.text}>Change Password</ThemedText>
            <ThemedView style={{ flex: 1, alignItems: "flex-end" }}>
              <Ionicons name="chevron-forward" size={24} color="#1B293D" />
            </ThemedView>
          </ThemedView>
        </Pressable>
        <Pressable onPress={() => router.push("/about")}>
          <ThemedView style={styles.card}>
            <AntDesign name="questioncircleo" size={24} color="#798494"/>
            <ThemedText style={styles.text}>About Daily.do</ThemedText>
            <ThemedView style={{ flex: 1, alignItems: "flex-end" }}>
              <Ionicons name="chevron-forward" size={24} color="#1B293D"/>
            </ThemedView>
          </ThemedView>
        </Pressable>
        <Pressable onPress={Logout}>
          <ThemedView style={styles.card}>
            <Ionicons name="log-out" size={24} color="#798494" />
            <ThemedText style={styles.text}>Logout</ThemedText>
            <ThemedView style={{ flex: 1, alignItems: "flex-end" }}>
              <Ionicons name="chevron-forward" size={24} color="#1B293D" />
            </ThemedView>
          </ThemedView>
        </Pressable>
      </ThemedView>
    </SafeContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,

    paddingVertical: 20,
  },

  card: {
    flexDirection: "row",
    gap: 10,
    backgroundColor: "#fff",
    paddingVertical: 20,
    borderRadius: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#E4E6FF",
  },
  profileText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1E1E1E",
  },
  text: {
    fontSize: 14,
    fontWeight: "400",
    color: "#1E1E1E",
  },
});
