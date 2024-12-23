import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import React, { Children, createContext, useEffect, useState } from 'react';
import { auth } from '../Firebase/firebase_init_';
import useLocalStorage from 'use-local-storage';
import axios from 'axios';


export const AuthContext = createContext(null)

const googleProvider = new GoogleAuthProvider()

const Authprovider = ({children}) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    
    const preference = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const [isDark, setIsDark] = useLocalStorage("isDark", preference);
  
    const createUser = (email, password) => {
      setLoading(true)
      return createUserWithEmailAndPassword(auth, email, password)
    }
  
    const signIn = (email, password) => {
      setLoading(true)
      return signInWithEmailAndPassword(auth, email, password)
    }
  
    const signInWithGoogle = () => {
      setLoading(true)
      return signInWithPopup(auth, googleProvider)
    }
  
    const logOut = async () => {
      setLoading(true)
      return signOut(auth)
    }
  
    const updateUserProfile = (name, photo) => {
      return updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: photo,
      })
    }
  
    // onAuthStateChange
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, async currentUser => {
        console.log('CurrentUser-->', currentUser)
        setUser(currentUser)
       if(currentUser?.email){
        setUser(currentUser)
        const {data} = await axios.post(`${import.meta.env.VITE_API_URL}/jwt`,{
          email: currentUser?.email
        },{withCredentials: true})
        console.log(data)
       
       }else{
        setUser(currentUser)
        const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/logout`,{withCredentials: true})
        console.log(data)
  
       }
       setLoading(false)
      })
      return () => {
        return unsubscribe()
      }
    }, [])


    const authInfo = {
        user,
        setUser,
        loading,
        setLoading,
        createUser,
        signIn,
        signInWithGoogle,
        logOut,
        updateUserProfile,
        isDark,
        setIsDark
      }
    
    return (
      <AuthContext.Provider value={authInfo}>
        {children}
      </AuthContext.Provider>
    );
};

export default Authprovider;