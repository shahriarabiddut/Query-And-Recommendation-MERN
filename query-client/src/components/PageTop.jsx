import React from 'react'
import banner from '../assets/banner.png'

const PageTop = ({title}) => {
  return (
    <div className='mb-4 border-b-2 border-b-blue-100'>
        
        <div className="flex justify-between items-center py-2">
            <div className="py-20 flex flex-col items-center md:mx-0 mx-auto">
                <h2 className="text-3xl font-bold text-center font-rancho">{title}</h2>
            </div>
            <div className='md:flex hidden'>
                <img src={banner} alt="" />
            </div>
        </div>
    </div>
  )
}

export default PageTop