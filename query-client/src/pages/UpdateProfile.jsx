import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import useAxiosSecure from '../hooks/useAxiosSecure';

const UpdateProfile = () => {
    const {user,updateUserProfile,showToast} = useAuth();
    const [name,setName] = useState('');
    const [photo,setPhoto] = useState('');
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();
    const handleUpdate = (e)=>{
        e.preventDefault();
        updateUserProfile({displayName:name,photoURL:photo})
        .then(()=>{
        // Proifle Update in MongoDB
        const updateData = {email:user.email,name,photo};
        //Updated User Info
        axiosSecure.patch('/userUpdate',updateData)
        .then(data=>{
            console.log('Updated Profile',data); 
            })
            navigate('/user')
        }).catch((error) => {
            console.log(error);
        })
        showToast('Profile Updated','info')
    }
    useEffect(() => {
        setName(user?.displayName || '');
        setPhoto(user?.photoURL || '');
    }, [user]);
    return (
        <div className='min-h-fit flex justify-center items-center py-10'>
            <Helmet>
                <title>Update Profile | EquiSports</title>
            </Helmet>
            <div className="w-11/12 md:w-8/12 lg:w-1/3 mx-auto my-4">
                <h3 className='text-center text-5xl font-bold mb-3'>Update Profile</h3>
                <div className="mx-auto">
                <form className="card-body shadow-lg rounded-lg" onSubmit={handleUpdate}>
                    <div className="form-control">
                    <label className="label">
                        <span className="label-text">Name</span>
                    </label>
                    <input type="text" name='name' value={name} onChange={(e) => setName(e.target.value)}placeholder="Name" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                    <label className="label">
                        <span className="label-text">Photo URL</span>
                    </label>
                    <input type="text" name='photo' value={photo} onChange={(e) => setPhoto(e.target.value)}  placeholder="Photo URL" className="input input-bordered" required />
                    </div>
                    <div className="form-control my-6">
                    <button type='submit' className="btn bg-blue-700 text-white font-semibold hover:text-blue-800 hover:font-bold hover:bg-white">Update</button>
                    </div>
                </form>
                </div>
            </div>
        </div>
    );
};

export default UpdateProfile;