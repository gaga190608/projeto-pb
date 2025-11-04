import { auth, db, appId } from './FirebaseConfig.js';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

export const authService = {
    async login(email, password) {
        return await signInWithEmailAndPassword(auth, email, password);
    },

    async signup(email, password) {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        const userId = user.uid;

        const profileRef = doc(db, `artifacts/${appId}/users/${userId}/profiles`, 'userProfile');
        
        await setDoc(profileRef, {
            id: userId,
            email: user.email,
            createdAt: new Date().toISOString()
        });
        
        return userCredential;
    }
};