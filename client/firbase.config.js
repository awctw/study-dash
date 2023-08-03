// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAgUY5d0kc556sShMaMogBmfcLRNZ_ClDU",
  authDomain: "studydash-fd048.firebaseapp.com",
  projectId: "studydash-fd048",
  storageBucket: "studydash-fd048.appspot.com",
  messagingSenderId: "66459387705",
  appId: "1:66459387705:web:8e01b1649d8fd481dd8ae8",
  measurementId: "G-ELZW5L303E",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
