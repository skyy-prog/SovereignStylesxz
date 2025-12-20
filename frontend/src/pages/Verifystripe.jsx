import React, { useContext, useEffect } from "react";
import { Shopcontext } from "../context/shopcontext";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const Verifystripe = () => {
  const { token, setcartitems, BACKEND_URL } =
    useContext(Shopcontext);
    const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");

  const verifyPayment = async () => {
    try {
      if (!token || !orderId) return;

      const response = await axios.post(
        `${BACKEND_URL}/api/order/verifystripe`,
        { success, orderId },
        { headers: { token } }
      );

      if (response.data.successs) {
        navigate("/orders");
        setcartitems({});
      
      } else {
        navigate("/cart");
      }
    } catch (error) {
      toast.error("Payment verification failed");
    }
  };

  useEffect(() => {
    if (token && orderId) {
      verifyPayment();
    }
   
  }, [token , orderId]);

  return <div>Verifying payment...</div>;
};

export default Verifystripe;
