// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDseO0_GB27tAIyDF4mizq0AVZqsW_MhzA",
  authDomain: "clothesloop-14b00.firebaseapp.com",
  projectId: "clothesloop-14b00",
  storageBucket: "clothesloop-14b00.firebasestorage.app",
  messagingSenderId: "381634176143",
  appId: "1:381634176143:web:6f0b37016b9b3fa9343cfa"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);