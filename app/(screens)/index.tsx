import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import ActiveIndicator from "../components/Loading/ActiveIndicator";

import { useQueryClient } from "@tanstack/react-query";
import useUserStore from "../stores/useUserStore";
import useAxios from "../utils/axios/useAxios";

export default function IndexScreen() {
  const { setUser } = useUserStore();
  const [loading, setLoading] = useState(true);
  const { AxiosRequest } = useAxios();
  const router = useRouter();
  const queryClient = useQueryClient();

  useEffect(() => {
    const initAuth = async () => {
      setLoading(true);
      // check if user is authenticated with Firebase
      const refreshToken = await AsyncStorage.getItem("refreshToken");
      if (!refreshToken) {
        router.replace("/signin");
        return;
      }

      try {
        // get a new ID token from Firebase secure token endpoint
        const res = await fetch(
          `https://securetoken.googleapis.com/v1/token?key=AIzaSyDUz34FFv5QcjV2TkS-tukbQh4DsMzukNg`,
          {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: `grant_type=refresh_token&refresh_token=${refreshToken}`,
          }
        );

        const data = await res.json();
        const idToken = data.id_token;
        await AsyncStorage.setItem("token", idToken);

        const verifyRes = await AxiosRequest({
          url: "/users/verify",
          method: "POST",
          headers: { Authorization: `Bearer ${idToken}` },
        });

        if (verifyRes.status === 200) {
          const verifiedUser = verifyRes.data.user;

          setUser(verifiedUser);
          await AsyncStorage.setItem("user", JSON.stringify(verifiedUser));
          router.replace("/tasks");
        } else {
          router.replace("/signin");
        }
      } catch (err) {
        console.error("Refresh token error:", err);
        router.replace("/signin");
      } finally {
        setLoading(false);
      }
    };

    initAuth();
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
