// Import the functions you need from the SDKs you need
//import * as firebase from "firebase
//import * as firebase from "firebase/app";
import firebase from "firebase/compat/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// cada produto do firebase deve ser importad separadamente
//por exemplo auth de autenticação
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBlbE07sAWIynyZKtjRAqVvBNlrrKziaXw",
  authDomain: "tads-863dd.firebaseapp.com",
  projectId: "tads-863dd",
  storageBucket: "tads-863dd.appspot.com",
  messagingSenderId: "588037727062",
  appId: "1:588037727062:web:c827eab9549ef277a6acf7",
  measurementId: "G-Z0TYG5EYFJ"

};


// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const auth = firebase.auth();
const firestore = firebase.firestore();
const storage = firebase.storage();
export { auth, firestore,storage };
