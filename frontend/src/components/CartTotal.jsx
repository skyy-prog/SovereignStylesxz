import React from "react";
import Title from "./Title";
import { useContext } from "react";
import { Shopcontext } from "../context/shopcontext";
import { useNavigate } from "react-router-dom";

const CartTotal = () => {
  const { currency, delivery_fee, getamountTotal } = useContext(Shopcontext);
  const navigate = useNavigate()
  return (
    <>
        <Title  title1={'Check Your Expense...'} />
 <div className="w-full bg-white rounded-3xl shadow-lg p-6 border border-gray-100">
  {/* Header */}
  <div className="flex items-center justify-between mb-6">
    <div className="flex items-center space-x-3">
      <div className="w-10 h-10 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl flex items-center justify-center">
        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      </div>
      <div>
        <h2 className="text-xl font-bold text-gray-900">Order Summary</h2>
        {/* <p className="text-sm text-gray-500">{cartItems.length} items in cart</p> */}
      </div>
    </div>
  </div>

  {/* Price Breakdown */}
  <div className="space-y-4 mb-6">
    {/* Subtotal */}
    <div className="flex justify-between items-center py-2">
      <span className="text-gray-600">Subtotal</span>
      <span className="font-medium text-gray-900">{currency}{getamountTotal()}.00</span>
    </div>

    {/* Shipping */}
    <div className="flex justify-between items-center py-2">
      <span className="text-gray-600">Shipping</span>
      <span className="font-medium text-gray-900">{currency}{delivery_fee}.00</span>
    </div>

    {/* Divider */}
    <div className="relative py-2">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-dashed border-gray-300"></div>
      </div>
    </div>

    {/* Total */}
    <div className="flex justify-between items-center py-3 bg-gradient-to-r from-gray-50 to-white rounded-xl px-4 -mx-2">
      <span className="text-lg font-bold text-gray-900">Total</span>
      <span className="text-xl font-bold text-blue-600">
        {currency}
        {getamountTotal() === 0 ? 0 : getamountTotal() + delivery_fee}.00
      </span>
    </div>
  </div>

  {/* Checkout Button */}
  <button 
  onClick={()=> navigate('/place-orders')}
    className={`
      w-full py-4 rounded-2xl font-semibold text-white transition-all duration-300
      flex items-center justify-center space-x-3 shadow-lg cursor-pointer
      ${getamountTotal() === 0 
        ? 'bg-gray-300 cursor-not-allowed' 
        : 'bg-gradient-to-r from-gray-900 to-black hover:from-gray-800 hover:to-gray-900 hover:shadow-xl transform hover:-translate-y-1 active:translate-y-0'
      }
    `}
    disabled={getamountTotal() === 0}
  >
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
    <span>{getamountTotal() === 0 ? 'Cart is Empty' : 'Proceed to Checkout'}</span>
  </button>

  {/* Security Note */}
  <div className="mt-4 text-center">
    <p className="text-xs text-gray-500 flex items-center justify-center space-x-2">
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
      </svg>
      <span>Secure checkout · Encrypted payment</span>
    </p>
  </div>
</div>

    </>
  );
};

export default CartTotal;
