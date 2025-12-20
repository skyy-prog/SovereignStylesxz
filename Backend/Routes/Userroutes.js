import express from "express";
import {Admin , UserLogin , UserRegister} from '../Controllers/UserHandler.js'
const router = express.Router();
router.post('/register' , UserRegister);
router.post('/userlogin' , UserLogin);
router.post('/admin' , Admin);
 


export default  router;