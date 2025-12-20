import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { Shopcontext } from "../context/shopcontext";
import { BarLoader } from "react-spinners";
import ZoomImage from "react-zoom-image-hover";
import toast, { Toaster } from 'react-hot-toast';
import { CiHeart } from "react-icons/ci";
import Comments from "../components/Comments";
import { MdFavorite } from "react-icons/md";
import Title from "../components/Title";
import Relatedproducts from "../components/Relatedproducts";
import  {Favcontext}  from "../context/Favcontext";
 

// import toast ,{Toaster} from "react-hot-toast";
const Product = () => {
const { id } = useParams();
const [product, setProduct] = useState(null);
const [selectedImage, setSelectedImage] = useState("");
const { products, currency, adddtocart  , token} = useContext(Shopcontext);
const { favorites, setfavorites } = useContext(Favcontext);
const [size, setsize] = useState(null);
const [fav, setfav] = useState(false);

useEffect(() => {
  const finalfav = favorites.some(item => item._id === id);
  setfav(finalfav);
}, [favorites, id]);

const fetchProductData = () => {
  const viewedProduct = products.find(item => item._id === id);
  if (viewedProduct) {
    setProduct(viewedProduct);
    setSelectedImage(viewedProduct.img?.[0]);
  }
};

useEffect(() => {
  fetchProductData();
}, [id, products]);

const handletoremoveinfav = () => {
  toast.success("Item removed from favorites");
  setfavorites(prev => prev.filter(item => item._id !== id));
};

const handletoaddinfav = () => {
  if(token){
    if (!fav) {
      toast.success("Item added to favorites");
      setfavorites(prev => [...prev, product]);
    } else {
      handletoremoveinfav();
    }
    setfav(!fav);
  }else{
    toast.error('Login or Register first')
  }
};

const handletoaddtocart = () => {
  if(token){
    if (!size) return toast.error("Select size first");
    adddtocart(product._id, size);
  }else{
    toast.error('Login/register First')
  }
};

if (!product) return (
  <div className="min-h-screen flex items-center justify-center">
    <BarLoader width="80vw" />
  </div>
);

  return (
    <div className="h-35vh  w-full   ">
<Toaster
  position="top-center"
  reverseOrder={false}
  gutter={10}
  containerClassName=""
  containerStyle={{}}
  toasterId="default"
  toastOptions={{
    // Define default options
    className: '',
    duration: 3000,
    removeDelay: 1000,
    style: {
      background: '#363636',
      color: '#fff',
    },

    // Default options for specific types
    success: {
      duration: 3000,
      iconTheme: {
        primary: 'green',
        secondary: 'black',
      },
    },
  }}
/>      <div className="max-w-7xl  w-full  mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white    overflow-hidden border-b border-b-gray-200">
          <div className="grid grid-cols-1  w-full  lg:grid-cols-2  p-8">
            <div className="    flex  items-center justify-items-start flex-col">
              <div className=" rounded-2xl aspect-square flex items-start justify-center ">
                <ZoomImage
                  src={selectedImage}
                  zoomScale={3}
                  transitionTime={0.4}
                  width={400}
                  height={400}
                  className=" object-contain rounded-2xl"
                />
              </div>

             
              <div className="flex justify-around productstoshow  w-full p-5  overflow-x-auto   ">
                {product.img?.map((image, index) => (
                  <div
                    key={index}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg border-2  cursor-pointer transition-all ${
                      selectedImage === image
                        ? "border-blue-500 shadow-md"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => setSelectedImage(image)}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover rounded-md"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
             <div className=" flex justify-between items-start">
                <h1 className=" productnames font-bold text-gray-900 mr-10  text-2xl ">
                {product.name}
              </h1>
               {!fav ? (
  <button className="cursor-pointer" onClick={handletoaddinfav}>
    <CiHeart color="red" size={30} />
  </button>
) : (
  <button className="cursor-pointer" onClick={handletoremoveinfav}>
    <MdFavorite color="red" size={35} />
  </button>
)}

             </div>

              <div className="flex items-center gap-3">
                <span className="text-3xl font-bold text-gray-900">
                  {currency}
                  {product.price}
                </span>
                {product.originalPrice && (
                  <span className="text-xl text-gray-500 line-through">
                    {currency}
                    {product.price}
                  </span>
                )}
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-gray-900">About</h3>
                <p className="text-gray-600 leading-relaxed">
                  {product.description}
                </p>
              </div>

              <h1>preferences</h1>
              <div className="flex flex-wrap   gap-3 mt-5">
                {product?.sizes?.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => { setsize(item)  }}
                    className={`px-5 py-2 border border-gray-400 cursor-pointer text-gray-700 font-medium 
      hover:bg-black hover:text-white transition-all duration-200 active:scale-95 
      ${item === size ? "bg-black text-white" : ""}`}
                  >
                    {item}
                  </button>
                ))}
              </div>

              <div className="flex gap-4 pt-6">
                <button onClick={handletoaddtocart} className="flex-1  cursor-pointer bg-black text-white py-3 px-6 rounded-lg font-semibold transition-colors">
                  Add to Cart
                </button>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Product Features
                </h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                    Premium quality materials
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                    Designed for durability
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                    Easy to maintain and clean
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
       
      <Comments product = {product} /> 
      <Title title1 = 'Related Products'/>
      <Relatedproducts Relatedproduct = {product} />
    </div>
  );
};

export default Product;
