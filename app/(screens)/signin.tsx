import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import AntDesign from "@expo/vector-icons/AntDesign";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Checkbox } from "react-native-paper";
import PrimaryBtn from "../components/buttons/PrimaryBtn";
import Button from "../components/buttons/TopBtn";
import Input from "../components/input/Input";
import TopHeader from "../components/topHeader/TopHeader";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFormik } from "formik";
import ComponentLoading from "../components/Loading/ComponentLoading";
import useFeedbackAlertStore from "../stores/useFeedbackAlertStore";
import useUserStore from "../stores/useUserStore";
import useAxios from "../utils/axios/useAxios";
import UserValidationSchemas from "../utils/validation/UserValidation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebaseConfig";

interface SigninFormValues {
  email: string;
  password: string;
}

const Signin = () => {
  const [checked, setChecked] = useState(false);
  const { showFeedback } = useFeedbackAlertStore();
  let router = useRouter();
  const { setUser } = useUserStore();

  const queryClient = useQueryClient();
  const { AxiosRequest } = useAxios();
  const { SigninUserValidation } = UserValidationSchemas();




const { mutateAsync: signInMutate, isPending: isSigningIn } = useMutation({
  mutationFn: async (values: SigninFormValues) => {
    // Firebase SDK sign-in
    const userCredential = await signInWithEmailAndPassword(
      auth,
      values.email,
      values.password
    );
    const user = userCredential.user;

    const idToken = await user.getIdToken();
    const refreshToken = user.refreshToken;

    // persist tokens
    await AsyncStorage.setItem("token", idToken);
    await AsyncStorage.setItem("refreshToken", refreshToken);

//verify user in backend
    const verifyRes = await AxiosRequest({
      url: "/users/verify",
      method: "POST",
      data: { firebaseUid: user.uid },
      headers: { Authorization: `Bearer ${idToken}` },
    });

    if (verifyRes.status === 200) {
      const userData = verifyRes.data.user;
      setUser(userData);
      await AsyncStorage.setItem("user", JSON.stringify(userData));
    } else {
      throw new Error("User verification failed");
    }
  },
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["user"] });
    router.push("/home");
  },
  onError: () => {
    showFeedback("Failed to sign in", "failed");
  },
});


  const { handleSubmit, handleChange, values, errors, touched } =
    useFormik<SigninFormValues>({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: SigninUserValidation,
      onSubmit: async (values) => {
        console.log("Submitting form:", values);
       

     try{
           await signInMutate(values);
     }catch(err){
          console.error("Sign-in error:", err);
          showFeedback("Invalid email or password", "failed");
      }
       
      },
    });

  const handleCheck = () => {
    setChecked((prev) => !prev);
  };

  return (
    <SafeAreaView style={styles.container}>
      {isSigningIn && <ComponentLoading />}
      <TopHeader
        icon={
          <AntDesign
            name="arrowleft"
            size={34}
            color="#fff"
            onPress={() => router.push("/signup")}
          />
        }
        text="No account?"
        btn={
          <Button
            text="Sign up"
            textColor="#fff"
            primaryColor
            onPress={() => router.replace("/signup")}
          />
        }
      />

      <View style={styles.inputcontainer}>
        <View style={styles.title}>
          <Text style={styles.titleText}>Welcome Back!</Text>
        </View>

        <View style={styles.input}>
          <Input
            label="Email"
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
        <View style={styles.bottom_container}>
          <View style={styles.checkbox}>
            <Checkbox
              status={checked ? "checked" : "unchecked"}
              uncheckedColor="#D9D9D9"
              onPress={handleCheck}
            />
            <Text style={styles.text}>Remember Me</Text>
          </View>

          <TouchableOpacity>
            <Text style={styles.fogotpwd}>Forgot password?</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.btn}>
          <PrimaryBtn
            primaryColor
            text="Log In"
            textColor="#fff"
            onPress={handleSubmit}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2B9AAF",
  },
  input: {
    paddingHorizontal: 20,
  },
  blur: {
    position: "absolute",
    top: -300,
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
  },

  title: {
    alignItems: "center",
    paddingTop: 25,
  },

  titleText: {
    fontFamily: "Inter",
    fontWeight: 700,
    fontSize: 24,
  },
  bottom_container: {
    flexDirection: "row",
    top: 20,
    padding: 23,
    justifyContent: "space-between",
  },

  checkbox: {
    flexDirection: "row",
    gap: 10,
  },

  text: {
    paddingTop: 7,
    fontFamily: "Inter",
    color: "#636363",
    fontSize: 16,
    fontWeight: 400,
    fontStyle: "normal",
  },

  fogotpwd: {
    paddingTop: 7,
    fontFamily: "Inter",
    color: "#8C80FF",
    fontSize: 16,
    fontWeight: 500,
    fontStyle: "normal",
    right: 7,
  },
  btn: {
    paddingLeft: 32,
    paddingRight: 32,
  },
});
export default Signin;
