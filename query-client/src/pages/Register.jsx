import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { FaBan, FaEye } from 'react-icons/fa';
import { NavLink, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import axios from 'axios';

const Register = () => {
    const navigate = useNavigate();
    const [error,setError] = useState([]);
    const [showPass,setShowPass] = useState(false);
    const {createNewUser,setUser,updateUserProfile,showToast} = useAuth();;
    const handleRegister = (e)=>{
        e.preventDefault();
        setError([]);
        const form = new FormData(e.target);
        const name = form.get('name');
        const photo = form.get('photo');
        const email = form.get('email');
        const password = form.get('password');
        // console.log({name,email,password});
        const pass = validatePassword(password);
        if(pass!=1){
            return;
        }
        createNewUser(email,password)
        .then((userCredential) => {
            const user = userCredential.user;
            // Send Data to MongoDB
            const createdAt = user?.metadata?.createdAt;
            const userDB = {
                name,email,password,photo,createdAt
            };
            axios.post(`${import.meta.env.VITE_URL}/users`, userDB)
            .then((response) => { console.log('User created in DB', response); })
            .catch((error) => {
                console.error('Error creating user in DB:', error);
            });
            //
            showToast('Successfully Registered','success')
            setUser(user);
            updateUserProfile({displayName:name,photoURL:photo})
            .then(()=>{
                navigate('/')
            }).catch((error) => {
                console.log(error);
              })
            console.log('Signed up ',user);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode,errorMessage);
            setError([errorMessage]);
        });
    }
    const validatePassword = (password) => {
        const minLength = 8;
        let errors = [];
        if (password.length < minLength) {
            errors.push(`Password must be at least ${minLength} characters long.`);
        }
        if (!/[a-z]/.test(password)) {
            errors.push('Password must contain at least one lowercase letter.');
        }
        if (!/[A-Z]/.test(password)) {
            errors.push('Password must contain at least one uppercase letter.');
        }
        if (!/\d/.test(password)) {
            errors.push('Password must contain at least one digit.');
        }
        if (!/[!@#$%^&*()_\-+=<>?]/.test(password)) {
            errors.push('Password must contain at least one special character.');
        }

        if (errors.length > 0) {
             errors.join('\n');
            setError(errors);
            return 0;
        } else {
            return 1;
        }
    }
    return (
        <div className='min-h-fit flex justify-center items-center py-10'>
            <Helmet>
                <title>Register | {import.meta.env.VITE_NAME || 'ProRecommendation'}</title>
            </Helmet>
            <div className="w-10/12 md:w-10/12 lg:w-2/3 mx-auto my-4">
                <h3 className='text-center text-5xl font-bold mb-3 font-barlow'>Register</h3>
                <div className="mx-auto">
                {
                    error && error.length > 0 && (<div className='bg-red-500 text-center rounded-xl p-3 my-3 grid gap-1 text-white'>
                    { error.map((e,i) => <p key={i}>{e}</p>)}
                    </div>)
                }
                <form className="card-body shadow-lg rounded-lg" onSubmit={handleRegister}>
                    <div className="form-control">
                    <label className="label">
                        <span className="label-text">Name</span>
                    </label>
                    <input type="text" name='name' placeholder="Enter Your Name" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                    <label className="label">
                        <span className="label-text">Photo Url</span>
                    </label>
                    <input type="text" name='photo' placeholder="Enter Your Photo Url" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input type="email" name='email' placeholder=" Enter Your Email" className="input input-bordered" required />
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
                    <button type='submit' className="btn bg-blue-700 text-white font-semibold hover:text-blue-800 hover:font-bold hover:bg-white">Register</button>
                    </div>
                    <div className="form-control flex flex-row gap-3">
                    <label className="label font-semibold mx-auto">
                        <span className="label-text">Already Have An Account? <NavLink className='text-blue-700 font-bold hover:text-blue-500' to='/auth/login'>Login</NavLink> </span>
                    </label>
                    </div>
                </form>
                </div>
            </div>
        </div>
    );
};

export default Register;