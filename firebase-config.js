// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyArAa3oiDkfDfLZo_qTxEDdLR3cIj96R1E",
  authDomain: "kiosk-makanan.firebaseapp.com",
  databaseURL: "https://kiosk-makanan-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "kiosk-makanan",
  storageBucket: "kiosk-makanan.firebasestorage.app",
  messagingSenderId: "449589060342",
  appId: "1:449589060342:web:7c05a3069b4fd315f302d7",
  measurementId: "G-87630B3657"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);