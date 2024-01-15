import React, {useEffect, useState} from 'react'
import firebase from '../firebase';
function useAuth() {
  const[userAuth, saveUserAuth] = useState(null);
  useEffect(() => {
        const unsuscribe = firebase.auth.onAuthStateChanged(user => {
            if(user) {
                saveUserAuth(user);
            } else {
                saveUserAuth(null);
            }
        });
        return () => unsuscribe();
  },[]);
  return userAuth;
}

export default useAuth