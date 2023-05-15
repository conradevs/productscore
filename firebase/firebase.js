import { initializeApp } from "firebase/app";

import { getAuth,
    createUserWithEmailAndPassword,
    updateProfile,
    signInWithEmailAndPassword} from "firebase/auth";

import {getFirestore, collection, addDoc} from 'firebase/firestore';
import firebaseConfig from './config';

class Firebase {
        // firebase handler class constructor
    constructor () {
        // initializate & get auth
        this.app = initializeApp(firebaseConfig);
        this.auth = getAuth(this.app);
        this.db = getFirestore(this.app);
    }
    // create new user
    async createUser(name,email,password) {
        const newUser = await createUserWithEmailAndPassword(this.auth,email,password)
        updateProfile(this.auth.currentUser, {
            displayName: name
        }).then(() => {
            const user = this.auth.currentUser.displayName 
            console.log('Profile updated, new name: ',user)
        }).catch((error) => {
            console.log('Error seting user name: ',error.message)
        });
    }
    // User login
    async login(email,password) {
        return signInWithEmailAndPassword(this.auth,email,password);
    }
    // Close user session
    async logOut() {
        await this.auth.signOut();
    }

    async addProduct(item) {
        try {
            const docRef = await addDoc(collection(this.db, 'products'), item);
            console.log("Document written with ID: ", docRef.id);
          } catch (error) {
            console.error("Error adding document: ", error);
          }
    }
}

const fb = new Firebase()
export default fb;