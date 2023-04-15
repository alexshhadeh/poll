// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBWt9-HrByedkrG1IAR4H8zSJ8UctN2yzU",
    authDomain: "poll-4c07d.firebaseapp.com",
    projectId: "poll-4c07d",
    storageBucket: "poll-4c07d.appspot.com",
    messagingSenderId: "330978385710",
    appId: "1:330978385710:web:b9747637d00e15b1af64bf"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app)

export default db
