import React from 'react'
import banner from '../assets/banner.png'
import { FaCheck, FaQuestion } from 'react-icons/fa'
import { FaMessage } from 'react-icons/fa6'
import { TbCaretUpDown } from 'react-icons/tb'
import { Link } from 'react-router-dom'

const PageTop2 = ({title}) => {
  return (
    <div className='mb-4 border-b-2 border-b-blue-100 bg-slate-100 py-10'>
        
        <div className="w-11/12 mx-auto p-1 grid grid-cols-1 md:grid-cols-2 items-center gap-5 justify-between relative">
        {/* Left Section */}
        {title != '' ?
        <div className="py-20 flex flex-col items-center md:mx-0 mx-auto">
            <h2 className="text-3xl font-bold text-center font-rancho">{title}</h2>
        </div>
        : 
        <div className="text-center lg:text-left ">
          <h1 className="text-3xl font-bold mb-4 font-barlow">Find the best answer to your queries,
          help others answer theirs!</h1>
          
          <div className="py-5 flex flex-col space-y-4">
          <div className="flex items-center space-x-4">
            <div className="bg-primary text-white rounded-full p-3">
              <FaQuestion className="text-lg "/>
            </div>
            <p className="">Anybody can ask a question</p>
          </div>

          <div className="flex items-center space-x-4">
          <div className="bg-primary text-white rounded-full p-3">
              <FaCheck className="text-lg "/>
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
           
        </div>
        }
        {/* Right Section */}
        <div className='md:flex relative'>
          <div className="lg:mt-0 flex justify-end absolute top-14 right-10" >
            <Link to={'/queries/addqueries'}><button className="btn btn-primary font-barlow text-white text-xl"> Add New Query →</button></Link>
          </div>
            <img src={banner} alt="" />
        </div>
        
      </div>
    </div>
  )
}

export default PageTop2