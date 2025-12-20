import React, { useState } from 'react'
import axios from 'axios'
import { backend_url } from '../App'
import toast, { Toaster } from 'react-hot-toast';
import { RxEyeOpen  } from "react-icons/rx";
import { VscEyeClosed } from "react-icons/vsc";

import { useRef } from 'react';
const LoginForm = ({setToken}) => {
    const [username ,setusername] = useState('')
    const [password ,setpassword] = useState('');
    const [show , setshow] = useState( false);

const inputref = useRef();
   const handletologinintoadmin = async (e) => {
  e.preventDefault();

  try {
    const response = await axios.post(
      backend_url + "/api/user/admin",
      { username, password }
    );

    if (response.data.success) {
      setToken(response.data.token);
      toast.success("Login Successful!", {
        duration: 2000,
        
      });
    } else {
      toast.error("Invalid username or password");
  inputref.current.classList.add("shake");

setTimeout(() => {
  inputref.current.classList.remove("shake");
}, 1000);
    }

  } catch (error) {
    toast.error("Server error — try again!");
    console.log(error);
  }
};
  return (
    <>
    <div className="min-h-screen   flex items-center justify-center bg-gradient-to-tr from-[#ffd90044] to-black  p-6">
               
      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10 p-8">
        <h1 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-yellow-300 to-teal-400 bg-clip-text text-transparent tracking-tight">
          Admin Login
        </h1>

        <form className="flex flex-col gap-6" onSubmit={handletologinintoadmin}>
          <div className="flex flex-col gap-2">
            <label htmlFor="username" className="text-white text-sm font-medium">
              Username
            </label>
            <input
              type= 'text'
              value={username}
              onChange={(e)=>setusername(e.target.value)}
              id="username"
              placeholder="Enter your secret user"
              className="w-full px-4 py-3 rounded-xl bg-black/20 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent"
            />
          </div>

          <div className="flex flex-col gap-2 ">
            <label htmlFor="pass" className="text-white text-sm font-medium">
              Password
            </label>
            <div  ref={inputref} className=' flex items-center  justify-around  gap-3"w-full px-4 py-3 rounded-xl bg-black/20 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent'>
                <input
              type={show ? 'text':'password'}
              ref={inputref}
              id="pass"
                value={password}
              onChange={(e)=>setpassword(e.target.value)}
              placeholder="Enter your secret password"
              className="w-full   p-3 rounded-xl   text-white placeholder-white/40 focus:outline-none "
            />
             {show ? <RxEyeOpen size={30} onClick={()=> setshow(!show)} color='white' className='  z-1000000000  cursor-pointer'/>
           : <VscEyeClosed onClick={()=> setshow(!show)} size={30} color='white' className='  z-1000000000  cursor-pointer'/>}
            </div>
          </div>

          <button
            type="submit"
            className="mt-4 cursor-pointer w-full py-3 rounded-xl bg-gradient-to-r from-yellow-400 to-teal-400 text-black font-bold hover:opacity-90 transition-all shadow-lg"
          >
            Login
          </button>
        </form>
      </div>
    </div>
    </>
  )
}

export default LoginForm