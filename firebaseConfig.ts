import { initializeApp } from "@firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth/react-native";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyDUz34FFv5QcjV2TkS-tukbQh4DsMzukNg",
  authDomain: "task-app-1c20d.firebaseapp.com",
  projectId: "task-app-1c20d",
  storageBucket: "task-app-1c20d.appspot.com",
  messagingSenderId: "973678836400",
  appId: "1:973678836400:web:57b510e3337a5d10039975",
  measurementId: "G-59C34FGP54"
};

//Initialize Firebase
const app = initializeApp(firebaseConfig);

//persistent Auth in React Native
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});


export { auth };
