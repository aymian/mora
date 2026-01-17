import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyBpZ5YXe-_PKvSPsdoU5ffjRal8fnV6_VA",
    authDomain: "mora-4b89d.firebaseapp.com",
    projectId: "mora-4b89d",
    storageBucket: "mora-4b89d.firebasestorage.app",
    messagingSenderId: "758534233604",
    appId: "1:758534233604:web:b66a44293cdfc844525f51",
    measurementId: "G-8YLCRE5T9X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const rtdb = getDatabase(app);

export { app, analytics, auth, db, rtdb };
