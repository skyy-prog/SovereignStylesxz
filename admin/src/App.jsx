import { useEffect, useState } from 'react'
import React from 'react'
import './App.css'
import Navbar from './Component/Navbar'
import Lowerbar from './Component/Lowerbar'
import { Routes , Route } from 'react-router-dom'
import CompactProductForm from './pages/Add'
import List from './pages/List'
import Order from './pages/Order'
import Login from './Component/Login'
import { Toaster } from 'react-hot-toast'
export const backend_url = import.meta.env.VITE_BACKEND_URL;

function App() {
  const [token, setToken] = useState(localStorage.getItem('token')?localStorage.getItem('token') : '');
  useEffect(()=>{
    localStorage.setItem('token' , token)
  })
  return (
    <> 
      <Toaster  position="top-center"/>
      {token === '' ? (
        <Login setToken={setToken} />
      ) : (
        <>
          <Navbar  setToken={setToken}/>
          <Lowerbar />
          <Routes>
            <Route path='/Add' element={<CompactProductForm token={token} />} />
            <Route path='/List' element={<List  token = {token}/>} />
            <Route path='/Orders' element={<Order token = {token} />} />
          </Routes>
        </>
      )}
    </>
  );
}

export default App;
