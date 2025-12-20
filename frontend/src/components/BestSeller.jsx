import React, { useEffect, useState } from "react";
import { Shopcontext } from "../context/shopcontext";
import Title from "./Title";
import { useContext } from "react";
import PoductItems from "./PoductItems";
const BestSeller = () => {
    const [bestseller , setbestseller] = useState([])
  const { products} = useContext(Shopcontext);
useEffect(()=>{
const fileteredproducts = products.filter((item)=>item.bestseller === true)
setbestseller(fileteredproducts.slice(0.5))
  },[products])
  return <>
  <div className=" my-3">
    <div className=" text-center text-3xl ">
        <Title title1={'Sovereign Top  Choices'}/>
    </div>
    <div className=" grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-6 universalfontquicksand ">
         {bestseller.map((item , index)=>{
           return <PoductItems  key={index} id={item._id}   image={item.img} name = {item.name} price = {item.price}  />
         })}
    </div>
  </div>
  </>;
};

export default BestSeller;
