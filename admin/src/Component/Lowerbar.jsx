import React from 'react'
import { NavLink } from 'react-router-dom'
import { CiCirclePlus } from "react-icons/ci";
import { FaThList } from "react-icons/fa";
import { RiMotorbikeFill } from "react-icons/ri";

const Lowerbar = () => {
  return (
    <div className='flex mainheader items-center justify-around md:justify-center md:space-x-12 lg:space-x-16 p-2 md:p-3 bg-gray-50 border-b border-gray-200 overflow-x-auto'>
      <NavLink 
        to="/add"
        className={({ isActive }) => 
          `font-medium px-3 py-2 md:px-4 md:py-3 text-xs md:text-sm transition-all duration-200 relative border-2 gap-1 md:gap-2 flex items-center justify-center rounded-xl md:rounded-2xl min-w-[100px] md:min-w-[120px] ${
            isActive 
              ? 'text-[#ffd900] font-semibold border-[#ffd900] bg-yellow-50' 
              : 'text-gray-500 hover:text-gray-700 border-gray-300 hover:border-gray-400'
          }`
        }
      >
        <CiCirclePlus className="w-4 h-4 md:w-5 md:h-5" />
        <span className="hidden xs:inline">Add Products</span>
        <span className="xs:hidden">Add</span>
      </NavLink>

      <NavLink 
        to="/List"
        className={({ isActive }) => 
          `font-medium px-3 py-2 md:px-4 md:py-3 text-xs md:text-sm transition-all duration-200 relative border-2 rounded-xl md:rounded-2xl gap-1 md:gap-2 flex items-center justify-center min-w-[100px] md:min-w-[120px] ${
            isActive 
              ? 'text-[#ffd900] font-semibold border-[#ffd900] bg-yellow-50' 
              : 'text-gray-500 hover:text-gray-700 border-gray-300 hover:border-gray-400'
          }`
        }
      >
        <FaThList className="w-4 h-4 md:w-5 md:h-5" />
        <span className="hidden xs:inline">Collection</span>
        <span className="xs:hidden">List</span>
      </NavLink>

      <NavLink 
        to="/orders"
        className={({ isActive }) => 
          `font-medium px-3 py-2 md:px-4 md:py-3 text-xs md:text-sm transition-all duration-200 relative border-2 gap-1 md:gap-2 flex items-center justify-center rounded-xl md:rounded-2xl min-w-[100px] md:min-w-[120px] ${
            isActive 
              ? 'text-[#ffd900] font-semibold border-[#ffd900] bg-yellow-50' 
              : 'text-gray-500 hover:text-gray-700 border-gray-300 hover:border-gray-400'
          }`
        }
      >
        <RiMotorbikeFill className="w-4 h-4 md:w-5 md:h-5" />
        <span className="hidden xs:inline">Orders</span>
        <span className="xs:hidden">Orders</span>
      </NavLink>
    </div>
  )
}

export default Lowerbar