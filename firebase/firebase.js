import { initializeApp } from "firebase/app";
import {v4} from 'uuid'
import { getAuth,
    createUserWithEmailAndPassword,
    updateProfile,
    signInWithEmailAndPassword} from "firebase/auth";

import {getFirestore, collection, addDoc,doc,getDocs, updateDoc} from 'firebase/firestore';
import firebaseConfig from './config';
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
class Firebase {
        // firebase handler class constructor
    constructor () {
        // initializate & get auth
        this.app = initializeApp(firebaseConfig);
        this.auth = getAuth(this.app);
        this.db = getFirestore(this.app);
        this.storage = getStorage(this.app);
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

    async addProductWithImage(item,imgFile) {
        var docRef = '';
        try {
            docRef = await addDoc(collection(this.db, 'products'), item);
            //console.log("Document written with ID: ", docRef.id);
        } catch (error) {
          console.error("Error adding document: ", error);
          return null;
        }
        if (imgFile == null) {
            console.log('Product added without image')
            return;
        }
        try {
            const storageRef = ref(this.storage,`products/${imgFile.name}_${v4()}`);
            uploadBytes(storageRef,imgFile).then(() => {
            getDownloadURL(storageRef).then((imgUrl) => {
                    updateDoc( // edit existing document in this.db
                        docRef, // doc reference
                        {image: imgUrl} // update image url
                    );
                },() => console.log('update image url rejected'));
            },() => console.log('upload image rejected'));
        } catch (error) {
            console.log('error uploading product image :',error);
        }
    }

    async getProductsCollection() {
        const querySnapshot = await getDocs(collection(this.db, "products"));
        var products = []
        querySnapshot.forEach((doc) => {
            products = [...products,{id: doc.id,data: doc.data()}]
        });
        products.sort((p1,p2) => (p1.data.creationDate<p2.data.creationDate) ? p1 : p2);

        return products;
    }
    async uploadProductImage (file,productRefId) {
        if (file == null) {
            console.log('file is null')
            return;
        }
        console.log(file);
        const storageRef = ref(this.storage,`products/${file.name}_${v4()}`);
        uploadBytes(storageRef,file).then(() => {
            getDownloadURL(storageRef).then((imgUrl) => {
                const docRef = doc(this.db,"products",productRefId);
                updateDoc( // edit existing document in this.db
                    docRef, // doc reference
                    {image: imgUrl} // update image url
                );
            });
        });
    }
}

const fb = new Firebase()
export default fb;