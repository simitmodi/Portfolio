// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  "projectId": "profolio-dy2gh",
  "appId": "1:554597720213:web:1a9db513ff2ae344a47b9c",
  "storageBucket": "profolio-dy2gh.firebasestorage.app",
  "apiKey": "AIzaSyCEa7qf3JHivJp0T_Nz6IvsSeu5BWFFR8Y",
  "authDomain": "profolio-dy2gh.firebaseapp.com",
  "measurementId": "",
  "messagingSenderId": "554597720213"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
