import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Stack } from "expo-router";

import Input from "../components/input/Input";
import TopHeader from "../components/topHeader/TopHeader";
import AntDesign from "@expo/vector-icons/AntDesign";
import Button from "../components/buttons/TopBtn";
import { useRouter } from "expo-router";
import { Checkbox } from "react-native-paper";
import { useState } from "react";
import PrimaryBtn from "../components/buttons/PrimaryBtn";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import UserValidationSchemas from "../utils/validation/UserValidation";
import { useFormik } from "formik";
import useFeedbackAlertStore from "../stores/useFeedbackAlertStore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ComponentLoading from "../components/Loading/ComponentLoading";
import useAxios from "../utils/axios/useAxios";

interface SigninFormValues {
  email: string;
  password: string;
}

const Signin = () => {
  const [checked, setChecked] = useState(false);
  const { showFeedback } = useFeedbackAlertStore();
  let router = useRouter();

  const queryClient = useQueryClient();
  const { AxiosRequest} = useAxios();
  const { SigninUserValidation } = UserValidationSchemas();

  const storeToken = async (token: string) => {
    try {
      await AsyncStorage.setItem("token", token);
      console.log("Token stored successfully:", token);
    } catch (error) {
      console.error("Error storing the token:", error);
    }
  };

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (values: SigninFormValues) => {
      const finalVal = {
      email: values.email,
        password: values.password,
      };
      const response = await AxiosRequest({
        url: "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDUz34FFv5QcjV2TkS-tukbQh4DsMzukNg",
        method: "POST",
        data: finalVal,
      });

      return response.data;
    },

    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["fetch-user-data"] });
      showFeedback("Login successful", "success");
      // console.log("token", response.access_token);
      // storeToken(response.access_token);
      // router.push("/feedback");
    },

    onError: () => {
      showFeedback("Phone number or Password Incorrect", "failed");
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
        try {
          await mutateAsync(values);
        } catch (error: any) {
          console.error("Error during form submission:", error.message);
        }
      },
    });

  const handleCheck = () => {
    setChecked((prev) => !prev);
  };


  // const handleValue = async () => {
    
  //   let data = JSON.stringify({
  //     "phone": "071665153",
  //     "password": "Ushan@1999"
  //   });
    
  //   let config = {
  //     method: 'post',
  //     maxBodyLength: Infinity,
  //     url: 'https://api.thesocialist.lk:3000/auth/login',
  //     headers: { 
  //       'Content-Type': 'application/json'
  //     },
      
  //     data : data
  //   };
    
  //   axios.request(config)
  //   .then((response) => {
  //     console.log(JSON.stringify(response.data));
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });
  // };



  return (
    <SafeAreaView style={styles.container}>
   {isPending && <ComponentLoading/>}
      <TopHeader
        icon={
          <AntDesign
            name="arrowleft"
            size={34}
            color="#fff"
            onPress={() => router.push("/intro")}
          />
        }
        text="No account?"
        btn={
          <Button
            text="Sign up"
            textColor="#fff"
            primaryColor
            onPress={() => router.push("/signup")}
          />
        }
      />

      <View style={styles.blurcontainer}></View>
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
    backgroundColor: "#8C80FF",
    alignItems: "center",
  },
  input: {
    alignItems: "center",
  },
  blur: {
    position: "absolute",
    top: -300,
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
