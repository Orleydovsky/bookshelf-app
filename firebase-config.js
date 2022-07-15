import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyDx5RC2BNN5r2_p_w9z_OrLmoBqDrnBrWg",
  authDomain: "myapp-4cf47.firebaseapp.com",
  projectId: "myapp-4cf47",
  storageBucket: "myapp-4cf47.appspot.com",
  messagingSenderId: "743326318020",
  appId: "1:743326318020:web:c4322a066d12fe6e8c7891",
  measurementId: "G-P0931F3YW6"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app)
export const currentUser = auth.currentUser
