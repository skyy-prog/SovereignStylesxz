import React, { useState, useContext, useEffect } from "react";
import Title from "../components/Title";
import { Shopcontext } from "../context/shopcontext";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
const Placeorders = () => {
  const {
    getamountTotal,
    currency,
    delivery_fee,
    cartItems,
    products,
    token,
    setcartitems,
    BACKEND_URL
  } = useContext(Shopcontext);

  const navigate = useNavigate();

  const [method, setMethod] = useState("cod");

  const [formData, setformData] = useState({
    name: "",
    lastname: "",
    email: "",
    city: "",
    state: "",
    pincode: "",
    phone: "",
    address: ""
  });

 
  const onchangehandler = (event) => {
    const { name, value } = event.target;

    setformData((prev) => ({
      ...prev,
      [name]: value
    }));
  };
 const initpay = (order)=>{
  const options = {
    key:import.meta.env.VITE_RAZORPAYID,
    amount:order.amount,
    currency:order.currency,
    name:'Order Payment',
    description:'Order Payment',
    order_id: order.id,
    receipt:order.receipt,
    handler: async(response)=>{
     try {
        const {data} = await axios.post(BACKEND_URL + '/api/order/verifyrazorpay' , response, {headers:{token}})
      if(data.success){
        navigate('/orders')
        setcartitems({})
      }
     } catch (error) {
      console.log(error.message)
     }

    }
  };
  const rzp = window.Razorpay(options);
  rzp.open();
 }
  const omsubmithandler = async (e) => {
    e.preventDefault();

    try {
      let orderitems = [];

      for (const productId in cartItems) {
        for (const size in cartItems[productId]) {
          if (cartItems[productId][size] > 0) {
            const product = products.find(
              (item) => item._id === productId
            );

            if (product) {
              orderitems.push({
                ...product,
                size,
                quantity: cartItems[productId][size]
              });
            }
          }
        }
      }
    const CartObject = {
  address: formData,
  items: orderitems,
  amount: getamountTotal() + delivery_fee,
  paymentMethod: method
};

switch (method) {
  case "cod": {
    const response = await axios.post(
      BACKEND_URL + '/api/order/placeorder', CartObject, { headers: {token } } );
      if(response.data.success){
        toast.success('product added and placed')
        setcartitems({})
        navigate('/Orders')
      }else{
          toast.error('product could not  placed')
      }
      
    console.log(response.data);
    break;
  }
  case "stripe":{
    const response = await axios.post(BACKEND_URL + '/api/order/withstripe' , CartObject , {headers:{token}});
    if(response.data.success){
      const {sessionURL} = response.data;
      window.location.replace(sessionURL)
    }else{
      toast.error('error in payment with stripe')
    }
  }
  break;
  case "razorpay":{
    const response = await axios.post(BACKEND_URL+'/api/order/withrazorpay'  , CartObject , {headers:{token}});
    if(response.data.success){
      initpay(response.data.order)
    }
  }
break;
  default:
    toast.error("Invalid payment method");
}

    } catch (error) {
    toast.error(error.message);      
    }
  };
useEffect(()=>{
 
},[])
  return (
    <div className="w-full min-h-screen bg-gray-50 flex justify-center items-start p-2">
      <div className="w-full max-w-5xl bg-white shadow-xl rounded-2xl p-6 md:p-8 flex flex-col md:flex-row gap-10">
        
        {/* LEFT SIDE – FORM */}
        <form
          onSubmit={omsubmithandler}
          className="flex-1 space-y-4 flex flex-col justify-around"
        >
          <Title title1={"Partners Information"} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              className="input"
              type="text"
              name="name"
              value={formData.name}
              onChange={onchangehandler}
              placeholder="First Name"
              required
            />

            <input
              className="input"
              type="text"
              name="lastname"
              value={formData.lastname}
              onChange={onchangehandler}
              placeholder="Last Name"
              required
            />

            <input
              className="input md:col-span-2"
              type="email"
              name="email"
              value={formData.email}
              onChange={onchangehandler}
              placeholder="Email Address"
              required
            />

            <input
              className="input md:col-span-2"
              type="text"
              name="address"
              value={formData.address}
              onChange={onchangehandler}
              placeholder="Address"
              required
            />

            <input
              className="input"
              type="text"
              name="city"
              value={formData.city}
              onChange={onchangehandler}
              placeholder="City"
              required
            />

            <input
              className="input"
              type="text"
              name="state"
              value={formData.state}
              onChange={onchangehandler}
              placeholder="State"
              required
            />

            <input
              className="input"
              type="text"
              inputMode="numeric"
              maxLength={6}
              name="pincode"
              value={formData.pincode}
              onChange={onchangehandler}
              placeholder="Pincode"
              required
            />

            <input
              className="input"
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={onchangehandler}
              placeholder="Contact Number"
              required
            />
          </div>

          <button
            type="submit"
            className="text-white cursor-pointer hover:scale-105 transition-all p-6 rounded-2xl w-full bg-black universalfontquicksand flex items-center justify-between"
          >
            Finalize the Elite Order
            <FaArrowAltCircleRight size={30} color="white" />
          </button>
        </form>

        {/* RIGHT SIDE – PRICE SUMMARY */}
        <div className="w-full md:w-80 bg-gray-100 rounded-xl p-6 space-y-4">
          <Title title1={"Total Cash To Pay"} />

          <div className="space-y-3 text-sm font-medium">
            <div className="flex justify-between border-b pb-2">
              <p>Subtotal</p>
              <p>
                {currency}
                {getamountTotal()}
              </p>
            </div>

            <div className="flex justify-between border-b pb-2">
              <p>Shipping Fee</p>
              <p>
                {currency}
                {delivery_fee}
              </p>
            </div>

            <div className="flex justify-between text-base font-semibold">
              <p>Final Value</p>
              <p className="text-blue-700">
                {currency}
                {getamountTotal() + delivery_fee}
              </p>
            </div>
          </div>

          <Title title1={"Select Your Mode"} />

          <div className="flex flex-col gap-3">
            <button
              type="button"
              onClick={() =>{ setMethod("stripe") , console.log(method)}}
              className={`payment-btn cursor-pointer ${
                method === "stripe" ? "border-green-700 border-2" : ""
              }`}
            >
              <img src="./stripe.png" className="payment-img" />
            </button>

            <button
              type="button"
              onClick={() => setMethod("razorpay")}
              className={`payment-btn ${
                method === "razorpay" ? "border-green-700 border-2" : ""
              }`}
            >
              <img src="./Razorpay.png" className="payment-img" />
            </button>

            <button
              type="button"
              onClick={() => setMethod("cod")}
              className={`payment-btn ${
                method === "cod" ? "border-green-700 border-2" : ""
              }`}
            >
              Cash On Delivery
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Placeorders;
 