// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBsOysnNNE-gv9TVtTED2vm_69pLZ9GGJg",
    authDomain: "reacttodo-eb3a3.firebaseapp.com",
    projectId: "reacttodo-eb3a3",
    storageBucket: "reacttodo-eb3a3.appspot.com",
    messagingSenderId: "664774749305",
    appId: "1:664774749305:web:2a6f09e679c5e6a70778a8"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
