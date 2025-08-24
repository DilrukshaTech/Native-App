import { StyleSheet } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { AntDesign } from "@expo/vector-icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { useFormik } from "formik";
import Button from "../../components/buttons/TopBtn";
import ColorPickup from "../../components/input/ColorPickup";
import SingleInput from "../../components/input/SingleInput";
import TopHeader from "../../components/topHeader/TopHeader";
import useFeedbackAlertStore from "../../stores/useFeedbackAlertStore";
import useUserStore from "../../stores/useUserStore";
import useAxios from "../../utils/axios/useAxios";
import ComponentLoading from "@/app/components/Loading/ComponentLoading";
import { SafeContainer } from "@/components/SafeContainer";

interface CreateListProps {
  userId?: number;
  title: string;
  colorCode: string;
  description?: string;
}

export default function CreateList() {
  const { AxiosRequest } = useAxios();
  const { user } = useUserStore();
  const queryClient = useQueryClient();
  const { showFeedback } = useFeedbackAlertStore();
  const router = useRouter();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (values: CreateListProps) => {
      const response = await AxiosRequest({
        url: "/lists",
        method: "POST",
        data: {
          userId: user?.id,
          title: values.title,
          colorCode: values.colorCode,
          description: "",
        },
      });
      return response.data;
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["lists"] });
      router.push("/home");
    },
    onError() {
      showFeedback("Failed to create list", "failed");
    },
  });

  const formik = useFormik({
    initialValues: {
      title: "",
      colorCode: "",
     
    },
    onSubmit: async (values) => {
      await mutateAsync(values);
    },
  });

  return (
    <SafeContainer>
      {isPending && <ComponentLoading />}
      <TopHeader
        icon={
          <AntDesign
            name="close"
            size={30}
            color="#798494"
            onPress={() => router.push("/home")}
          />
        }
        btn={
          <Button
            text="Save"
            textColor="#fff"
            primaryColor
            onPress={formik.handleSubmit} 
          />
        }
      />
      <ThemedView style={styles.inputContainer}>
        <SingleInput
          label="List Name"
          keyboardType="default" 
          value={formik.values.title}
          onChangeText={formik.handleChange("title")}
        />
        <ColorPickup
          value={formik.values.colorCode}
          onChange={(color) => formik.setFieldValue("colorCode", color)} 
        />
      </ThemedView>
    </SafeContainer>
  );
}

const styles = StyleSheet.create({
 
  inputContainer: {
    flexDirection: "column",
    paddingTop: 20,
    gap: 16,
  },
});
