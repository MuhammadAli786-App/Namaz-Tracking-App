// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import {
  getFirestore,
  setDoc,
  getDoc,
  getDocs,
  collection,
  updateDoc,
  doc,
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyASl19JqUKQSLPUKBsLKsNO5taFtaP6qOM",
  authDomain: "namaz-tracking.firebaseapp.com",
  projectId: "namaz-tracking",
  storageBucket: "namaz-tracking.firebasestorage.app",
  messagingSenderId: "314358560174",
  appId: "1:314358560174:web:fe73d7f2a0b56f0ea7c43f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
export {
  auth,
  createUserWithEmailAndPassword,
  doc,
  updateDoc,
  setDoc,
  db,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  getDoc,
  getDocs,
  collection,
}
;
