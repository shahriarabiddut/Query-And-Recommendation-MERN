import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { FaHome } from 'react-icons/fa';
import Lottie from 'react-lottie-player';
import { Link } from 'react-router-dom';
import animationData from '../assets/404.json';

const NotFound = () => {

  return (
    <HelmetProvider>
        <Helmet>
            <title>Page Not Found | {import.meta.env.VITE_NAME || 'ProRecommendation'}</title>
        </Helmet>
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 py-10">
      <Lottie
        loop
        animationData={animationData}
        play
        className="w-full max-w-md h-auto"
      />
      <Link to="/" className="mt-6 px-6 py-3 text-lg font-semibold text-white bg-blue-500 hover:bg-blue-600 rounded-lg flex gap-4 items-center">
             <FaHome></FaHome> Home
          </Link>
    </div>
    </HelmetProvider>
  );
};

export default NotFound;
