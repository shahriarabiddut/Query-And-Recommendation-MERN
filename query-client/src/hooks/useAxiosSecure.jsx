import axios from 'axios';
import { useEffect } from 'react';
import useAuth from './useAuth';
import { useNavigate } from 'react-router-dom';

const axiosInstance = axios.create({
    baseURL: `${import.meta.env.VITE_URL}`,
    withCredentials:true,
});

const useAxiosSecure = () => {
    const {logOut} = useAuth();
    const navigate = useNavigate();
    useEffect(()=>{
        axiosInstance.interceptors.response.use(
            (res)=>{
            return res;
        },
        (err)=>{
            // console.log('Error Caught in Interceptor',err)
            if(err.status === 401 || err.status === 403){
                // console.log('Logout the User',err)
                logOut();
                navigate('/auth/login');
            }
            return Promise.reject(err);
        }
    )
    },[])
  return  axiosInstance;
}

export default useAxiosSecure