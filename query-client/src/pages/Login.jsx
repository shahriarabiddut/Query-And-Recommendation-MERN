import axios from 'axios';
import { getAdditionalUserInfo, getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { FaBan, FaEye, FaGoogle } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import app from '../firebase/firebase.config';
import useAuth from '../hooks/useAuth';

const auth = getAuth(app);

const Login = () => {
    const [showPass,setShowPass] = useState(false);
    const {logIn,setUser,updateUserProfile,passwordResetEmail,showToast,setLoading} = useAuth();
    const provider = new GoogleAuthProvider();
    // SignInTime Update
    const signInTimeUpdate = (user,email)=>{
        const lastSignInTime = user.metadata.lastSignInTime;
        const signInInfo = {email,lastSignInTime};
        //Update sign In Info
        axios.patch(`${import.meta.env.VITE_URL}/users`,signInInfo)
        .then(response=>{console.log('User lastSignInTime Updated ',response);})
        //
        
    }
    const handleSignInWithGoogle = ()=>{
        signInWithPopup(auth,provider)
        .then((result)=>{
            const additionalInfo = getAdditionalUserInfo(result);
            showToast('Logged In','');
            const currentUser = result.user;
            setUser(currentUser);
            if (additionalInfo.isNewUser) {
                updateUserProfile({
                    displayName: currentUser.displayName,
                    photoURL: currentUser.photoURL,
                })
                .then(() => {
                    console.log("Profile updated successfully And Signed Up");
                })
                .catch((error) => {
                    console.error("Signed Up but Error updating profile:", error);
                });
                // Send Data to MongoDB
                const createdAt = currentUser?.metadata?.createdAt;
                const userDB = {
                  name : currentUser.displayName,email : currentUser.email, photo : currentUser.photoURL,createdAt
                };
                axios.post(`${import.meta.env.VITE_URL}/users`,userDB)
                .then(response=>{console.log('User created in DB ',response);})
                //
            }
            signInTimeUpdate(currentUser,currentUser.email);
        })
        .catch((error)=>{
            console.log(error);
            showToast('Invalid Email/Password','error');
            setUser(null);
            setError([error]);
        })
        
    }
    
    const handleLogin = (e)=>{
        e.preventDefault();
        const form = new FormData(e.target);
        const email = form.get('email');
        const password = form.get('password');
        // console.log(email,password);
        passwordResetEmail(email);
        logIn(email,password)
        .then((userCredential) => {
            showToast('Logged In','');
            const currentUser = userCredential.user;
            setUser(currentUser);
            signInTimeUpdate(currentUser,currentUser.email);
        })
        .catch((error) => {
            setLoading(false);
            showToast('Invalid Email/Password','error');
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode,errorMessage);
        });
    }
    return (
        <div className='min-h-fit flex justify-center items-center py-10'>
            <Helmet>
                <title>Login | {import.meta.env.VITE_NAME || 'ProRecommendation'}</title>
            </Helmet>
            <div className="w-10/12 md:w-10/12 lg:w-2/3 mx-auto my-4">
                <h3 className='text-center text-5xl font-bold mb-3 font-barlow'>Login</h3>
                <div className="mx-auto">
                <form className="card-body shadow-lg rounded-lg" onSubmit={handleLogin}>
                    <div className="form-control">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input type="email" name='email' placeholder="email" className="input input-bordered" required />
                    </div>
                    <div className="form-control relative">
                    <label className="label">
                        <span className="label-text">Password</span>
                    </label>
                    <input type={showPass ? 'text':"password"} name='password' placeholder="Enter Your Password" className=" input input-bordered" required />
                    <button className=" bg-cyan-400 p-2 rounded-2xl absolute right-2 top-11" type='button' onClick={() => setShowPass(!showPass)}>
                    {showPass ? <FaBan/> : <FaEye/>}</button>
                    </div>
                    <div className="form-control my-6">
                    <button type='submit' className="btn bg-blue-700 text-white font-semibold hover:text-blue-800 hover:font-bold hover:bg-white">Login</button>
                    </div>
                    <div className="label font-semibold mx-auto gap-2">
                        <span className="label-text">Don't Have An Account? <NavLink className='text-blue-700 font-bold hover:text-blue-800' to='/auth/register'>Register</NavLink> </span>
                        <div className='divider divider-horizontal'></div>
                        <span className="label-text">Forgot Password ? <NavLink className='text-blue-700 font-bold hover:text-blue-800' to='/auth/changePassword'>Request New</NavLink> </span>
                    </div>
                </form>
                <div className="divider">OR</div>
                    <div className="form-control grid gap-3">
                    <button type='button' className='btn btn-success' onClick={handleSignInWithGoogle}><FaGoogle/> Login With Google</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;