// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBzBA7LCHZbRA4UtRca6uyn4Rq2TN3TUhc",
  authDomain: "f-pizza-3526b.firebaseapp.com",
  projectId: "f-pizza-3526b",
  storageBucket: "f-pizza-3526b.appspot.com",
  messagingSenderId: "596800834372",
  appId: "1:596800834372:web:94c55819453a1c222be511",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
