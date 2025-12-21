import React, { useState } from 'react';
import { FiUpload, FiPlus, FiStar, FiDollarSign } from 'react-icons/fi';
import axios from 'axios';
import { backend_url } from '../App';
import toast  from 'react-hot-toast';
import { Toaster } from 'react-hot-toast';
const CompactProductForm = ({token}) => {
  const [sizes, setSelectedSizes] = useState([]);
  const [images, setImages] = useState([null, null, null, null]);
  const [image1 , setimage1] = useState(false)
  const [image2 , setimage2] = useState(false)
  const [image3 , setimage3] = useState(false)
  const [image4 , setimage4] = useState(false)
  const [name , setname] = useState('')
  const [description , setdescription]= useState('')
  const [price , setprice]=useState('')
  const [category , setcategory]=useState('Mens')
  const [subcategory , setsubcategory]=useState('topwear')
  const [bestseller, setbestseller] = useState(false);
 

  const handleImageChange = (e, index) => {
  const file = e.target.files[0];
  if (!file) return;

  const updatedImages = [...images];
  updatedImages[index] = URL.createObjectURL(file);
  setImages(updatedImages);

};
const handletogeneratethdescription = async()=>{
  try {
   if(!name){
    toast.error('Enter the name first')
   }
     const response = await axios.post(backend_url + '/api/ai/generate' , {name});
    console.log(response.data.description)
    setdescription(response.data.description)
  } catch (error) {
    console.log(error.message)
  }
}
  const handletopostheproduct   = async(e)=>{
    e.preventDefault(); 
    
    try {
      const FormDatas = new FormData();
    FormDatas.append('name', name)
    FormDatas.append('description', description);
    FormDatas.append('price', price);
    FormDatas.append('category' , category)
    FormDatas.append('subcategory' , subcategory);
    FormDatas.append('bestseller' , bestseller);
    FormDatas.append('sizes', JSON.stringify(sizes))
    image1 &&  FormDatas.append('image1' , image1)
    image2 &&  FormDatas.append('image2' , image2);
    image3 &&  FormDatas.append('image3' , image3);
    image4 &&  FormDatas.append('image4' , image4);

  const response = await axios.post(
  backend_url + "/api/product/add",
  FormDatas,
  {
    headers: {
      token: token,
      "Content-Type": "multipart/form-data"
    }
  }
);

    
    const decision = response.data.sucess;
    if(decision){
     toast.success('Product is now published.');
     setImages('')
     setname('')
     setcategory('')
     setdescription('');
     setimage1('')
     setimage2('')
     setimage3('')
     setimage4('');
     setprice('')
     setSelectedSizes([])
    }else{
       toast.error('Anable to post the product.')
    }

    } catch (error) {
      console.log(error)
    }
    
  }

  return (
   <form onSubmit={handletopostheproduct} className=' w-full  bg-red-700 rounded-4xl shadow-2xl   p-5'>
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
    />      
     <div className="min-h-screen w-full bg-gray-50 py-6 px-4 rounded-4xl">
  <div className="max-w-3xl mx-auto">
    {/* Header */}
   <div className="text-center mb-8">
  <div className="w-full flex justify-between items-center border-b border-black mb-6">
    
    <img
      src="/logoo-removebg-preview.png"
      className="h-15 w-15"
      alt="Logo"
    />

    <h1 className="hidden md:inline text-3xl font-bold bg-gradient-to-tr from-[#ffd900] p-3 to-black bg-clip-text text-transparent tracking-tight">
      Sovereign Style&apos;sxz...
    </h1>

    <img
      src="/logoo-removebg-preview.png"
      className="h-15 w-15 scale-x-[-1]"
      alt="Logo"
    />

  </div>

  <h1 className="text-3xl font-bold text-gray-800">Upload Product</h1>
  <p className="text-gray-600 mt-1">Add a new product to your collection</p>
</div>


    <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-200">
      
      {/* IMAGE UPLOAD GRID */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Product Images
        </label>

        <div className="
          grid 
          grid-cols-1 
          sm:grid-cols-2 
          lg:grid-cols-4 
          gap-6
        "
        >
          {/* IMAGE CARD 1 */}
          <label className="relative flex items-center justify-center h-40 w-full border border-gray-300 rounded-xl shadow-sm hover:shadow-md transition cursor-pointer bg-gray-50 overflow-hidden">
            {images[0] && (
              <img
                src={URL.createObjectURL(image1)}
                className="absolute inset-0 w-full h-full object-cover"
                alt=""
              />
            )}

            <input
              type="file"
              accept="image/*"
              onChange={(e) => {handleImageChange(e, 0) , setimage1(e.target.files[0])}}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />

            {!images[0] && (
              <span className="text-gray-500 text-lg">Place Image 1</span>
            )}
          </label>

          {/* IMAGE CARD 2 */}
          <label className="relative flex items-center justify-center h-40 w-full border border-gray-300 rounded-xl shadow-sm hover:shadow-md transition cursor-pointer bg-gray-50 overflow-hidden">
            {images[1] && (
              <img
                src={URL.createObjectURL(image2)}
                className="absolute inset-0 w-full h-full object-cover"
                alt=""
              />
            )}

            <input
              type="file"
              accept="image/*"
              onChange={(e) => {handleImageChange(e, 1) , setimage2(e.target.files[0])}}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />

            {!images[1] && (
              <span className="text-gray-500 text-lg">Place Image 2</span>
            )}
          </label>

          {/* IMAGE CARD 3 */}
          <label className="relative flex items-center justify-center h-40 w-full border border-gray-300 rounded-xl shadow-sm hover:shadow-md transition cursor-pointer bg-gray-50 overflow-hidden">
            {images[2] && (
              <img
                src={URL.createObjectURL(image3)}
                className="absolute inset-0 w-full h-full object-cover"
                alt=""
              />
            )}

            <input
              type="file"
              accept="image/*"
              onChange={(e) =>{handleImageChange(e, 2) , setimage3(e.target.files[0])}}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />

            {!images[2] && (
              <span className="text-gray-500 text-lg">Place Image 3</span>
            )}
          </label>

          {/* IMAGE CARD 4 */}
          <label className="relative flex items-center justify-center h-40 w-full border border-gray-300 rounded-xl shadow-sm hover:shadow-md transition cursor-pointer bg-gray-50 overflow-hidden">
            {images[3] && (
              <img
                src={URL.createObjectURL(image4)}
                className="absolute inset-0 w-full h-full object-cover"
                alt=""
              />
            )}

            <input
              type="file"
              accept="image/*"
              onChange={(e) => {handleImageChange(e, 3) , setimage4(e.target.files[0])}}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />

            {!images[3] && (
              <span className="text-gray-500 text-lg">Place Image 4</span>
            )}
          </label>
        </div>
      </div>

      {/* INPUT FIELDS */}
      <div className="space-y-4">

        {/* Product Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Product Name
          </label>
          <input
            type="text"
            placeholder="Type product name..."
            value={name}
            onChange={(e)=>setname(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          
        </div>

        {/* Product Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Product Description
          </label>
          <textarea
            placeholder="Write product description..."
            rows="5"
            value={description}
            onChange={(e)=>setdescription(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 resize-none"
          />
           <button type='button' onClick={handletogeneratethdescription} className=' bg-black rounded-2xl p-3 universalQuicksand text-white w-full mt-2 cursor-pointer hover:scale-101 transition-all'>Generate with AI</button>
        </div>

        {/* Category / Subcategory / Price */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select 
            value={category}
            onChange={(e)=>setcategory(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white">
              <option>Mens</option>
              <option>Womens</option>
              <option>Kids</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Sub Category
            </label>
            <select
            value={subcategory}
            onChange={(e)=>setsubcategory(e.target.value)}
             className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white">
              <option>Topwear</option>
              <option>Bottomwear</option>
              <option>Winterwear</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Price
            </label>
            <div className="relative">
              <FiDollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="number"
                placeholder="25"
                value={price}
                onChange={(e)=>setprice( Number(e.target.value))}
                className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

        </div>

        {/* Sizes */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Sizes
          </label>
           <div className=' grid grid-rows-4 sm:grid-cols-4 md:grid-cols-3 lg:grid-cols-2 gap-2'>
            <div  onClick={()=>setSelectedSizes((prev)=>prev.includes("S") ? prev.filter((item)=>item !== 'S'): [...prev , 'S'])}  className={`p-3 border-2 flex items-center justify-center cursor-pointer rounded-2xl  ${sizes.includes('S')? 'bg-black text-white':' text-black bg-white'} `}>
            <p>S</p>
          </div>
           <div onClick={()=>setSelectedSizes((prev)=>prev.includes('M') ? prev.filter((item)=>item !== 'M'): [...prev , 'M'])}  className={`p-3 border-2 flex items-center justify-center cursor-pointer rounded-2xl  ${sizes.includes('M')? 'bg-black text-white':' text-black bg-white'} `}>
            <p>M</p>
          </div>
          <div onClick={()=>setSelectedSizes((prev)=>prev.includes('L') ? prev.filter((item)=>item !== 'L'): [...prev , 'L'])} className={`p-3 border-2 flex items-center justify-center cursor-pointer rounded-2xl  ${sizes.includes('L')? 'bg-black text-white':' text-black bg-white'} `}>
            <p>L</p>
          </div>
          <div onClick={()=>setSelectedSizes((prev)=>prev.includes('XL') ? prev.filter((item)=>item !== 'XL'): [...prev , 'XL'])} className={`p-3 border-2 flex items-center justify-center cursor-pointer rounded-2xl  ${sizes.includes('XL')? 'bg-black  text-white':'bg-white text-black'}`}>
            <p>XL</p>                                                                                                                                   
          </div>
           <div  onClick={()=>setSelectedSizes((prev)=>prev.includes('XXL') ? prev.filter((item)=>item !== 'XXL'): [...prev , 'XXL'])} className={`p-3 border-2 flex items-center justify-center cursor-pointer rounded-2xl  ${sizes.includes('XXL')?'bg-black text-white':'bg-white text-black'} `}>
            <p>XXL</p>
          </div>
           </div>
        </div>

        {/* Bestseller Toggle */}
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-2">
            <FiStar className="w-4 h-4 text-yellow-500" />
            <span className="text-sm font-medium">Add to bestseller</span>
          </div>

          <button
            onClick={() => setbestseller(!bestseller)}
            type='button'
            className={`w-10 cursor-pointer h-5 rounded-full transition ${
              bestseller ? "bg-black" : "bg-gray-300"
            }`}
          >
            <div
              className={`w-3 h-3 rounded-full bg-white transition-transform ${
                bestseller ? "translate-x-5" : "translate-x-1"
              }`}
            />
          </button>
        </div>

        {/* ADD PRODUCT BUTTON */}
        <button  className="w-full    bg-black  cursor-pointer text-white font-medium py-3 rounded-lg transition flex items-center justify-center gap-2">
          <FiPlus className="w-4 h-4" />
          ADD PRODUCT
        </button>

      </div>
    </div>
  </div>
</div>
   </form>

  );
};

export default CompactProductForm;



