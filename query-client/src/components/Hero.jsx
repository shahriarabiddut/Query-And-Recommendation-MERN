import React, { useEffect, useState } from 'react';
import heroBG from '../assets/hero-bg.jpg'
import { FaMessage } from 'react-icons/fa6';
import { TbCaretUpDown } from 'react-icons/tb';
import Slider from './Slider';
import { Link, Navigate } from 'react-router-dom';

const Hero = () => {
  const messages = ["Best Recommendations are Upvoted.","Give Recommendations as your experience!","Get Recommendations!"];
    const [message, setMessage] = useState("");
    const [messageIndex, setMessageIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
        if (charIndex < messages[messageIndex].length) {
        const timeout = setTimeout(() => {
            setMessage((prev) => prev + messages[messageIndex][charIndex]);
            setCharIndex((prev) => prev + 1);
        }, 100);
        return () => clearTimeout(timeout);
        } else {
        const timeout = setTimeout(() => {
            setMessage("");
            setCharIndex(0);
            setMessageIndex((prev) => (prev + 1) % messages.length);
        }, 1000);
        return () => clearTimeout(timeout);
        }
    }, [charIndex, messageIndex]);
  return (
    <div className="bg-gray-800 text-white flex items-center justify-center bg-cover bg-center relative py-10" style={{ backgroundImage: `url(${heroBG})` }}>
       <div className="absolute inset-0 bg-black/75"></div>
      <div className="w-11/12 mx-auto p-1 grid grid-cols-1 md:grid-cols-2 items-center gap-5 justify-between relative">
        {/* Left Section */}
        <div className="text-center lg:text-left ">
          <h1 className="text-3xl font-bold mb-4 font-barlow">Share & grow knowledge with us!</h1>
          
          <div className="py-5 flex flex-col space-y-4">
          <div className="flex items-center space-x-4">
            <div className="bg-primary text-white rounded-full p-3">
              <FaMessage className="text-lg "/>
            </div>
            <p className="">Anybody can ask a question</p>
          </div>

          <div className="flex items-center space-x-4">
          <div className="bg-primary text-white rounded-full p-3">
              <FaMessage className="text-lg transform scale-x-[-1]"/>
            </div>
            <p className="">Anybody can answer</p>
          </div>

          <div className="flex items-center space-x-4">
            <div className="bg-primary text-white rounded-full p-3">
              <TbCaretUpDown className="text-lg transform scale-x-[-1]"/>
            </div>
            <p className="">
              The best answers are voted up and rise to top
            </p>
          </div>
        </div>
          <Link to={'/queries/addqueries'}><button className="btn btn-primary font-barlow text-xl">Ask a Question →</button></Link> 
        </div>

        {/* Right Section */}
        <div className="lg:mt-0 flex flex-col justify-end pl-7">
          <Slider />
          <p className="text-2xl text-gray-200 font-rancho h-4 -mt-6 pl-5">
            {message}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
