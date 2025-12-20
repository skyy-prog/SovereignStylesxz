import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { Shopcontext } from "../context/shopcontext";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
const Searchbar = () => {
// import { useLocation } from "react-router-dom";

const { search, setsearch, showsearch, setshowsearch } = useContext(Shopcontext);
const [visible, setvisible] = useState(false);
const location = useLocation();

useEffect(() => {
  setvisible(location.pathname.includes("collections") && showsearch);

}, [location.pathname, showsearch]);


 return (
  <AnimatePresence>
    {(showsearch && visible) && (
      <motion.div
       key="searchbar" //
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -30 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="bg-gradient-to-r from-white to-gray-50/30 backdrop-blur-md p-6 shadow-md"
      >
        <div className="max-w-2xl mx-auto">
          <div className="relative group">
            <input
              type="text"
              placeholder="Discover the Sovereign Collection..."
              value={search}
              onChange={(e) => setsearch(e.target.value)}
              className="w-full pl-12 pr-6 py-4 rounded-2xl border-2 border-gray-200/80 bg-white/90 backdrop-blur-sm focus:outline-none focus:bg-white focus:shadow-2xl focus:shadow-blue-100/50 text-gray-900 placeholder-gray-400 text-lg font-light transition-all duration-300 shadow-sm hover:shadow-md hover:border-gray-300/60"
            />

         
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 transition-colors duration-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.2-5.2m0 0a7.5 7.5 0 11-10.6-10.6 7.5 7.5 0 0110.6 10.6z"
                />
              </svg>
            </div>

          
            {search && (
              <button
                onClick={() => setsearch("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200 p-1 rounded-full hover:bg-gray-100"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.3 }}
            className="flex flex-wrap gap-2 mt-3 justify-center"
          >
            {["Pants", "Shirt", "Boys" , "Girls", "Men"].map((tag) => (
              <button
                key={tag}
                onClick={() => setsearch(tag)}
                className="px-3 cursor-pointer py-1.5 text-sm text-gray-600 bg-white/50 border border-gray-200 rounded-full hover:bg-white hover:border-gray-300 hover:text-gray-800 transition-all duration-200 backdrop-blur-sm"
              >
                {tag}
              </button>
            ))}
          </motion.div>
        </div>
      </motion.div>
    )}
  </AnimatePresence>
);
};

export default Searchbar;
