import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import Loading from '../components/Loading';
import useAuth from '../hooks/useAuth';

const PrivateRoute = ({children}) => {
    const {user,loading} = useAuth();
    const location = useLocation();
    
    if(loading){
        return <Loading></Loading>
    }
    if(user && user?.email){
        return children ;
    }
    return (
        <Navigate state={{from:location}} replace to={'/auth/login'}>  
        </Navigate>
    );
};

export default PrivateRoute;