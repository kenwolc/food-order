import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyArAa3oiDkfDfLZo_qTxEDdLR3cIj96R1E",
  authDomain: "kiosk-makanan.firebaseapp.com",
  projectId: "kiosk-makanan",
  storageBucket: "kiosk-makanan.firebasestorage.app",
  messagingSenderId: "449589060342",
  appId: "1:449589060342:web:7c05a3069b4fd315f302d7",
  measurementId: "G-87630B3657"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };