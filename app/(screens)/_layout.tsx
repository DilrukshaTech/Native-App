import { Stack} from "expo-router";

import FeedbackAlart from "../components/alert/FeedbackAlart";
import { PaperProvider } from 'react-native-paper';
export default function StackLayout() {
  


  return (
    <>
      <PaperProvider>
      <FeedbackAlart />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(screens)" />
      </Stack>
      </PaperProvider>
    </>
  );
}
