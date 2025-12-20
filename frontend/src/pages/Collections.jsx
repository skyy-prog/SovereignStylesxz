import React, { useEffect, useState } from "react";
import Title from "../components/Title";
import Latestcolletion from "../components/Latestcolletion";
import { Shopcontext } from "../context/shopcontext";
import { useContext } from "react";
import { useLocation } from "react-router-dom";
const Collections = () => {
  const [show, setshow] = useState(true);
  const [filterproducts, setfilterproducts] = useState([]);
  const [category, setcategory] = useState([]);
  const [subcategory, setsubcategory] = useState([]);
  const { products ,search , showsearch } = useContext(Shopcontext);
  const [Sortedtype, setSortedtype] = useState("Relevante");
  const [menscontity, setmenscontity] = useState([])
  const [womenscontity , setwomenscontity] = useState([])
  const [kidscontity , setkidscontity] = useState([])

  const location = useLocation();
  const togglefilter = (e) => {
    if (category.includes(e.target.value)) {
      setcategory((prev) => prev.filter((item) => item !== e.target.value));
      // setcategory((prev)=> prev.filter((item)=> item !== e.target.value))
    } else {
      setcategory((prev) => [...prev, e.target.value]);
    }
  };
 
  useEffect(()=>{
      const mensavaiblity =  async()=>{
  const contity  = products.filter((item)=> item.category === 'Mens')
  setmenscontity(contity)
 
  }
   mensavaiblity();
   
  },[ products])
useEffect(() => {
  const womensavailbility = () => {
    const contitywomens = products.filter((item) => item.category === 'Womens');
    setwomenscontity(contitywomens);
   
  };
  womensavailbility();
}, [products]);

useEffect(()=>{
  const kidscount = products.filter((item)=> item.category === 'Kids')
  setkidscontity(kidscount)
   
},[products]);
  const togglesubcategory = (e) => {
    if (subcategory.includes(e.target.value)) {
      setsubcategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setsubcategory((prev) => [...prev, e.target.value]);
    }
  };
  const applyfilter = () => {

    let productscopy = products.slice();
    if(search && showsearch){
      productscopy = productscopy.filter((item)=>item.name.toLowerCase().includes(search.toLowerCase()))
    }
    
    if (category.length > 0) {
      productscopy = productscopy.filter((item) =>
        category.includes(item.category)
      );
    }

    if (subcategory.length > 0) {
      productscopy = productscopy.filter((item) =>
        subcategory.includes(item.subcategory.toLowerCase())
      );
    }
    

    setfilterproducts(productscopy); //////////////
   
  };

const Sortedproducts = () => {
    const fpcopy = [...filterproducts];

    if (Sortedtype === "Low-to-High") {
      setfilterproducts([...fpcopy.sort((a, b) => a.price - b.price)]);
    } else if (Sortedtype === "High-to-Low") {
      setfilterproducts([...fpcopy.sort((a, b) => b.price - a.price)]);
    } else {
      applyfilter();
    }
  };

  useEffect(() => {
    setfilterproducts(products);
  }, [products]);

   useEffect(() => {
    applyfilter();
    Sortedproducts();
  }, [category, subcategory, Sortedtype , search , showsearch]);  

  useEffect(()=>{
    if(location.state?.category){
      setcategory([location.state.category])
    }
  },[location.state])


  return (
    <>
      <div className="text-center text-3xl">
        <Title title1={"Sovereign Series"} />
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4  backdrop-blur-2xl px-2   ">
        <p
          onClick={() => setshow(!show)}
          className="cursor-pointer universalfontquicksand 
             text-center text-sm font-semibold
             px-4 py-2 rounded-xl  
             border border-gray-300 
             bg-gradient-to-r from-gray-50 to-gray-100
             hover:from-gray-100 hover:to-white 
             hover:shadow-md hover:scale-105 
             transition-all duration-200 ease-in-out
             text-gray-700 select-none"
        >
          Filters
        </p>

        {show && (
          <div className="flex flex-col sm:flex-row flex-wrap items-center justify-around gap-4 w-full">
            <div className="flex flex-col sm:flex-row items-center justify-around  sm:items-center gap-3 p-3   bg-white/10 w-full sm:w-auto border-r">
              <p className="text-lg font-semibold">Categories</p>
              <div className="flex gap-3 flex-wrap">
                <label className="flex gap-2 items-center">
                  <input
                    type="checkbox"
                    checked={category.includes('Mens')}
                    className="cursor-pointer"
                    value="Mens"
                    onChange={togglefilter}
                  />{" "}
                  Mens  <h5>({menscontity.length})</h5>
                </label>
                <label className="flex gap-2 items-center">
                  <input
                    type="checkbox"
                    className="cursor-pointer"
                    value="Womens"
                    checked={category.includes('Womens')}
                    onChange={togglefilter}
                  />{" "}
                  Womens <h5>({womenscontity.length})</h5>
                </label>
                <label className="flex gap-2 items-center">
                  <input
                    type="checkbox"
                    className="cursor-pointer"
                    value="Kids"
                    checked={category.includes('Kids')}
                    onChange={togglefilter}
                  />{" "}
                  Kids <h5>({kidscontity.length})</h5>
                </label>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-around  sm:items-center gap-3 p-3   bg-white/10 w-full sm:w-auto border-r">
              <p className="text-lg font-semibold">Types</p>
              <div className="flex gap-3 flex-wrap">
                <label className="flex gap-2 items-center">
                  <input
                    type="checkbox"
                    className="cursor-pointer"
                    value="topwear"
                    onChange={togglesubcategory}
                  />{" "}
                  Topwear
                </label>
                <label className="flex gap-2 items-center">
                  <input
                    type="checkbox"
                    className="cursor-pointer"
                    value="bottomwear"
                    onChange={togglesubcategory}
                  />{" "}
                  Bottomwear
                </label>
                <label className="flex gap-2 items-center">
                  <input
                    type="checkbox"
                    className="cursor-pointer"
                    value="winterwear"
                    onChange={togglesubcategory}
                  />{" "}
                  Winterwear
                </label>
              </div>
            </div>

            <div className=" flex items-center bg-red-800">
              <select
                className="bg-white   outline-none px-4 py-2 text-gray-800 font-medium focus:outline-none focus:ring-2 focus:ring-blue-400  w-full sm:w-auto"
                onChange={(e) => setSortedtype(e.target.value)}
              >
                <option value="Relevante" className=" cursor-pointer">Sort by: Relevante</option>
                <option value="Low-to-High" className=" cursor-pointer">Sort by: Low to High</option>
                <option value="High-to-Low" className=" cursor-pointer">Sort by: High to Low</option>
              </select>
            </div>
          </div>
        )}
      </div>

      <Latestcolletion productsfiltered={filterproducts} />
    </>
  );
};

export default Collections;
