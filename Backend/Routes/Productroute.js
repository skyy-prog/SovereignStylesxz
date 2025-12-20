import express from 'express'
import upload from '../Middlewares/multer.js';
import {addproducts , listproduct , removeproduct, singleproduct , addReviews} from '../Controllers/ProductHandler.js'
import  AdminAUth  from '../Middlewares/AdminAuth.js';
 export  const Productrouter = express.Router();
Productrouter.post('/add' , AdminAUth ,upload.fields([{name:'image1' , maxCount:1},{name:'image2' , maxCount:1},{name:'image3' , maxCount:1},{name:'image4' , maxCount:1}]),addproducts);
Productrouter.post('/single' , singleproduct);
Productrouter.post('/remove' ,AdminAUth ,removeproduct)
Productrouter.get('/list' , listproduct);
Productrouter.post('/review' , addReviews);

