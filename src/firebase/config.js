// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAKGHA1danZ3X9FVNVkkhJN38In0A8eA58",
  authDomain: "lets-git-it.firebaseapp.com",
  projectId: "lets-git-it",
  storageBucket: "lets-git-it.appspot.com",
  messagingSenderId: "113499801184",
  appId: "1:113499801184:web:59fe371aa3f7c2b0e92505"
};

// Initialize Firebase
initializeApp(firebaseConfig);

// Initialise Firebase Auth
const auth = getAuth();

export { auth };