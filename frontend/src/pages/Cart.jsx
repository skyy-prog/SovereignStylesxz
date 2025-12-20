import React, { useContext, useEffect, useState } from "react";
import Title from "../components/Title";
import { FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Shopcontext } from "../context/shopcontext";
import CartTotal from "../components/CartTotal";
import { FaCrown, FaGem, FaRegSadTear } from 'react-icons/fa';

function Cart() {
  const {
    products,
    cartItems,
    currency,
    updatethecartitemssection,
    getamountTotal,
  } = useContext(Shopcontext);
  const [carttoshow, setcarttoshow] = useState([]);

  useEffect(() => {
    let tempData = [];
    for (const productId in cartItems) {
      for (const item in cartItems[productId]) {
        if (cartItems[productId][item] > 0) {
          tempData.push({
            _id: productId,
            size: item,
            total: cartItems[productId][item],
          });
        }
      }
    }
     setcarttoshow(tempData);
  }, [cartItems , products]);

  const navigate  = useNavigate();

  return (
    <>
 
    {getamountTotal()> 0 ?  <div className="p-4 md:p-6">
        <div className="flex -center items-start mb-6">
          <Title title1={"Your Majustifyjesty's Selection"} />
        </div>

        <div className="flex flex-col space-y-3">
          {carttoshow.map((item, index) => {
            const prodcutData = products.find(
              (item2) => item2._id === item._id
            );

            return (
              <div
                key={index}
                className="w-full p-4 flex flex-col sm:flex-row gap-4 border-b-2  shadow-sm "
              >
                <div className="flex justify-center sm:justify-start">
                  <img
                    src={prodcutData.img[0]}
                    alt={prodcutData.name}
                    className="h-32 w-24 sm:h-24 sm:w-20 object-cover rounded-lg"
                  />
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div
                    className="
  flex flex-col 
  sm:flex-row 
  sm:items-center 
  sm:gap-10 
  text-gray-700
  w-full
"
                  >
                    <div
                      className="
    universalfontquicksand 
    text-xl 
    sm:text-2xl 
    font-semibold 
    text-gray-900 
    text-center 
    sm:text-left 
    w-full sm:w-auto
  "
                    >
                      {prodcutData.name}
                    </div>

                    <div
                      className="
    flex flex-row 
    gap-6 
    justify-center 
    sm:justify-evenly 
    sm:flex-1
    text-base sm:text-lg
  "
                    >
                      <div>
                        Size: <span className="font-medium">{item.size}</span>
                      </div>

                      <div>
                        Qty:{" "}
                        <input
                          type="number"
                          onChange={(e) =>
                            e.target.value === "" || e.target.value === "0"
                              ? null
                              : updatethecartitemssection(
                                  item._id,
                                  item.size,
                                  Number(e.target.value)
                                )
                          }
                          defaultValue={item.total}
                          className=" border-2 max-w-10 sm:max-w-20    p-2 "
                          min={1}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-around sm:justify-between p-10 gap-6 mt-3 w-full">
                    <div className="text-lg sm:text-xl font-bold text-gray-900">
                      {currency}
                      {prodcutData.price}
                    </div>

                    <button
                      className="text-red-600 hover:text-red-800 cursor-pointer"
                      onClick={() =>
                      updatethecartitemssection(item._id, item.size, 0)
                      }
                    >
                      delete
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {getamountTotal() > 0 && <CartTotal />}
      </div>:
      <>
      
<div className="w-full  text-black flex flex-col justify-center items-center py-16 px-6 cursor-pointer group"
     onClick={() => navigate('/collections')}>
  
  <div className="relative mb-6">
    <div className="absolute inset-0 bg-gradient-to-r from-yellow-600 to-yellow rounded-full blur-md opacity-30 group-hover:opacity-50 transition-opacity"></div>
<img src={'./public/logoo-removebg-preview.png'} alt="" />
  </div>
 
  <div className="text-center mb-4">
    <h1 className="text-2xl font-light tracking-wide mb-2 flex items-center justify-center gap-2">
      <FaRegSadTear className="text-gray-400" />
      Your Royal Cart Awaits
      <FaGem className="text-yellow-400" />
    </h1>
    <p className="text-gray-400 text-sm font-light tracking-wider">
      No treasures found in your collection
    </p>
  </div>
 
  <div className="flex items-center gap-2 mt-4 px-6 py-3 border border-gray-700 rounded-full group-hover:border-yellow-400 transition-colors duration-300">
    <span className="text-sm font-medium tracking-wide">Explore Royal Collections</span>
    <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  </div>
</div>
</>
      }
      
    </>
  );
}

export default Cart;
