// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp, type FirebaseOptions } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// This correctly uses the Next.js mechanism for exposing environment variables to the client.
const firebaseConfig: FirebaseOptions = {
  projectId: "profolio-dy2gh",
  appId: "1:554597720213:web:1a9db513ff2ae344a47b9c",
  storageBucket: "profolio-dy2gh.appspot.com",
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "profolio-dy2gh.firebaseapp.com",
  messagingSenderId: "554597720213",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
