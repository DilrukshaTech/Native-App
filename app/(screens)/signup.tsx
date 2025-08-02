import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import PrimaryBtn from "../components/buttons/PrimaryBtn";
import Button from "../components/buttons/TopBtn";
import ComponentLoading from "../components/Loading/ComponentLoading";
import TopHeader from "../components/topHeader/TopHeader";
import Input from "../components/input/Input";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { useFormik } from "formik";
import { useState } from "react";
import useFeedbackAlertStore from "../stores/useFeedbackAlertStore";
import useAxios from "../utils/axios/useAxios";
import UserValidationSchemas from "../utils/validation/UserValidation";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useUserStore  from "../stores/useUserStore";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebaseConfig";

interface SignupFormValues {
  name: string;
  email: string;
  password: string;
}

const Signup = () => {

  const { setUser } = useUserStore();
  
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const queryClient = useQueryClient();
  const { AxiosRequest } = useAxios();
  const { CreateUserValidation } = UserValidationSchemas();
  const { showFeedback } = useFeedbackAlertStore();

  const { mutateAsync } = useMutation({
  mutationFn: async (values: SignupFormValues) => {
    setLoading(true);
    try {
      const userCred = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );

      const token = await userCred.user.getIdToken(true);
   
      await AsyncStorage.setItem("token",token);
      console.log("Firebase ID token:", token);
      
      const response = await AxiosRequest({
        url: "/users",
        method: "POST",
        data: {
          name: values.name,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });


      const userData=response.data.user;
      console.log("User data:", userData);
      setUser(userData)
      await AsyncStorage.setItem("user", JSON.stringify(userData)); // persist

    } catch (err: any) {
      console.error("Error in mutationFn:", err);
      throw new Error(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  },
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["fetch-user-data"] });
    router.push("/explore");
  },
  onError: (error: any) => {
    showFeedback("Signup failed. Please try again.", "failed");
    console.error("Full error:", JSON.stringify(error, null, 2));
  },
});


  const { handleSubmit, handleChange, values, errors, touched } =
    useFormik<SignupFormValues>({
      initialValues: {
        name: "",
        email: "",
        password: "",
      },
      validationSchema: CreateUserValidation,
      onSubmit: async (values) => {
        await mutateAsync(values);
      },
    });

  return (
    <SafeAreaView style={styles.container}>
      {loading && <ComponentLoading />}
      <TopHeader
        text="Already a member?"
        btn={
          <Button
            text="Sign in"
            textColor="#fff"
            primaryColor
            onPress={() => router.push("/signin")}
          />
        }
      />

      <View style={styles.blurcontainer}></View>

      <View style={styles.inputcontainer}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.title}>
            <Text style={styles.titleText}>Get Started!</Text>
          </View>

           <View style={styles.input}>
            <Input
              label="Name"
              type="text"
              onChange={handleChange("name")}
              value={values.name}
              error={touched.name && errors.name}
              required
            />
            <Input
              label="Email"
              type="email"
              onChange={handleChange("email")}
              value={values.email}
              error={touched.email && errors.email}
              required
            />
            <Input
              label="Password"
              secureTextEntry
              onChange={handleChange("password")}
              value={values.password}
              error={touched.password && errors.password}
              required
            />
          </View> 

          <View style={styles.btn}>
            <PrimaryBtn
              primaryColor
              text="Sign Up"
              textColor="#fff"
              onPress={handleSubmit}
            />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#8C80FF",
    alignItems: "center",
  },
  input: {
    alignItems: "center",
  },
  blurcontainer: {
    position: "absolute",
    width: "95%",
    height: "20%",
    backgroundColor: "rgba(255, 255, 255, 0.33)",
    borderRadius: 16,
    bottom: 0,
    top: 245,
  },
  inputcontainer: {
    position: "absolute",
    width: "100%",
    height: "70%",
    backgroundColor: "#fff",
    bottom: 0,
    borderTopStartRadius: 15,
    borderTopRightRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -1 },
    shadowOpacity: 0.1,
    shadowRadius: 21.4,
    elevation: 5,
    overflow: "scroll",
  },
  title: {
    alignItems: "center",
    paddingTop: 25,
  },
  titleText: {
    fontFamily: "Inter",
    fontWeight: "700",
    fontSize: 24,
  },
  btn: {
    paddingLeft: 32,
    paddingRight: 32,
    paddingBottom: 32,
  },
});

export default Signup;
