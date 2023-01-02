import firebase, { initializeApp } from "firebase/app";
import { getAuth,
    createUserWithEmailAndPassword,
    updateProfile,
    signInWithEmailAndPassword} from "firebase/auth";
import firebaseConfig from './config';


class Firebase {
        // firebase handler class constructor
    constructor () {
        // initializate & get auth
        this.app = initializeApp(firebaseConfig);
        this.auth = getAuth(this.app);
    }
    // create new user
    createUser = async (name,email,password) => {
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
}

const fb = new Firebase()
export default fb;