import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAwH3T6-N_FDTOtmaw-DcDkC6QibN8OaUg",
  authDomain: "react-register-46834.firebaseapp.com",
  projectId: "react-register-46834",
  storageBucket: "react-register-46834.appspot.com",
  messagingSenderId: "1094685830392",
  appId: "1:1094685830392:web:5732926114fdbeffd1df0d",
  measurementId: "G-9FD6QHZ3W9",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);
export const dbf = getFirestore(app);
