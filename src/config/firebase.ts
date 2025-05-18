// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBn8GQwYu4JmldBCo8oeAkU-sG64TTqxcM",
  authDomain: "pedro-s-react-course-a1133.firebaseapp.com",
  projectId: "pedro-s-react-course-a1133",
  storageBucket: "pedro-s-react-course-a1133.firebasestorage.app",
  messagingSenderId: "475570048931",
  appId: "1:475570048931:web:55b643b5640d3421615416",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
