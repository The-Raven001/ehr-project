// Import the functions you need from the SDKs you need
import firebase from "firebase/app"
import { initializeApp } from "firebase/app";
import "firebase/storage"
import "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyA9WM6SgpX0cf6WFz83oiKdJJdUJh-fabA",
  authDomain: "fb-upload-document-project.firebaseapp.com",
  projectId: "fb-upload-document-project",
  storageBucket: "fb-upload-document-project.appspot.com",
  messagingSenderId: "307085499462",
  appId: "1:307085499462:web:0b44844a90fab8ab7c3e47"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);