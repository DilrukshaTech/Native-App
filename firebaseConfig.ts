// import { initializeApp } from "firebase/app";
// import { initializeAuth,} from "firebase/auth";


// const firebaseConfig = {
//   apiKey: "AIzaSyDUz34FFv5QcjV2TkS-tukbQh4DsMzukNg",
//   authDomain: "task-app-1c20d.firebaseapp.com",
//   projectId: "task-app-1c20d",
//   storageBucket: "task-app-1c20d.appspot.com",
//   messagingSenderId: "973678836400",
//   appId: "1:973678836400:web:57b510e3337a5d10039975",
//   measurementId: "G-59C34FGP54",
// };

// const app = initializeApp(firebaseConfig);
// const auth = initializeAuth(app);

// export { auth };


import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDUz34FFv5QcjV2TkS-tukbQh4DsMzukNg",
  authDomain: "task-app-1c20d.firebaseapp.com",
  projectId: "task-app-1c20d",
  storageBucket: "task-app-1c20d.appspot.com",
  messagingSenderId: "973678836400",
  appId: "1:973678836400:web:57b510e3337a5d10039975",
  measurementId: "G-59C34FGP54",
};

const app = initializeApp(firebaseConfig);

//use getAuth (simpler than initializeAuth unless you need persistence customization)
const auth = getAuth(app);

export { app, auth };
