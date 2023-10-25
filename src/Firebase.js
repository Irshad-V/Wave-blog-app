
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from 'firebase/firestore/lite';
import { getStorage, } from "firebase/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAE-ZJOV-B7tLU-ZK1HjhC1bJSrS-9tsHY",
    authDomain: "writing-waves---blog.firebaseapp.com",
    projectId: "writing-waves---blog",
    storageBucket: "writing-waves---blog.appspot.com",
    messagingSenderId: "723505212261",
    appId: "1:723505212261:web:d88ca40500c1dfa4508f8c",
    measurementId: "G-L92VJXYQWX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app)
const storage = getStorage(app)
const auth = getAuth(app)

export {auth,db,storage}