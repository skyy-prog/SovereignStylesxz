import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Shopcontext } from "../context/shopcontext";
import { CiHeart } from "react-icons/ci";
import { MdFavorite } from "react-icons/md";
import { AnimatePresence, motion } from "framer-motion";
const PoductItems = ({ id, image, name, price }) => {
  const [bestsellerproducts, setbestsellerproducts] = useState(false);
  const { currency, products } = useContext(Shopcontext);
  const [isfav, setisfav] = useState(true);
  const handletostoppropagation = (e) => {
    e.stopPropagation();
    e.preventDefault();
    const finalfav = products.filter((items) => items.id === id);
    setisfav(!isfav);
    
  };
  useEffect(() => {
    const finalbestsells = products.filter((item) => item.bestseller === true);
    setbestsellerproducts(finalbestsells);
  }, [products]);
  return (
    <>
    <AnimatePresence mode="wait">
  <motion.div
    
    layout
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.5, ease: "easeOut" }}
  >
       <div className="w-full">
  <Link
    to={`/product/${id}`}
    className="text-gray-400 cursor-pointer block"
  >
    <div className="overflow-hidden bg-white rounded-lg shadow-sm">
      <img
        src={image[0]}
        alt={name}
        className="w-full h-80 object-cover transition duration-300 ease-in-out hover:scale-110"
      />

      <div className="pt-4 pb-3 px-4 flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-gray-800">{name}</p>
          <p className="pt-1 text-sm font-bold text-black">
            {currency}{price}
          </p>
        </div>
      </div>
    </div>
  </Link>
</div>

        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default PoductItems;
