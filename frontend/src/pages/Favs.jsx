import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { Favcontext } from "../context/Favcontext";
import { AnimatePresence, motion } from "framer-motion";
import PoductItems from "../components/PoductItems";
import { useNavigate } from "react-router-dom";
import Title from "../components/Title";
import { FaRegSadTear, FaGem, FaCrown, FaLock } from "react-icons/fa";
const Favs = () => {
  const { favorites, setfavorites  , token} = useContext(Favcontext);
  const [finalfav, setfinalfavs] = useState([]);
  const [img, seimg] = useState("");
  const navigate = useNavigate();
  const value=favorites.length;
  useEffect(() => {
    setfinalfavs(favorites);
  }, [favorites]);
   
  return (
    <>
      <div className=" flex items-center justify-center ">
        <Title title1={`Your Wish List...${value}`} />
      </div>
      {favorites.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-6 universalfontquicksand">
          <AnimatePresence mode="wait">
            {favorites.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <PoductItems
                  id={item._id}
                  image={item.img}
                  name={item.name}
                  price={item.price}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <div
          className="w-full min-h-screen text-black flex flex-col justify-start items-center py-16 px-6 cursor-pointer group"
          onClick={() => navigate("/collections")}
        >
          <div className="relative mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 via-yellow-300 to-yellow-500 rounded-full blur-xl opacity-20 group-hover:opacity-30 transition-all duration-500"></div>
            <div className="relative crown-float">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center shadow-lg glow">
                <FaCrown className="text-white text-4xl" />
              </div>
              <div className="absolute -top-2 -right-2">
                <div className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center shadow-lg">
                  <FaLock className="text-white text-xs" />
                </div>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <div className="treasure-chest">
              <div className="chest-lid group-hover:rotate-x-45 transition-transform duration-700 ease-out"></div>
              <div className="chest-base"></div>

              <div className="jewel jewel-1 gem-sparkle"></div>
              <div
                className="jewel jewel-2 gem-sparkle"
                style={{ animationDelay: "0.5s" }}
              ></div>
              <div
                className="jewel jewel-3 gem-sparkle"
                style={{ animationDelay: "1s" }}
              ></div>
              <div
                className="jewel jewel-4 gem-sparkle"
                style={{ animationDelay: "1.5s" }}
              ></div>

              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-300">
                <div className="w-16 h-16 rounded-full bg-gray-800 flex items-center justify-center">
                  <FaRegSadTear className="text-gray-500 text-2xl" />
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mb-6 fade-in">
            <h1 className="text-3xl royal-font font-medium tracking-wider mb-4 flex items-center justify-center gap-3">
              <FaRegSadTear className="text-gray-400 text-2xl" />
              No Royal Treasures Found
              <FaGem className="text-yellow-400 text-2xl gem-sparkle" />
            </h1>
            <p className="text-gray-400 text-base font-light tracking-wider max-w-md">
              Your royal chest awaits precious gems. Explore our collections to
              fill it with majestic treasures.
            </p>
          </div>

          <div className="flex items-center gap-3 mt-6 px-8 py-4 border border-gray-700 rounded-full group-hover:border-yellow-400 group-hover:bg-yellow-400/10 transition-all duration-300 fade-in">
            <span className="text-base font-medium tracking-wider royal-font">
              Discover Royal Collections
            </span>
            <svg
              className="w-5 h-5 transform group-hover:translate-x-2 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>

          <div className="absolute bottom-10 left-10 opacity-20">
            <FaGem className="text-yellow-400 text-xl transform rotate-45" />
          </div>
          <div className="absolute top-10 right-10 opacity-20">
            <FaGem className="text-yellow-400 text-xl transform -rotate-12" />
          </div>
        </div>
      )}
    </>
  );
};

export default Favs;
