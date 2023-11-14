// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE,
  authDomain: "blog-5cc0b.firebaseapp.com",
  projectId: "blog-5cc0b",
  storageBucket: "blog-5cc0b.appspot.com",
  messagingSenderId: "908803345348",
  appId: "1:908803345348:web:1822b9d4488d539510f291"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);