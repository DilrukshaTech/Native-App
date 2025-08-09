import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { auth } from "../../firebaseConfig";
import ActiveIndicator from "../components/Loading/ActiveIndicator";

import useUserStore from "../stores/useUserStore";
import useAxios from "../utils/axios/useAxios";

export default function IndexScreen() {
  const { setUser } = useUserStore();
  const [loading, setLoading] = useState(true);
  const { AxiosRequest } = useAxios(); // Commented out for now
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.replace("/signup");
        setLoading(false);
        return;
      }

      try {
        const token = await user?.getIdToken(true); // force refresh
        console.log("Firebase token:", token);

        if (!token) {
          router.replace("/signup");
          return;
        }

        await AsyncStorage.setItem("token", token);

      
        const res = await AxiosRequest({
          url: "/users/verify",
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.status === 200) {
          const userData = res.data.user;
          setUser(userData);
          await AsyncStorage.setItem("user", JSON.stringify(userData));
          router.replace("/tasks");
        } else {
          router.replace("/signup");
        }

      
        router.replace("/tasks");
      } catch (error) {
        console.error("Auth error:", error);
        router.replace("/signup");
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {loading ? <ActiveIndicator /> : null}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2B9AAF",
  },
});
