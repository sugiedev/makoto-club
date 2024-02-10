// Import the functions you need from the SDKs you need
import { getApps, initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDHRrDCsx-wOlI5IlWwgboMsPLeLFcPoNc",
  authDomain: "makoto-club.firebaseapp.com",
  projectId: "makoto-club",
  storageBucket: "makoto-club.appspot.com",
  messagingSenderId: "490381370238",
  appId: "1:490381370238:web:269ab755c4f8202f85892f",
  measurementId: "G-54K16DL9W8",
};

// Initialize Firebase
const app = getApps()?.length ? getApps()[0] : initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);
