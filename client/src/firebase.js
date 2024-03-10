// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "blog-a0539.firebaseapp.com",
  projectId: "blog-a0539",
  storageBucket: "blog-a0539.appspot.com",
  messagingSenderId: "942900013325",
  appId: "1:942900013325:web:7147a8cb69610b14c9e844",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
