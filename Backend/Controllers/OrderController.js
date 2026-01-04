import { Ordermodel } from "../Models/Orderschema.js";
import usermodel from "../Models/Usermodel.js";
import { sendOrderStatusMail } from "../utils/sendEmail.js";
import { sentmailjustafterplacingorder } from "../utils/sendEmail.js";
import Stripe from 'stripe'
import razorpay from 'razorpay'
const stripe = new Stripe(process.env.STRIPE_SECRET);
 const razorpayintances = new razorpay({
  key_id:process.env.RAZORPAYID,
  key_secret:process.env.KEY_SECRET
 
 })
const currency = "inr";
const Delivery_fee = 10;
const placeorder = async(req,res)=>{
    try {
         const {  userId ,  items , address , amount } = req.body;
        
    const orderData = {
        userId  : userId, 
        items , 
        address ,
        amount ,
        payment : false ,
        paymentMethod:'cod',
        date :Date.now()
    }
    const NewOrder = new Ordermodel(orderData)
    await NewOrder.save();
    await usermodel.findByIdAndUpdate(userId , {cartData:{}});
    res.json({success:true , message:'Order Placed ...'});
    const productname = items.map((items)=>items.name).join(',')
    await sentmailjustafterplacingorder(address.email , address.name   ,  productname , address.address );
    console.log(name)
    } catch (error) {
        console.log(error.message)
        res.json({success:false , message:'Got Some Trubble'})
        console.log(error.message)
    }
}
 
 const placeorderwithstripe = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;
    const { origin } = req.headers;

    if (!items || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No items in order",
      });
    }

    const orderData = {
      userId,
      items,
      address,
      amount,
      payment: false,
      paymentMethod: "Stripe",
      date: Date.now(),
    };

    const NewOrder = new Ordermodel(orderData);
    await NewOrder.save();

    const line_items = items.map((item) => ({
      price_data: {
        currency,
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));

    line_items.push({
      price_data: {
        currency,
        product_data: {
          name: "Delivery Fee",
        },
        unit_amount: Delivery_fee * 100,
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      success_url:`${origin}/verify?success=true&orderId=${NewOrder._id}`,
      cancel_url:`${origin}/verify?success=false&orderId=${NewOrder._id}`,
      line_items,
      mode:'payment'
    })

    res.json({success:true, sessionURL:session.url})

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Stripe order failed",
    });
  }
};
///email , name  , productname , address
const verifystripe  = async(req,res)=>{
 try {
    const {orderId , success , userId} = req.body;
  if(success === 'true'){
    await Ordermodel.findByIdAndUpdate(orderId , {payment:true})
    await usermodel.findByIdAndUpdate(userId , {cartData:{}});
    res.json({successs:true});
    const orderinfo = await Ordermodel.findById(orderId);
    const email = orderinfo.address.email;
    const name = orderinfo.address.name;
    const items = orderinfo.items;
    const address = orderinfo.address.address
    const productname = items.map((items)=>items.name).join(',');
    await sentmailjustafterplacingorder(email , name , productname  , address);
  }else{
    await Ordermodel.findByIdAndDelete(orderId)
        res.json({success:false});
  }
  
 } catch (error) {
  console.log(error);
    res.status(500).json({
      success: false,
    });
 }
}


const placeorderwithrazorpay=async(req,res)=>{
     try {
       const {  userId ,  items , address , amount } = req.body;
        
    const orderData = {
        userId  : userId, 
        items , 
        address ,
        amount ,
        payment : false ,
        paymentMethod:'Razorpay',
        date :Date.now()
    }
    const NewOrder = new Ordermodel(orderData)
    await NewOrder.save();

    const options = {
      amount : amount * 100,
      currency : currency.toUpperCase(),
      receipt : NewOrder._id.toString(),

    }
     await razorpayintances.orders.create(options , (error , order)=>{
      if(error){
        console.log(error.message);
        return res.json({success:false , message:error.message});
      }
      res.json({success:true , order})
    })
      
     } catch (error) {
       console.log(error);
    res.status(500).json({
      success: false,
      message: "Razorpay order failed",
    });
     }
}

const verifyrazorpay = async(req,res)=>{
  try {
    const {userId , razorpay_order_id} = req.body;
    const orderInfo = await razorpayintances.orders.fetch(razorpay_order_id);
    if(orderInfo.status === 'paid'){
    await Ordermodel.findByIdAndUpdate(orderInfo.receipt , {payment:true})
    await usermodel.findByIdAndUpdate(userId , {cartData:{}});
    res.json({success:true , message:'payment successfull'})
    }else{
       res.json({success:false , message:'payment failed'})
    }
    res.json({success:true , orderInfo})
  } catch (error) {
    res.json({success : false , message: error.message})
  }
}

const allorder = async(req,res)=>{
  try {
      const Orders =  await (await Ordermodel.find({})).reverse();
      if(Orders){
          res.json({success:true , Orders})
      }else{
        res.json({success:false , message:'No Orders are available' })
      }
  } catch (error) {
            res.json({success:false , message:'Got some errors in Orders' })
  }

}
 

const updatestatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;

    // Update the order status
    const order = await Ordermodel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    // Get email from the address object
    const userEmail = order.address?.email;
    const items = order.items;
    const productname =items.map((item)=> item.name).join(" , ")
    if (userEmail) {
      await sendOrderStatusMail(userEmail ,  order._id, status , productname);
    } else {
      console.log("User email not found for order:", order._id);
    }

    res.json({ success: true, message: 'Status updated and email sent' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Something went wrong' });
  }
};




const userOders = async(req,res)=>{
 try {
        const {userId}  = req.body;
 const orders =    await Ordermodel.find({userId})
 if(orders){
    res.json({success:true , orders})

 }else
 {
    res.json({success:false , message:'no orders are available'})
 }
 } catch (error) {
        res.json({success:false , message :error.message})

 }


}

export  {placeorder,placeorderwithrazorpay,placeorderwithstripe , allorder , updatestatus , userOders , verifystripe , verifyrazorpay}