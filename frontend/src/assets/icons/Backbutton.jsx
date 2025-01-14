import React from 'react'
import { FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';
const Backbutton = ({ destination = '/'}) => {
  return (
    <div className='flex'>
      <Link 
        to={destination}
        className='bg-inherit text-gray-800 px-4 py-1 rounded-lg w-fit hover:text-gray-600 flex'
      >
        <FaArrowLeft/>
      </Link>
    </div>
  )
}

export default Backbutton
