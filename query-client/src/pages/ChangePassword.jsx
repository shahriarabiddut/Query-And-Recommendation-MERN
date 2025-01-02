import React, { useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { NavLink } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

export default function ChangePassword() {
    const [error,setError] = useState([]);
    const [success,setSuccess] = useState(false);
    const {passwordReset,showToast,email,setEmail} = useAuth();;
    const emailRef = useRef();
    const handleChangePassword = (e)=>{
        e.preventDefault();
        setError([]);
        setSuccess(false);
        const emailInForm = emailRef.current.value;
        passwordReset(emailInForm)
        .then(() => {
//             console.log(`Fun Fact : 
// Firebase's sendPasswordResetEmail function doesn't check if the email is registered in the database. It simply sends a password reset email to the specified address if it exists in the Firebase Authentication system.`);
            setSuccess(true);
            showToast("Redirectiong to your Email Inbox.",'info');
            const domain = emailInForm.split('@')[1];
            // alert(domain)
            if (domain) {
                setTimeout(() => {
                    window.location.href = `https://${domain}`;
                }, 2000);
            } 
        })
        .catch((error) => {
            const errorMessage = error.message;
            console.log(errorMessage);
            setError([errorMessage]);
            setSuccess(false);
        });
        // e.target.reset();
    }
    const handleChange = (e) => {
        setEmail(e.target.value);
      };
  return (
    <div className='min-h-fit flex justify-center items-center py-10'>
            <Helmet>
                <title>Change Password | {import.meta.env.VITE_NAME || 'ProRecommendation'}</title>
            </Helmet>
            <div className="w-10/12 md:w-10/12 lg:w-1/3 mx-auto my-4">
                <h3 className='text-center text-5xl font-bold mb-3 font-barlow'>Change Password</h3>
                <div className="mx-auto">
                {
                    error && error.length > 0 && (<div className='bg-red-500 text-center rounded-xl p-3 mt-5 grid gap-1 text-white'>
                    { error.map((e,i) => <p key={i}>{e}</p>)}
                    </div>)
                }
                {
                    success && <div className='bg-green-500 text-center rounded-xl p-3 mt-5 text-white'>Successfully Change Password Email Sent!</div>
                }
                    <form className="card-body shadow-lg rounded-lg" onSubmit={handleChangePassword}>
                        <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email" ref={emailRef} value={email?email:''} placeholder="email" className="input input-bordered" onChange={handleChange} required />
                        </div>
                        <div className="form-control my-6">
                        <button className="btn bg-teal-700 text-white font-semibold hover:text-teal-800 hover:font-bold hover:bg-white">Reset</button>
                        </div>
                        <div className="form-control">
                        <label className="label">
                            <span className="label-text">New to this website? <NavLink className='text-blue-600 font-bold hover:text-purple-800' to='/auth/register'>Create an Account</NavLink> </span>
                        </label>
                        </div>
                    </form>
                </div>
            </div>
        </div>
  )
}
