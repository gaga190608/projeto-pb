import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const appId = (typeof globalThis !== 'undefined' && typeof globalThis.__app_id !== 'undefined') ? globalThis.__app_id : 'default-app-id';
const firebaseConfig = {
    apiKey: "AIzaSyC88Krj44x3aI2AZBMIOpVuvUC1ox8Kh0I",
    authDomain: "passabola-41f9b.firebaseapp.com",
    projectId: "passabola-41f9b",
    storageBucket: "passabola-41f9b.firebasestorage.app",
    messagingSenderId: "854386151912",
    appId: "1:854386151912:web:47ef285dacd2e63c09945d",
    measurementId: "G-X2N34FJ3SE"
};


const app = initializeApp(firebaseConfig);


export const auth = getAuth(app);
export const db = getFirestore(app);


export { appId };