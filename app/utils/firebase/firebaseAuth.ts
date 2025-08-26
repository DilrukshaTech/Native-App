import {
  createUserWithEmailAndPassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  updateEmail
} from "firebase/auth";
import { auth } from '../../../firebaseConfig';

export const firebaseSignUp = async (email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error("Firebase Sign Up Error:", error);
    throw error;
  }
};

export const firebaseSignIn = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error("Firebase Sign In Error:", error);
    throw error;
  }
};




export const firebaseUpdateEmail = async (newEmail: string, password: string) => {
  try {
    const user = auth.currentUser;
    if (!user || !user.email) {
      throw new Error("User not authenticated");
    }

    // Re-authenticate with the current email + password
    const credential = EmailAuthProvider.credential(user.email, password);
    await reauthenticateWithCredential(user, credential);

    // Now update email
    await updateEmail(user, newEmail);
    await user.reload();

    return auth.currentUser;
  } catch (error) {
    console.error("Firebase Update Email Error:", error);
    throw error;
  }
};




export const EditFirbasePassword = async (email: string) => {
  try {
    
  await sendPasswordResetEmail(auth, email);
   
  } catch (error) {
    console.error("Firebase Update Password Error:", error);
    throw error;
  }
}