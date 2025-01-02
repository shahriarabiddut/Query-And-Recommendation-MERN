import axios from "axios";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import app from "../firebase/firebase.config";
import AuthContext from './AuthContext';

const auth = getAuth(app);
const AuthProvider = ({children}) => {
  const [user,setUser] = useState(null);
  const [email,setEmail] = useState(null);
  const [loading,setLoading] = useState(true);
  const urlHome = import.meta.env.VITE_URL;
  
  //Registration : Create User 
  const createNewUser = (email,password)=>{
    setLoading(true);
    return createUserWithEmailAndPassword(auth,email,password);
  }
  // Update User
  // Todo : Verify the user
  const updateUserProfile = (updatedData)=>{
    return updateProfile(auth.currentUser,updatedData)
  }
  //Login
  const logIn = (email,password)=>{
    setLoading(true);
    return signInWithEmailAndPassword(auth,email,password);
  }
  //Logout
  const logOut = ()=>{
    axios.post(`${urlHome}/logout`, {},{withCredentials:true})
    .then(function (response) {
      console.log('Logout ',response.data);
      setLoading(false);
    })
    .catch(function (error) {
      console.log(error);
    });
    setLoading(true);
    showToast('Logged Out','info');
    return signOut(auth);
  }
  //Reset Password
  const passwordResetEmail = (email)=>{
    setEmail(email)
  }
  const passwordReset = (email)=>{
    return sendPasswordResetEmail(auth,email)
  }
  //Toast Notification
  const showToast = (message, type) => {
    if(type!=''){
        toast[type](message);
    }else{
        toast(message);
    }
  };
  //
  const authInfo = {user,setUser,showToast,createNewUser,updateUserProfile,logOut,logIn,email,passwordReset,passwordResetEmail,loading,setLoading,setEmail}
  useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth,(currentUser)=>{
        setUser(currentUser);
        console.log('Status Captured : ',currentUser?.email);
        if(currentUser?.email){
          //JWT TOKEN Info
          const userData = {email : currentUser.email}
          axios.post(`${urlHome}/jwt`, userData,{withCredentials:true})
            .then(function (response) {
              console.log(response.data);
              
            })
            .catch(function (error) {
              console.log(error);
            });
        }
        else{
          axios.post(`${urlHome}/logout`, {},{withCredentials:true})
            .then(function (response) {
              console.log('Logout ',response.data);
              setLoading(false);
            })
            .catch(function (error) {
              console.log(error);
            });
        }
        
        //Todo
        setLoading(false);
        
    })
    return () => {
        unsubscribe()
    };
},[]);
  return (
    <AuthContext.Provider value={authInfo}>
        {children}
        <ToastContainer />
    </AuthContext.Provider>
  )
}

export default AuthProvider