import React, { useContext, useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Latestcolletion from "./Latestcolletion";
import { Favcontext } from "../context/Favcontext"; 
import { Shopcontext } from "../context/shopcontext";
import BrandFAQ from "./BrandFAQ";
//  import { shopcontext } from '../context/shopcontext';
// import toast, { Toaster } from 'react-hot-toast';
// import { AnimatePresence , motion } from "framer-motion";
// import Snowfall from 'react-snowfall'
const MainHome = () => {
  const IMgRfef = useRef(null);
  const CircleRef = useRef(null);
  const Imgreffemale = useRef(null);
  const circleFemale = useRef(null);
  const ImgKids = useRef(null);
  const CircleKids = useRef(null);
  const mainref = useRef();
  const maincircle = useRef();
  const [visible, setvisible] = useState(false);
  const [visiblefemale, setvisiblefemale] = useState(false);
  const [visiblekids, setvisiblekids] = useState(false);
  const [clickcircle, setclickcircle] = useState(true);
  const [toshowthelogo, settoshowthelogo] = useState(true);
  const navigate = useNavigate();
  const handleforanimationofcircle = (e) => {
    const Rect = IMgRfef.current.getBoundingClientRect();
    const x = e.clientX + 60 - Rect.left;
    const y = e.clientY + 60 - Rect.top;
    CircleRef.current.style.left = `${x}px`;
    CircleRef.current.style.top = `${y}px`;
  };
  const mostperentcontainerforthecircle = (e) => {
    const Rect = mainref.current.getBoundingClientRect();
    const x = e.clientX + 90 - Rect.left;
    const y = e.clientY + 220 - Rect.top;
    maincircle.current.style.left = `${x}px`;
    maincircle.current.style.top = `${y}px`;
    
  };

  const handleforthecircleoffemale = (e) => {
    const Rect = Imgreffemale.current.getBoundingClientRect();
    const x = e.clientX + 60 - Rect.left;
    const y = e.clientY + 60 - Rect.top;
    circleFemale.current.style.left = `${x}px`;
    circleFemale.current.style.top = `${y}px`;
    
  };

  const handleforthemousemoveforthekiids = (e) => {
    const Rect = ImgKids.current.getBoundingClientRect();
    const x = e.clientX + 2 * 30 - Rect.left;
    const y = e.clientY + 2 * 30 - Rect.top;
    CircleKids.current.style.left = `${x}px`;
    CircleKids.current.style.top = `${y}px`;
  };

  const taglines = [
    "Wear the Quality.",
    "Defined by Elegance.",
    "Crafted for the Confident.",
    "Sovereign by Style.",
    "Luxury in Every Thread.",
    "Designed to Dominate.",
    "Where Comfort Meets Class.",
    "Your Style, Your Reign.",
    "Beyond Ordinary Fashion.",
    "Built Different, Worn Better.",
    "Redefine Your Wardrobe.",
    "Style that Speaks Power.",
    "Dress Like Royalty.",
    "Minimal. Modern. Majestic.",
    "For Those Who Set Trends.",
    "Every Stitch Tells a Story.",
    "Quality You Can Feel.",
    "Rule the Streets in Style.",
    "Made to Be Remembered.",
    "Because Style Deserves Respect.",
  ];
  const randomtags = taglines[Math.floor(Math.random() * taglines.length)];
  const handletohidethelogo = () => {
    settoshowthelogo(false);
  };
  useEffect(() => {
    randomtags;
  });
  const handletoshowthelogo = () => {
    settoshowthelogo(true);
  };

  return (
    <div
      ref={mainref}
      onMouseLeave={handletohidethelogo}
      onMouseMove={mostperentcontainerforthecircle}
      onMouseEnter={handletoshowthelogo}
      className="w-full bg-white"
    >
     
     
      {toshowthelogo && (
        <div
          ref={maincircle}
          className="follow-circle-maincontainer absolute cursor-pointer w-[100px] h-[100px] bg-black/70 text-white flex items-center justify-center rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2 p-5"
        >   
          <div
            onClick={() => setclickcircle(!clickcircle)}
            className="flex items-center justify-center w-full h-full cursor-pointer"
            style={{ pointerEvents: "auto" }} // 🔥 allows clicking inside even if parent has none
          >
            {clickcircle ? (
              <img
                src="/logoo-removebg-preview.png"
                alt="logo"
                className="w-25 h-25 object-contain transition-all duration-300 ease-in-out  no-select"
              />
            ) : (
              <span className="text-black    no-select font-semibold text-center  universalfontgreatvibes  transition-all duration-300  ease-in-out">
                {randomtags}
              </span>
            )}
          </div>
        </div>
      )}

      <div className="w-full h-8vh bg-gradient-to-r from-red-600 via-red-700 to-red-600 py-3">
        <marquee
          behavior="scroll"
          direction="left"
          className="text-white tagline text-sm md:text-base font-medium "
          scrollamount="8"
        >
          ✦ Sovereign Style'sxz – Adorn yourself in the elegance of royalty ✦
          Wear the legacy of kings and queens ✦ Fabrics that tell tales of
          grandeur and power ✦ Timeless luxury and sophistication ✦ Unmatched
          prestige of sovereign style ✦
        </marquee>
      </div>

      <div className="w-full min-h-screen flex flex-col items-center px-4 sm:px-6 lg:px-8 py-8 sm:py-16">
        <div className="text-center  maintag mb-12 sm:mb-16 lg:mb-20 space-y-6 sm:space-y-8 max-w-6xl">
          <h1 className="text-5xl sm:text-7xl lg:text-8xl xl:text-9xl   flex items-center justify-center bg-gradient-to-r from-gray-900 via-black to-gray-900 bg-clip-text text-transparent leading-tight">
            Wear The Class
          </h1>
          <div className=" flex items-center justify-center">
            <img src="/logoo.png" width={"60vw"} alt="" />
          </div>
          <h1 className="text-5xl sm:text-7xl lg:text-8xl xl:text-9xl  bg-gradient-to-r from-black via-gray-900 to-black bg-clip-text text-transparent leading-tight">
            Feel Luxury
          </h1>
          <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto mt-8 leading-relaxed">
            Discover the epitome of elegance where every stitch tells a story of
            royalty. Our collections are meticulously crafted to transform your
            wardrobe into a regal statement of sophistication and timeless
            appeal.
          </p>
        
        </div>
  
        {/* First Image Section */}
        <div className="flex flex-col lg:flex-row justify-center items-center gap-8 sm:gap-12 lg:gap-16 w-full max-w-7xl mb-16 sm:mb-20 lg:mb-24 bg-transparent">
          <div className="left flex-1 w-full group relative ">
            <img
              onClick={() =>
                navigate("/collections", { state: { category: "Womens" } })
              }
              ref={Imgreffemale}
              onMouseMove={handleforthecircleoffemale}
              onMouseEnter={() => setvisiblefemale(true)}
              onMouseLeave={() => setvisiblefemale(false)}
              src="/heroimg.jpg"
              className="w-full h-auto  cursor-pointer max-h-[300px] sm:max-h-[400px] lg:max-h-[500px] object-cover rounded-2xl shadow-lg group-hover:shadow-2xl transition-all duration-500 transform group-hover:scale-[1.02]"
              alt="Luxury fashion collection showcasing premium fabrics and elegant designs"
            />
            <div className="mt-4 text-center lg:text-left">
              <h3 className="text-xl sm:text-1xl font-semibold  backdrop-blur-md mb-2 infobuttomimg absolute bottom-10  left-20 border rounded-2xl p-1 bg-gradient-to-tr from-[#c3a707] to-black bg-clip-text text-transparent">
                Premium Collection
              </h3>
              <p className="text-gray-600 text-sm sm:text-base infobuttomimg">
                Experience our exclusive range of royal-inspired attire, crafted
                with the finest materials and attention to detail that defines
                true luxury.
              </p>
            </div>
            {visiblefemale && (
              <div
                className="follow-circle-female absolute  w-[100px] h-[100px] bg-black/70 text-white flex items-center justify-center rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2"
                ref={circleFemale}
              >
                   Navigate to <br />
                Womens Class
              </div>
            )}
          </div>

          <div className="right flex-1 w-full group relative" ref={IMgRfef}>
            <img
              onClick={() =>
                navigate("/collections", { state: { category: "Mens" } })
              }
              onMouseMove={handleforanimationofcircle}
              onMouseLeave={() => setvisible(false)}
              onMouseEnter={() => setvisible(true)}
              src="/heroimg2.jpg"
              className="w-full h-auto cursor-pointer max-h-[300px] sm:max-h-[400px] lg:max-h-[500px] object-cover rounded-2xl shadow-lg group-hover:shadow-2xl transition-all duration-500 transform group-hover:scale-[1.02]"
              alt="Elegant style selection for sophisticated individuals"
            />
            <div className="mt-4 text-center lg:text-left">
              <h3 className="text-xl sm:text-1xl bg-black font-semibold  backdrop-blur-md mb-2 infobuttomimg absolute bottom-10  left-40 border rounded-2xl p-1 bg-gradient-to-tr from-[#c3a707] to-black bg-clip-text text-transparent">
                Signature Styles
              </h3>
              <p className="text-gray-600 text-sm sm:text-base infobuttomimg">
                Each piece in our signature collection is designed to make you
                feel empowered, confident, and truly regal in every setting.
              </p>
            </div>

            {visible && (
              <div
                className="follow-circle absolute  w-[400px] h-[400px] bg-black/70 text-white flex items-center justify-center rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2"
                ref={CircleRef}
              > 
              Go to <br />
                Mens Class
              </div>
            )}
          </div>
        </div>

        {/* Second Content Section */}
        <div className="flex flex-col lg:flex-row justify-between items-center secondmaintree gap-12 sm:gap-16 w-full max-w-7xl mb-16 buttomsection">
          <div className="left  secondmaintreesubtree flex-1 text-center lg:text-left">
            {/* <h1 className='text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-800 leading-tight mb-6'>
              Where We Convert <span className='bg-gradient-to-r from-amber-500 to-yellow-600 bg-clip-text text-transparent'>Imagination</span> Into <span className='bg-gradient-to-r from-red-500 to-pink-600 bg-clip-text text-transparent'>Reality</span>
            </h1> */}
            <h1 className="text-2xl sm:text-4xl  lg:text-5xl xl:text-6xl font-bold text-gray-800 leading-tight mb-6">
              Where We Convert{" "}
              <span className=" bg-gradient-to-tr from-[#ffd900] to-black bg-clip-text text-transparent text-6xl p-2">
                Imagination
              </span>{" "}
              Into{" "}
              <span className=" bg-gradient-to-tr from-[#ffd900] to-black bg-clip-text text-transparent p-4">
                Reality
              </span>
            </h1>
            <p className="text-gray-600 text-lg sm:text-xl lg:text-xl mb-6 leading-relaxed">
              At Sovereign Style'sxz, we believe that fashion is more than just
              clothing—it's an expression of your inner royalty. Our master
              craftsmen work tirelessly to bring your vision to life, creating
              pieces that embody elegance, power, and sophistication.
            </p>
            <p className="text-gray-600 text-lg sm:text-xl lg:text-xl mb-8 leading-relaxed">
              From concept to creation, every garment undergoes meticulous
              attention to detail, ensuring that when you wear our designs,
              you're not just dressed—you're adorned in a legacy of excellence
              that speaks volumes without saying a word.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
              <button
                onClick={() => navigate("/collections")}
                className="px-8 sm:px-10 py-4 w-full cursor-pointer bg-black text-white rounded-xl hover:bg-gray-800 transition-all duration-300 text-lg font-semibold shadow-lg hover:shadow-xl transform  z-1000000000000 hover:-translate-y-1"
              >
                Explore Collection
              </button>
            </div>
          </div>
          <div className="right flex-1 secondmaintreesubtreeimg flex-col-reverse w-full max-w-md lg:max-w-2xl group relative">
            <img
              onClick={() =>
                navigate("/collections", { state: { category: "Kids" } })
              }
              ref={ImgKids}
              onMouseMove={handleforthemousemoveforthekiids}
              onMouseEnter={() => setvisiblekids(true)}
              onMouseLeave={() => setvisiblekids(false)}
              src="/heroimg3.jpg"
              className="w-full h-auto cursor-pointer max-h-[400px] sm:max-h-[500px] lg:max-h-[600px] object-cover rounded-2xl shadow-lg group-hover:shadow-2xl transition-all duration-500"
              alt="Master craftsmanship and attention to detail in fashion design"
            />
            <h3 className="text-xl sm:text-1xl font-semibold  backdrop-blur-md mb-2 infobuttomimg absolute bottom-10  left-[80%] border rounded-2xl p-1 bg-gradient-to-tr from-[#c3a707] to-black bg-clip-text text-transparent">
              New Genration
            </h3>
            <div className="mt-4 text-center">
              <p className="text-gray-500 text-sm italic">
                "Crafting timeless elegance since 2010 - Where tradition meets
                contemporary luxury"
              </p>
            </div>

            {visiblekids && (
              <div
                className="follow-circle-kids absolute  w-[100px] h-[100px] bg-black/70 text-white flex items-center justify-center rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2"
                ref={CircleKids}
              >
                   Shift to <br />
                Kids Class
              </div>
            )}
          </div>
        </div>
      </div>
      <div   onMouseEnter={handletohidethelogo} onMouseLeave={handletoshowthelogo}>
         <BrandFAQ/>
      </div>
    </div>
  );
};

export default MainHome;
