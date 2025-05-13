// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAYeGCbWwEH7VxnJRFvRK1Vv_71C86OjrY",
  authDomain: "notion-c-6c9a7.firebaseapp.com",
  projectId: "notion-c-6c9a7",
  storageBucket: "notion-c-6c9a7.firebasestorage.app",
  messagingSenderId: "358147856576",
  appId: "1:358147856576:web:7ba8a6f144f5de48bab525"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig): getApp();
const db = getFirestore(app);

export { db }