import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { auth } from "../../firebaseConfig";
import ActiveIndicator from "../components/Loading/ActiveIndicator";
import useAxios from "../utils/axios/useAxios";
import useUserStore from "../stores/useUserStore";

export default function IndexScreen() {
  const { setUser } = useUserStore();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const { AxiosRequest } = useAxios();

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
          console.log("User data:", userData);
          await AsyncStorage.setItem("user", JSON.stringify(userData));
          router.replace("/explore");
        } else {
          router.replace("/signup");
        }
      } catch (error) {
        console.error(error);
        router.replace("/signup");
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe(); // clean up
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
    backgroundColor: "#8C80FF",
  },
});
