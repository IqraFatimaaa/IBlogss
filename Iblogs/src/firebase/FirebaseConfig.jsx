// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDywE2hvq9jbGYwRS3g3M4Sfzw6d6od0po",
  authDomain: "iblog-ba236.firebaseapp.com",
  projectId: "iblog-ba236",
  messagingSenderId: "377780989797",
  appId: "1:377780989797:web:8ddc3fc0d563f2e3a5fb8c",
  measurementId: "G-62PTSY5529",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const fireDB = getFirestore(app);
const auth = getAuth(app);

// Export services as named exports
export { fireDB, auth };
