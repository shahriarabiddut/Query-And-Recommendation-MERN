import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import ErrorPage from '../pages/ErrorPage';
import HomeLayout from '../layouts/HomeLayout';
import AuthLayout from '../layouts/AuthLayout';
import Login from '../pages/Login';
import Register from '../pages/Register';
import ChangePassword from '../pages/ChangePassword';
import UserLayout from '../layouts/UserLayout';
import Profile from '../pages/Profile';
import PageLayout from '../layouts/PageLayout';
import Queries from '../pages/Queries';
import PrivateRoute from './PrivateRoute';
import MyQueries from '../pages/MyQueries';
import AddQuery from '../pages/AddQuery';
import RecomForMe from '../pages/RecomForMe';
import MyRecomendations from '../pages/MyRecomendations';
import ViewQuery from '../pages/ViewQuery';
import UpdateQuery from '../pages/UpdateQuery';
import UpdateProfile from '../pages/UpdateProfile';

const urlHome = import.meta.env.VITE_URL;
const router = createBrowserRouter([
    
    {
        path:'/',
        element: <HomeLayout/>,
        loader: async () => {
            try {
              const [category,queries,counts] = await Promise.all([
                fetch(`${urlHome}/category`).then(res => res.json()),
                fetch(`${urlHome}/queries?page=1&size=6`).then(res => res.json()),
                fetch(`${urlHome}/counts`).then(res => res.json()),
              ]);
              return { category,queries,counts };
      
            } catch (error) {
              console.error("Error fetching data:", error);
              throw new Response('Data fetch failed', { status: 500 });
            }
          },
        errorElement: <ErrorPage/>,
    },
    {
        path:'/auth',
        element: <AuthLayout/>,
        errorElement:<ErrorPage/>,
        children:[
            {
                path:'/auth/',
                element: <Login/>
            },
            {
                path:'/auth/login',
                element: <Login/>
            },{
                path:'/auth/register',
                element:  <Register/>
            },
            {
                path:'/auth/changePassword',
                element: <ChangePassword/>
            },

        ]
    },{
        path:'/user',
        element: <UserLayout/>,
        errorElement:<ErrorPage/>,
        children:[
            {
                path:'/user/',
                element: <Profile/>
            },{
                path:'/user/updateProfile/',
                element: <UpdateProfile/>
            },

        ]
    },{
        path:'/queries',
        element: <PageLayout/>,
        errorElement:<ErrorPage/>,
        children:[
            {
                path:'/queries',
                element: <Navigate to="/queries/all" />
            },{
                path:'/queries/all',
                element: <Queries/>
            },{
                path:'/queries/:id',
                element: <ViewQuery/>,
                loader : ({params})=> fetch(`${urlHome}/query/${params.id}`).then(res => res.json())
            },{
                path:'/queries/myqueries',
                element: <PrivateRoute><MyQueries/></PrivateRoute>
            },{
                path:'/queries/addqueries',
                element: <PrivateRoute><AddQuery/></PrivateRoute> ,
                loader: ()=> fetch(`${urlHome}/category`).then(res => res.json())
            },{
                path:'/queries/update/:id',
                element: <PrivateRoute><UpdateQuery/></PrivateRoute> ,
                loader: ()=> fetch(`${urlHome}/category`).then(res => res.json())
            },{
                path:'/queries/recommendation',
                element: <PrivateRoute><RecomForMe/></PrivateRoute> 
            },{
                path:'/queries/myrecommendations',
                element: <PrivateRoute><MyRecomendations/></PrivateRoute> 
            },

        ]
    },
])

export default router;