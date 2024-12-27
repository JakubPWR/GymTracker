// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAnXKAUXCNlWBBmGtDtKC2HtWI3EhrSOIs",
  authDomain: "gymtracker-597d8.firebaseapp.com",
  projectId: "gymtracker-597d8",
  storageBucket: "gymtracker-597d8.firebasestorage.app",
  messagingSenderId: "672221339084",
  appId: "1:672221339084:web:c673bccff4014007451169",
  measurementId: "G-5Q1VBCZNF2",
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const db = getFirestore(FIREBASE_APP);
// const analytics = getAnalytics(FIREBASE_APP);
