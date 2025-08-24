import Button from "@/app/components/buttons/TopBtn";
import Input from "@/app/components/input/Input";
import TopHeader from "@/app/components/topHeader/TopHeader";
import { SafeContainer } from "@/components/SafeContainer";
import { ThemedView } from "@/components/ThemedView";
import { AntDesign } from "@expo/vector-icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocalSearchParams, useRouter } from "expo-router";
import ComponentLoading from "@/app/components/Loading/ComponentLoading";
import useFeedbackAlertStore from "@/app/stores/useFeedbackAlertStore";
import useAxios from "@/app/utils/axios/useAxios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFormik } from "formik";

interface EditNameProps {
  name: string;
}

export default function EditName() {
  const { AxiosRequest } = useAxios();
  const { showFeedback } = useFeedbackAlertStore();
  const router = useRouter();

  const queryClient = useQueryClient();

  const { name } = useLocalSearchParams<{ name: string }>();

  const { mutateAsync, isPending: userPending } = useMutation({
  mutationFn: async ({ name }: EditNameProps) => {


    console.log("Updating name to:", name);
    const refreshToken = await AsyncStorage.getItem("refreshToken");
    if (!refreshToken) throw new Error("No refresh token found");

    const res = await fetch(
      `https://securetoken.googleapis.com/v1/token?key=AIzaSyDUz34FFv5QcjV2TkS-tukbQh4DsMzukNg`,
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `grant_type=refresh_token&refresh_token=${refreshToken}`,
      }
    );

    const data = await res.json();
    if (!data.id_token) throw new Error("Failed to refresh token");
    const idToken = data.id_token;
    console.log("Refreshed ID Token:", idToken);

    await AsyncStorage.setItem("token", idToken);

    const response = await AxiosRequest({
      url: '/users/update',
      method: "PATCH",
      data: { name },
      headers: { Authorization: `Bearer ${idToken}` },
    });

    return response.data;
  },
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["user"] });
    router.push("/profile");
  },
  onError: () => {
    showFeedback("Failed to update name", "failed");
  },
});

  const { handleSubmit, handleChange, values, errors, touched } = useFormik({
    initialValues: {
      name: "",
    },
    onSubmit: async (values) => {
        await mutateAsync({name: values.name });
    
    },
  });
  return (
    <SafeContainer>
      {userPending && <ComponentLoading />}
      <TopHeader
        icon={
          <AntDesign
            name="arrowleft"
            size={30}
            color="#1E1E1E"
            onPress={() => router.push("/profile")}
          />
        }
        title="Edit Name"
        btn={
          <Button
            text="Save"
            textColor="#fff"
            primaryColor
            onPress={()=>handleSubmit()}
          />
        }
      />

      <ThemedView style={{ paddingTop: 20 }}>
        <Input
          label="Name"
          type="text"
          value={values.name || name || ""}
          onChange={handleChange("name")} 
          error={touched.name && errors.name}
          touched={touched.name}
        />
      </ThemedView>
    </SafeContainer>
  );
}
