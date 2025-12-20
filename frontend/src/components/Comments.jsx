import { AnimatePresence, motion } from "framer-motion";
import { MessageSquare, Sparkles } from "lucide-react";

import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useParams } from "react-router-dom";
import axios from "axios";
// import { backend_url } from "../App";
import { useContext } from "react";
import { Shopcontext } from "../context/shopcontext";
const Comments = ({ product }) => {
  const [comments, setComments] = useState("");
  const [CommentText, setcommentext] = useState([]);
  const [finalcomments, setfinalcomments] = useState([]);
  const { products, commentname, setcommentname , token , BACKEND_URL } = useContext(Shopcontext);
  const { id } = useParams();
  let productId = id;
  useEffect(() => {
    setfinalcomments(products.flatMap((p) => p.review));
    console.log(commentname);
  }, [products, commentname]);
  const productsss = products.find((p) => p._id === productId);
  const reviews = productsss.review;
  const handleAddComments = async (e) => {
         e.preventDefault();
      console.log(productsss.review);
    if(token){
      try {
        setcommentext((prev) => [
          ...prev,
          {
            Comments: comments,
            commentname: commentname,
          },
        ]);
  
        setComments("");
        const response = await axios.post(BACKEND_URL + "/api/product/review", {
          productId,
          CommentText: comments,
          commentname: commentname,
        });
        if (response.data.message) {
          console.log(response.data.message);
          toast.success("Comment added");
        } else {
          console.log(response.data.message);
        }
      } catch (error) {
        console.log(error);
      }
    }else{
      toast.error('Login Or Register first')
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4  ">
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={10}
        containerClassName=""
        containerStyle={{}}
        toasterId="default"
        toastOptions={{
          // Define default options
          className: "",
          duration: 3000,
          removeDelay: 1000,
          style: {
            background: "#363636",
            color: "#fff",
          },

          // Default options for specific types
          success: {
            duration: 3000,
            iconTheme: {
              primary: "green",
              secondary: "black",
            },
          },
        }}
      />
      {/* Input Form */}
      <form onSubmit={handleAddComments} className="w-full mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            placeholder={`Share Your Vibe for ${product.name}...`}
            className="flex-1 p-4 rounded-2xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200 text-gray-800 placeholder-gray-500"
          />
          {comments.length > 10 && (
            <AnimatePresence mode="wait">
              <motion.div
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                {" "}
                <button
                  type="submit"
                  className="bg-black text-white p-6  rounded-2xl cursor-pointer hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-all duration-200 font-medium min-w-[70px]"
                >
                  Throw
                </button>
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </form>
      <div className="w-full space-y-3 overflow-y-scroll h-74">
        <h1 className="font-semibold text-lg">Comments ({reviews.length})</h1>

        {reviews && reviews.length > 0 ? (
          reviews.map((rev, index) => (
            <div key={index} className="review-item ">
              <p className="p-4">{rev.Comments}</p>
              <p className="p-4 font-bold  username">{rev.commentname ? `From ${rev.commentname}`:` ` }</p>
              <p className=" text-gray-500 font-extralight commenttime p-5 float-right ">
                {" "}
                {new Date(rev.date).toDateString()}{" "}
              </p>
              <hr />
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center min-h-[400px] p-8 text-center">
            <div className="relative mb-6">
              <div className="w-24 h-24 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl flex items-center justify-center shadow-inner">
                <MessageSquare className="w-12 h-12 text-gray-300" />
              </div>
              <Sparkles className="absolute -top-2 -right-2 w-8 h-8 text-amber-400" />
            </div>

            <h3 className="text-2xl font-semibold text-gray-800 mb-2">
              No Reviews Yet
            </h3>
            <p className="text-gray-500 mb-6 max-w-md">
              Be the first to share your experience! Your review will help
              others make better decisions.
            </p>

            <div className="flex items-center gap-4 mt-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="w-6 h-6 bg-gray-200 rounded-full mx-0.5"
                  ></div>
                ))}
              </div>
              <span className="text-sm text-gray-400">
                Waiting for first rating
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Comments;
 