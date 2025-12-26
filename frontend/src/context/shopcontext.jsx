import { createContext, useEffect, useState } from "react";
// import { products } from "../assets/assets/";
import toast from "react-hot-toast";
import React from "react";
import { Toaster } from "react-hot-toast";
import axios from "axios";
 

// import { useParams } from "react-router-dom";
export const Shopcontext = createContext();

const Shopcontextprovider = (props) => {
  const currency = "$";
  const delivery_fee = 100;
  const [search, setsearch] = useState();
  const [showsearch, setshowsearch] = useState(false);
  const [cartItems, setcartitems] = useState({});
  const [copysize, setcopysize] = useState(null);
  const [productId, setproductId] = useState(null);
  const [products, setproducts] = useState([]);
  const [commentname, setcommentname] = useState(localStorage.getItem("name"));
  const [token, setokens] = useState("");
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const adddtocart = async (ItemId, Size) => {
    const cartData = structuredClone(cartItems);
    if (!Size) {
      return;
    }
    const Sizecopyfirst = structuredClone(Size);
    setcopysize(Sizecopyfirst);
    if (cartData[ItemId]) {
      if (cartData[ItemId][Size]) {
        cartData[ItemId][Size] += 1;
      } else {
        cartData[ItemId][Size] = 1;
      }
    } else {
      cartData[ItemId] = {};
      cartData[ItemId][Size] = 1;
    }
    setcartitems(cartData);
    setproductId(ItemId);
    if(token){
   await axios.post(
  BACKEND_URL + '/api/cart/add',
  { ItemId, Size },
  { headers: { token } }
);


    }else{
      toast.error('errorrrr')
    }
  };

  const getcount = () => {
    let totalCount = 0;
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalCount += cartItems[items][item];
          }
        } catch (error) {
          return;
        }
      }
    }
    return totalCount;
  };
  const getCartData = async(token)=>{
    try {
    const response =    await axios.post(BACKEND_URL + '/api/cart/get',  {} , {headers:{token}})
      if(response.data.success){
        setcartitems(response.data.cartData);
      }
      
    } catch (error) {
      return;
    }
  }
  const updatethecartitemssection = async (Itemid, size, quantity) => {
    const copycartItems = structuredClone(cartItems);
    copycartItems[Itemid][size] = quantity;
    setcartitems(copycartItems);
    try {
      await axios.post(BACKEND_URL + '/api/cart/update', {Itemid , size , quantity }, {headers:{token}} )
    } catch (error) {
      return;
    }
  };

  const getamountTotal = () => {
    let Totalprice = 0;

    for (const productId in cartItems) {
      const ItemInfo = products.find((item) => item._id === productId);

      if (!ItemInfo) continue;

      for (const size in cartItems[productId]) {
        const quantity = cartItems[productId][size];

        if (quantity > 0) {
          Totalprice += ItemInfo.price * quantity;
        }
      }
    }

    return Totalprice;
  };

  useEffect(() => {}, [cartItems]);
  useEffect(() => {
    if (!token && localStorage.getItem("token")) {
      setokens(localStorage.getItem("token"));
      getCartData(localStorage.getItem("token"))
    }
  }, []);

  const getproducts = async () => {
    try {
      const response = await axios.get(BACKEND_URL + "/api/product/list");

      const fetchedProducts = response.data.Products;
      if (Array.isArray(fetchedProducts)) {
        setproducts(fetchedProducts);
      } else {
        setproducts([]);
      }
    } catch (error) {
      console.log(error);
      
    }
  };

  useEffect(() => {
    getproducts();
  }, []);

  const value = {
    currency,
    delivery_fee,
    search,
    setsearch,
    showsearch,
    setshowsearch,
    cartItems,
    adddtocart,
    getcount,
    setcartitems,
    copysize,
    setcopysize,
    productId,
    updatethecartitemssection,
    getamountTotal,
    BACKEND_URL,
    products,
    token,
    setokens,
    commentname,
    setcommentname,
  };

  return (
    <Shopcontext.Provider value={value}>{props.children}</Shopcontext.Provider>
  );
};

export default Shopcontextprovider;
