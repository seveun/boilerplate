import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAD1itoRsarN9CIdgQhwLQ6GW9JC_x2cm4",
  authDomain: "boilerplate-4e22b.firebaseapp.com",
  databaseURL:
    "https://boilerplate-4e22b-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "boilerplate-4e22b",
  storageBucket: "boilerplate-4e22b.appspot.com",
  messagingSenderId: "404168946142",
  appId: "1:404168946142:web:d4b38694550c5e1fcded4f",
};

export const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth();
export const firestore = getFirestore();
