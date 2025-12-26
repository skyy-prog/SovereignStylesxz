import React, { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import { backend_url } from '../App'
import { RxCross2 } from "react-icons/rx";
import toast from 'react-hot-toast';

const List = (token) => {
  const [List , setList] = useState([])
const handlertoListtheproduct = async () => {
  try {
    const response = await axios.get(backend_url + '/api/product/list');
    setList(response.data.Products);
  } catch (error) {
    toast.error(error.message);
  }
};
const handletodeletetheproduct = async(id , name )=>{
  const decision = confirm(`Are u sure u want to delete this product ${name} `);
  if(decision){
  const response = await axios.post(backend_url + '/api/product/remove' , {id} , {headers:token});
  if(response.data.success){
    toast.success(response.data.message)
    await handlertoListtheproduct();
  }else{
     toast.error(response.data.message)
  }
  }else{
    return;
  }
 
}

useEffect(() => {
  handlertoListtheproduct();
}, []);
  return (
    <>
    {List.map((items, index) => {
  return (
 <div key={index} className="w-full p-3">
  <div className="border border-gray-200  cursor-pointer rounded-2xl w-full p-4 bg-white shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">

 
    <div className="flex items-center justify-between w-full gap-4">
 
      <img
        src={items.img[0]}
        alt={items.name}
        className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-lg flex-shrink-0"
      />
 
      <div className="flex flex-col w-[35%]">
        <h3 className="font-semibold text-gray-900 text-base md:text-lg">
          {items.name}
        </h3>
        <p className="text-xs md:text-sm text-white bg-gray-500 px-3 py-1 rounded-xl w-max mt-1">
          {items.category}
        </p>
      </div>
      <span className=" text-gray-900 text-base md:text-xl w-[15%] text-center">
        {items.subcategory}
      </span>
     
      <span className=" text-gray-900 text-base md:text-xl w-[15%] text-center">
        ₹{items.price}
      </span>

      
      <button onClick={()=>handletodeletetheproduct(items._id , items.name )} className="text-red-500 cursor-pointer hover:text-red-700 p-3 rounded-full hover:bg-red-100 transition-all">
        <RxCross2 className="w-6 h-6" />
      </button>
    </div>

  </div>
</div>

  );
})}

   
    </>
  )
}

export default List