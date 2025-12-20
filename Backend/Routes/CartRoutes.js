import express from 'express'
import { addtocart  , updatecart , getusercart} from '../Controllers/Cartcontrolller.js'
import Auth from '../Middlewares/Auth.js';


const CartRouter = express.Router();

CartRouter.post('/add'  , Auth, addtocart)
CartRouter.post('/update'  , Auth, updatecart)
CartRouter.post('/get' , Auth, getusercart)


export default  CartRouter;