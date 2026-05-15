// src/lib/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; 
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyA5DoFPaEpOJEOU_Pt9kfz7JZxofQbPfGE",
  authDomain: "thirdmission-f6a83.firebaseapp.com",
  projectId: "thirdmission-f6a83",
  storageBucket: "thirdmission-f6a83.firebasestorage.app",
  messagingSenderId: "364472290460",
  appId: "1:364472290460:web:fbbf6bb50b011605b1b159",
  measurementId: "G-P9B294M6G0"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app); 
export const analytics = typeof window !== "undefined" ? getAnalytics(app) : null;

export default app;