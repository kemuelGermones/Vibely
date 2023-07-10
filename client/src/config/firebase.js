// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCi3OSlQbkC4wNPHNGYc6PsUCl_viL_Mzw",
  authDomain: "vibely-5ee08.firebaseapp.com",
  projectId: "vibely-5ee08",
  storageBucket: "vibely-5ee08.appspot.com",
  messagingSenderId: "580991169080",
  appId: "1:580991169080:web:58bfe6173d142f455faccd",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth
export const auth = getAuth(app);