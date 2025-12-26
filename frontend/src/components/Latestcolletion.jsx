import React, { useEffect, useState, useContext } from "react";
import { Shopcontext } from "../context/shopcontext";
import PoductItems from "./PoductItems";
import Title from "./Title";
import BestSeller from "./BestSeller";
import Services from "./Services";
import Subscribe from "./Subscription";
import { motion, AnimatePresence } from "framer-motion";

const Latestcolletion = ({ productsfiltered }) => {
  const { products } = useContext(Shopcontext);
  const [latestproducts, setlatestproducts] = useState([]);

  useEffect(() => {
    setlatestproducts(productsfiltered);
  }, [productsfiltered]);

  return (
    <>
      <div className="my-2">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-6 universalfontquicksand">
          <AnimatePresence mode="wait">
            {latestproducts.map((item) => (
              <motion.div
                key={item._id}
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

        {/* Keep the rest unchanged */}
        <BestSeller />
        <Services />
        <Subscribe />
      </div>
    </>
  );
};

export default Latestcolletion;

 

    //  <AnimatePresence mode="wait">
            
    //           <motion.div
                
    //             layout
    //             initial={{ opacity: 0, y: 30 }}
    //             animate={{ opacity: 1, y: 0 }}
    //             exit={{ opacity: 0, y: -20 }}
    //             transition={{ duration: 0.5, ease: "easeOut" }}
    //           >
               
    //           </motion.div>
      
    //       </AnimatePresence>