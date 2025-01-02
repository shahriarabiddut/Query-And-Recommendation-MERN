import React from 'react';
import { Outlet } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Footer from '../components/Footer';
import Header from '../components/Header';

const PageLayout = () => {
    // console.log('load PageLayout');

    return (
        <HelmetProvider>
            <header className='sticky top-0 z-[999]'> <Header/> </header>
            <main className=''><Outlet/></main> 
            <Footer/>
        </HelmetProvider>
    );
};

export default PageLayout;