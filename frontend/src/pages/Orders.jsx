import React, { useEffect, useState } from 'react'
import Title from '../components/Title'
import { useContext } from 'react'
import { Shopcontext } from '../context/shopcontext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const Orders = () => {
  const {products , currency , BACKEND_URL , token}  = useContext(Shopcontext);
  const [allorders , setallorders] = useState([])
  const navigate  = useNavigate()
  const getallorders = async()=>{
    try {
   const response = await axios.post( `${BACKEND_URL}/api/order/useroders`,{}, {headers: {token } });
   if(response.data.success){
    // console.log(response.data.orders);
   
    setallorders(response.data);
    let finallallorder = [];
    response.data.orders.map((orders)=>{
      console.log(orders)
      orders.items.map((items)=>{
        items['status'] = orders.status;
        items['payment']= orders.payment;
        items['paymentMethod'] = orders.paymentMethod;
        items['date'] = orders.date;
        finallallorder.push(items);
        console.log(items);
      })
    })
    console.log(finallallorder)
    setallorders(finallallorder.reverse());
     }else{
    console.log(response.data)
   }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    getallorders();
    // console.log(token);
    console.log(allorders)
  } ,[token])
  return (
     <>
<div className="w-full  pt-5 flex flex-col">
  <div className="w-full flex items-center justify-center">
    <Title title1={"My Orders"} />
  </div>

  <div className="flex w-full flex-col p-5 gap-4">

    {allorders.map((items, index) => (
      <div
        key={index}
        className="flex flex-col md:flex-row   items-center md:items-start justify-between p-4 w-full border-b-2   border-gray-300 gap-4 universalfontquicksand"
      >
        
        <div className="w-full md:w-32">
          <img
            src={items.img[0]}
            alt="img"
            className="w-full h-32 object-cover rounded-lg"
          />
        </div>

       
        <div className="flex flex-col w-full md:w-2/3 gap-2">
          <p className="font-bold">{items.name}</p>

          <div className="flex justify-between text-sm text-gray-700">
            <p>{currency}{items.price}</p>
            <p>Qty: <span className="text-gray-700 font-bold"> {items.quantity}</span></p>
            <p>Size: {items.size}</p>
          </div>

          <p>
            Date:{" "}
            <span className="text-gray-700 universalfontquicksand">
              {new Date(items.date).toLocaleString()}
            </span>
          </p>

          <p>
            Payment:{" "}
            <span className="text-gray-700 font-bold">{items.paymentMethod}</span>
          </p>
        </div>
 
        <div className="flex flex-col items-center  mt-8 justify-center gap-3">
          <p className="text-gray-700 universalfontquicksand text-sm md:text-base">
             {items.status}
          </p>

          {/* <button className="border-2 px-4 py-2 rounded-md hover:bg-gray-100 transition cursor-pointer text-sm">
            Track Order
          </button> */}
        </div>
      </div>
    ))}
  </div>
</div>


     </>
  )
}

export default Orders