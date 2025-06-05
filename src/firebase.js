import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { collection, addDoc, getDocs } from "@firebase/firestore"; // Perbarui ini


// Your web app's Firebase configuration
const firebaseConfig = {
  // apiKey: "AIzaSyB-lfUt1adpQ0KYcFFW_oAWTJVfHDOOZy8",
  // authDomain: "portofolio-web-3e8e8.firebaseapp.com",
  // projectId: "portofolio-web-3e8e8",
  // storageBucket: "portofolio-web-3e8e8.appspot.com",
  // messagingSenderId: "25195509306",
  // appId: "1:25195509306:web:2b635dcf997137bf612703"


   apiKey: "AIzaSyA5hmaqfv2akMXkjS2DkTi9_eEfCJaYLLE",
  authDomain: "portofolio-eb44e.firebaseapp.com",
  projectId: "portofolio-eb44e",
  storageBucket: "portofolio-eb44e.firebasestorage.app",
  messagingSenderId: "1035717610462",
  appId: "1:1035717610462:web:b1056c83b275c0c2d3eb4f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, collection, addDoc };