import { placeorder , placeorderwithrazorpay , placeorderwithstripe , allorder, updatestatus ,  userOders , verifystripe , verifyrazorpay } from "../Controllers/OrderController.js";
import express from 'express'
import  AdminAuth  from "../Middlewares/AdminAuth.js";
import Auth from "../Middlewares/Auth.js";
const OrderRouter = express.Router();
//all these two will be for the admin planel to update the status and and to get all the information about the order and changes in the orders
OrderRouter.post('/updatestatus' , AdminAuth , updatestatus);
OrderRouter.post('/allOrder'  , AdminAuth, allorder);


/// this will be for the  user to place the order 
OrderRouter.post('/placeorder' , Auth , placeorder);


////this is payment metho for the user to select and contineu with the diff payment method
OrderRouter.post('/verifystripe' ,Auth  , verifystripe)
OrderRouter.post('/verifyrazorpay' , Auth , verifyrazorpay)
OrderRouter.post('/useroders' , Auth , userOders);
OrderRouter.post('/withrazorpay'  , Auth, placeorderwithrazorpay);
OrderRouter.post('/withstripe'  , Auth, placeorderwithstripe );


export default OrderRouter;
