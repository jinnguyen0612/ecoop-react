import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCLoz4GlUDYeeFDw-hw6tP0WY3GlAiZNf0",
    authDomain: "ecooptest-76244.firebaseapp.com",
    databaseURL: "https://ecooptest-76244-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "ecooptest-76244",
    storageBucket: "ecooptest-76244.appspot.com",
    messagingSenderId: "696647956945",
    appId: "1:696647956945:web:f270ffe036c9881ab8c8f0",
    measurementId: "G-89VPEQHEZG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };
