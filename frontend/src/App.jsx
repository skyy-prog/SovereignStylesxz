import "./App.css";
import React, { useEffect, useState } from "react";
import { Home } from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import Collections from "./pages/Collections";
import About from "./pages/About";
import Contact from "./pages/Contact";
import { useParams } from "react-router-dom";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Placeorders from "./pages/Placeorders";
// import Orders from './pages/Orders'
import ScrollToTop from "./components/scrolll";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Services from "./components/Services";
import Searchbar from "./components/Searchbar";
import Favs from "./pages/Favs";
import Orders from "./pages/Orders";
import Verifystripe from "./pages/Verifystripe";
// export const backend_url = import.meta.env.VITE_BACKEND_URL;
function App() {
  // const [count, setCount] = useState(0)
const [isonline , setisonline] = useState(navigator.onLine);

useEffect(() => {
  const goOnline = () => setisonline(true);
  const goOffline = () => setisonline(false);

  window.addEventListener('online', goOnline);
  window.addEventListener('offline', goOffline);

  return () => {
    window.removeEventListener('online', goOnline);
    window.removeEventListener('offline', goOffline);
  };
}, []);
  return (
    <>
    {isonline ?  
     <div className="">
        <Navbar />
        <Searchbar/> 
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/collections" element={<Collections />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/place-orders" element={<Placeorders />} />
          <Route path="/Services" element={<Services />} />
          <Route path="/Favs" element={<Favs />} />
          <Route path="/Orders" element={<Orders/>}/>
          <Route path="/verify" element={<Verifystripe/>}/>
        </Routes>
        <Footer />
      </div>
        : <h1>You are Offline</h1>}
    
    </>
  );
}

export default App;
