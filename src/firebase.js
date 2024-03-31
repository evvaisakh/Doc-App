import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyAVu10WjBTpqdmxPtOQH4244mmXJnksqbc",
    authDomain: "docs-web-53c85.firebaseapp.com",
    projectId: "docs-web-53c85",
    storageBucket: "docs-web-53c85.appspot.com",
    messagingSenderId: "946326364441",
    appId: "1:946326364441:web:c6371854ae6e632706e588",
    measurementId: "G-GSZ6RVFST0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);