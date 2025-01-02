import React, { useEffect, useState } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Loading from '../components/Loading';
import useAuth from '../hooks/useAuth';

const AuthLayout = () => {
    const {user} = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [load,setLoad] = useState(true);
    // console.log(location.state)
    useEffect(()=>{
        setTimeout(()=>{setLoad(false);},3000)
        if( user!=null && user?.email){
            navigate('/');
        }
    },[user]);
    
    return (
        <HelmetProvider >
            <header className='sticky top-0 z-[999]'>
                <Header/>
            </header>
            <main className='py-10'>
                {load==true ?<Loading/>:<Outlet/> }
                </main> 
            <Footer/>
        </HelmetProvider>
    );
};

export default AuthLayout;