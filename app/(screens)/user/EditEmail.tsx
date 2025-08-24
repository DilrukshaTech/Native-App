
import InputPopup from "@/app/components/alert/InputPopup";
import Input from "@/app/components/input/Input";
import ComponentLoading from "@/app/components/Loading/ComponentLoading";
import TopHeader from "@/app/components/topHeader/TopHeader";
import useFeedbackAlertStore from "@/app/stores/useFeedbackAlertStore";
import useAxios from "@/app/utils/axios/useAxios";
import { firebaseUpdateEmail } from "@/app/utils/firebase/firebaseAuth";
import { SafeContainer } from "@/components/SafeContainer";
import { ThemedView } from "@/components/ThemedView";
import { AntDesign } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import Button from "@/app/components/buttons/TopBtn";


interface EditEmailProps {
  email: string;
  password: string;
}

export default function EditEmail() {
  const { AxiosRequest } = useAxios();
  const { showFeedback } = useFeedbackAlertStore();
  const router = useRouter();
  const queryClient = useQueryClient();
  const { email } = useLocalSearchParams<{ email: string }>();

  const [popupVisible, setPopupVisible] =useState(false);
  const [formEmail, setFormEmail] = useState(email || "");

  const { mutateAsync, isPending: userPending } = useMutation({
    mutationFn: async ({ email, password }: EditEmailProps) => {
      try {
       
        await firebaseUpdateEmail(email, password);

        const token = await AsyncStorage.getItem("token");
        const response = await AxiosRequest({
          url: "/users/update",
          method: "PATCH",
          data: { email },
          headers: { Authorization: `Bearer ${token}` },
        });

        return response.data;
      } catch (error) {
        console.error("Error updating email:", error);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      router.push("/profile");
      
    },
    onError: () => {
      showFeedback("Failed to update email", "failed");
    },
  });

  return (
    <SafeContainer>
      {userPending && <ComponentLoading/>}

      {/* Header */}
      <TopHeader
        icon={
          <AntDesign
            name="arrowleft"
            size={30}
            color="#1E1E1E"
            onPress={() => router.push("/profile")}
          />
        }
        title="Edit Email"
        btn={
          <Button
            text="Save"
            textColor="#fff"
            primaryColor
            onPress={() => setPopupVisible(true)} // open popup instead of submit
          />
        }
      />

    
      <ThemedView style={{ paddingTop: 20 }}>
        <Input
          label="Email"
          type="text"
          value={formEmail}
          onChange={setFormEmail}
        />
      </ThemedView>

   
      <InputPopup
        visible={popupVisible}
        onDismiss={() => setPopupVisible(false)}
        onSubmit={(password) =>
          mutateAsync({ email: formEmail, password })
        }
      />
    </SafeContainer>
  );
}
