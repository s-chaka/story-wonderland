// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "story-wonderland-oauth.firebaseapp.com",
  projectId: "story-wonderland-oauth",
  storageBucket: "story-wonderland-oauth.appspot.com",
  messagingSenderId: "577997137636",
  appId: "1:577997137636:web:d97a4094307db6992ceef1"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Firebase Storage
export const storage = getStorage(app);