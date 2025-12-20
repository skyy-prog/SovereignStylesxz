import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { FaUserSecret, FaOpencart } from "react-icons/fa";
import { HiMenu, HiX } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { Shopcontext } from "../context/shopcontext";
import { LuSearchX } from "react-icons/lu";
import { useLocation } from "react-router-dom";
import { AnimatePresence , motion } from "framer-motion";
import { HiLogout } from "react-icons/hi";

import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { showsearch, setshowsearch  , getcount , copysize , token , cartItems, setokens ,setcartitems , commentname} = useContext(Shopcontext);
  const navigate = useNavigate();
  const location = useLocation();
  const links = [
    { name: "Home", path: "/" },
    { name: "Collections", path: "/collections" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
    { name: "Favs", path: "/Favs" },
    {name:'Orders' , path:'/Orders'}

  ];
const handletologout  =()=>{
  const desicion = confirm('Do u really want to log out ??')
  if(desicion){
    navigate('/Login')
    localStorage.removeItem('token');
    localStorage.removeItem('name')
    setokens(null)
    setcartitems({})
     
  }
}
useEffect(()=>{

} , [commentname])
  return (
    <nav className=" backdrop-blur-3xl sticky mt-3 top-0 z-50 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          <div className="logo flex cursor-pointer justify-around">
            <NavLink to="/" className="flex items-center gap-1 md:gap-2">
              <span className="hidden md:inline text-2xl font-bold bg-gradient-to-tr from-[#ffd900] to-black bg-clip-text text-transparent">
                Sovereign Style'sxz...
              </span>
              <span className="inline md:hidden text-xl font-bold bg-gradient-to-tr from-[#ffd900] to-black bg-clip-text text-transparent">
                S²xz...
              </span>

              <img
                src="/logoo-removebg-preview.png"
                alt="Logo"
                className="h-10 w-10 pl-2 md:h-10 md:w-10 object-contain  mix-blend-multiply brightness-0 saturate-100"
              />
            </NavLink>
          </div>

          <ul className="hidden md:flex space-x-4 lg:space-x-6">
            {links.map((link) => (
              <li key={link.name}>
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    `px-3 py-2 text-base besides lg:text-lg font-medium transition-all duration-300 ${
                      isActive
                        ? "bg-gradient-to-tr from-[#ffd900] to-black bg-clip-text text-transparent"
                        : "text-black hover:text-[#ffd900]"
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="flex items-center space-x-3 gap-3 sm:space-x-4 md:space-x-6">
            <button className="text-black cursor-pointer transition-all duration-300 ">
              {location.pathname === "/collections" ? (
                showsearch ? (
                  <LuSearchX
                    onClick={() => setshowsearch(false)}
                    className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7"
                  />
                ) : (
                  <CiSearch
                    onClick={() => setshowsearch(true)}
                    className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7"
                  />
                )
              ) : (
                <CiSearch
                  onClick={() => {
                    navigate("/collections");
                    setshowsearch(true);
                  }}
                  className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7"
                />
              )}
            </button>

            {token ? <HiLogout onClick={handletologout} size={30} className=" cursor-pointer "/> :  <button onClick={()=>navigate('/Login')} className="text-black cursor-pointer transition-all duration-300 ">
              <FaUserSecret  className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
            </button>}
         

            <button  onClick={()=> navigate('/cart')} className="text-black cursor-pointer transition-all duration-300  relative">
              <FaOpencart className="w-7 h-7 sm:w-7 sm:h-7 md:w-8 md:h-8 " />
                  <AnimatePresence mode="wait">
              <motion.div
                layout
                initial={{ opacity: 0, y: 0 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 0 }}
                transition={{ duration: 1, ease: "easeIn" }}
              >
                  {copysize &&<span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-2 h-2 flex p-3 items-center justify-center rounded-full">
                {getcount()}
              </span> }
              
              </motion.div>
            </AnimatePresence>
             
            
            </button>

            <button
              className="md:hidden text-black ml-1 sm:ml-2 hover:text-[#ffd900]"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? (
                <HiX className="w-6 h-6 sm:w-7 sm:h-7" />
              ) : (
                <HiMenu className="w-6 h-6 sm:w-7 sm:h-7" />
              )}
            </button>
          </div>
        </div>
      </div>

      <div
        className={`md:hidden bg-white shadow-lg transition-all duration-300 ease-in-out ${
          menuOpen
            ? "max-h-96 opacity-100"
            : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <ul className="flex flex-col space-y-1 px-4 pb-4 pt-2">
          {links.map((link) => (
            <li key={link.name}>
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  `block px-4 py-3 besides text-base font-medium rounded-lg transition-all duration-300 ${
                    isActive
                      ? "bg-gradient-to-tr from-[#ffd900] to-black bg-clip-text text-transparent bg-gray-50"
                      : "text-black hover:text-[#ffd900] hover:bg-gray-50"
                  }`
                }
                onClick={() => setMenuOpen(false)}
              >
                {link.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
         {commentname && <p className="usernameinthelogo">Heyyy!!  {commentname}</p>}
    </nav>
  );
};

export default Navbar;
