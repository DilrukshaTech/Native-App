import PressableInput from "@/app/components/input/PressableInput";
import ComponentLoading from "@/app/components/Loading/ComponentLoading";
import { Popup } from "@/app/components/popup/Popup";
import { useLists } from "@/app/hooks/myLists";
import { SafeContainer } from "@/components/SafeContainer";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import {
  Platform,
  Pressable,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Divider } from "react-native-paper";
import Button from "../../components/buttons/TopBtn";
import SingleInput from "../../components/input/SingleInput";
import TopHeader from "../../components/topHeader/TopHeader";
import useFeedbackAlertStore from "../../stores/useFeedbackAlertStore";
import useUserStore from "../../stores/useUserStore";
import useAxios from "../../utils/axios/useAxios";
import UpdateTasksSkeloton from "@/app/components/skeloton/UpdateTasksSkeloton";

interface CreateListProps {
  userId?: number;
  title: string;
  description?: string;
  period?: string;
  startTime?: string;
  endTime?: string;
  priority?: string;
  listId?: number | null;
    Date?:string;
}

export default function UpdateTask() {
  const { AxiosRequest } = useAxios();
  const { user } = useUserStore();
  const queryClient = useQueryClient();
  const { showFeedback } = useFeedbackAlertStore();
  const router = useRouter();
  const [time, setTime] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [showPicker, setShowPicker] = useState(false);
    const [showDatePicker, setShowDatePicker] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const { id} = useLocalSearchParams<{ id: string }>();

  //get task by id 

  const { data: taskData, isFetching: taskLoading } = useQuery({
    queryKey: ["task", id],
    queryFn: async () => {
      const response = await AxiosRequest({
        url: `/tasks/${id}`,
        method: "GET",
      });
      return response.data;
    },

    enabled: !!id, 
    refetchOnWindowFocus: false,
    });

  // fetch lists
  const { data: myList, isLoading: myListLoading } = useLists(user?.id);

  // transform API response into popup list
  const popupList =
    myList?.listRates?.map((item: any) => ({
      id: item.listId,
      label: item.listTitle,
    })) || [];

 const formik = useFormik({
  initialValues: {
    title: taskData?.title || "",
    description: taskData?.description || "",
    period: taskData?.period || "Today",
    startTime: taskData?.startTime || "",
    endTime: taskData?.endTime || "",
    priority: "High",
    listId: taskData?.list?.id || null,
    Date: taskData?.Date.split('T')[0] || "",
  },
  enableReinitialize: true, 
  onSubmit: async (values) => {
    await mutateAsync(values);
  },
});




  const handleTimeChange = (event: any, selectedTime?: Date) => {
    setShowPicker(Platform.OS === "ios");
    if (selectedTime) {
      let hours = selectedTime.getHours();
      let minutes = selectedTime.getMinutes();
      const ampm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12 || 12;
      const minutesStr = minutes < 10 ? `0${minutes}` : minutes;
      const formatted = `${hours}:${minutesStr} ${ampm}`;
      setTime(formatted);
      formik.setFieldValue("startTime", formatted);
    }
  };


  //date change 
   const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(Platform.OS === "ios");
    if (selectedDate) {
     
      formik.setFieldValue("Date", selectedDate.toISOString());
    }
  };

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (values: CreateListProps) => {
      const response = await AxiosRequest({
        url: `/tasks/update?userId=${user?.id}&id=${id}`,
        method: "PATCH",
        data: {
          title: values.title,
          description: values.description || "",
          period: values.period || "Today",
          startTime: values.startTime || "",
          endTime: "",
          priority: "High",
          listId: values.listId || null,
        },
      });
      return response.data;
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      router.push("/tasks");
    },
    onError() {
      showFeedback("Failed to update the task", "failed");
    },
  });

  const handleClose = () => setShowPopup(false);
  const handleOpen = () => setShowPopup(true);

  // find selected list label
  const selectedListLabel =
    popupList.find((l: any) => l.id === formik.values.listId)?.label

  return (
    <SafeContainer>
      {(isPending || myListLoading || taskLoading) && <UpdateTasksSkeloton/>}
      <TopHeader
        icon={
          <AntDesign
            name="close"
            size={30}
            color="#798494"
            onPress={() => router.push("/tasks")}
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

      <Popup
        visible={showPopup}
        list={popupList}
        value={formik.values.listId}
        onChange={(val) => formik.setFieldValue("listId", val)}
        onClose={handleClose}
      />

      <ThemedView style={styles.inputContainer}>
        <SingleInput
          label="Task Name"
          keyboardType="default"
          value={formik.values.title }
          onChangeText={formik.handleChange("title")}
        />

        <ThemedView style={{ gap: 15, flexDirection: "column" }}>
          <ThemedView
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 10,
            }}
          >
            <PressableInput
              title="Today"
            value={"Today" }
              selectedValue={formik.values.period}
              onChange={(val) => formik.setFieldValue("period", val)}
            />
            <PressableInput
              title="Tomorrow"
              value="Tomorrow"
              selectedValue={formik.values.period}
              onChange={(val) => formik.setFieldValue("period", val)}
            />
            <PressableInput
              title="Upcoming"
              value="Upcoming"
              selectedValue={formik.values.period}
              onChange={(val) => formik.setFieldValue("period", val)}
            />
          </ThemedView>

          {/* Time picker */}
          <ThemedView
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Pressable
              style={{
                flexDirection: "row",
                gap: 5,
                alignItems: "center",
              }}
              onPress={() => setShowPicker(true)}
            >
              <MaterialIcons name="access-time" size={20} color="black" />
              <ThemedText style={{ color: "#4C677D", fontSize: 14 }}>
                {time || taskData?.startTime || "Choose Time"}
              </ThemedText>
            </Pressable>
            {formik.values.period=== "Upcoming" && (
              <Pressable
                style={{
                  flexDirection: "row",
                  gap: 5,
                  alignItems: "center",
                }}
                 onPress={() => setShowDatePicker(true)}
              >
                <AntDesign name="calendar" size={20} color="black" />
                <ThemedText style={{ color: "#4C677D", fontSize: 14 }}>
                  {formik.values.Date? formik.values.Date.split('T')[0] : "Choose Date"}
                </ThemedText>
              </Pressable>
            )}
          </ThemedView>
          <Divider />
          {showPicker && (
            <DateTimePicker
              value={new Date()}
              mode="time"
              display="default"
              is24Hour={false}
              onChange={handleTimeChange}
            />
          )}

            {showDatePicker && (
                <DateTimePicker
                value={formik.values.Date ? new Date(formik.values.Date) : new Date()}
                mode="date"
                display="default"
                onChange={handleDateChange}
                />
            )}

          {/* description */}
          
          <ThemedView>
            {!isEditing ? (
              <TouchableOpacity
                style={styles.row}
                onPress={() => setIsEditing(true)}
              >
                <Ionicons name="menu" size={20} color="#1E1E1E" />
                <ThemedText style={styles.text}>{"Add details"}</ThemedText>
              </TouchableOpacity>
            ) : (
              <TextInput
                style={styles.textarea}
                placeholder="Type description..."
                multiline
                autoFocus
                value={formik.values.description}
                onChangeText={formik.handleChange("description")}
                onBlur={() => setIsEditing(false)}
              />
            )}
          </ThemedView>
          <Divider />

          {/* select List */}
          <ThemedView>
            <TouchableOpacity style={styles.row} onPress={handleOpen}>
              <MaterialIcons name="description" size={20} color="#1E1E1E" />
              <ThemedText style={styles.text}>{selectedListLabel}</ThemedText>
            </TouchableOpacity>
          </ThemedView>
          <Divider />
        </ThemedView>
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
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    marginLeft: 8,
    fontSize: 14,
    color: "#1E1E1E",
  },
  textarea: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 10,
    minHeight: 80,
    fontSize: 16,
  },
});
