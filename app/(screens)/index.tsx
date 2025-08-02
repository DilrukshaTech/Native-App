import { SafeAreaView, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import useAxios from "../utils/axios/useAxios";
import ActiveIndicator from "../components/Loading/ActiveIndicator";
  import { onAuthStateChanged } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { auth } from "../../firebaseConfig";

export default function IndexScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const { AxiosRequest } = useAxios();



useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, async (user) => {
    if (!user) {
      router.replace("/explore");
      return;
    }

    try {
      const token = await user.getIdToken(true); // force refresh
      console.log("Firebase token:", token);

      await AsyncStorage.setItem("token", token);

      const res = await AxiosRequest({
        url: "/users/verify",
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });


      if (res.status === 200) {
        
        router.replace("/explore");
      } else {
        router.replace("/signup");
      }
    } catch (error) {
      console.error("Auth check error:", error);
      router.replace("/signup");
    } finally {
      setLoading(false);
    }
  });

  return () => unsubscribe(); // clean up
}, []);


  return (
    <SafeAreaView style={styles.container}>
      {loading ? <ActiveIndicator/> : null}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#8C80FF",
  },
});
