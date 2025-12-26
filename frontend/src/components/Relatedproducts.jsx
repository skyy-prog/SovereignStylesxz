import React, { useEffect, useState } from "react";
import { useContext } from "react";
import PoductItems from "./PoductItems";
import { Shopcontext } from "../context/shopcontext";
const Relatedproducts = ({ Relatedproduct }) => {
  const { products } = useContext(Shopcontext);
  const [Relatedpr, setRelatedpr] = useState([]);
 

  useEffect(() => {
    const slicedproducts = products 
     if (products.length > 0 && Relatedproduct) {
      const finalrelatedproduct = slicedproducts.filter(
        (item) => item.category === Relatedproduct.category && item._id !== Relatedproduct._id && item.subcategory === Relatedproduct.subcategory
      );
      setRelatedpr(finalrelatedproduct);
    }
     
  }, [products, Relatedproduct]);

  return (
    <>
   <div className="flex flex-wrap justify-around items-start p-7 universalfontquicksand ">
  {Relatedpr.map((item, index) => (
    <PoductItems
      key={index}
      id={item._id}
      image={item.img}
      name={item.name}
      price={item.price}
    />
  ))}
</div>

     </>
  );
};

export default Relatedproducts;
