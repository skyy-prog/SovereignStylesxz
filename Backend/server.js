import express from "express";
import cors from "cors";
import "dotenv/config";
import ConnectDB from "./Config/mongo.js";
import Connectcloudinary from "./Config/Cloudnary.js";
import router from "./Routes/Userroutes.js";
import OrderRouter from "./Routes/Orderroutes.js";
import  {Productrouter} from "./Routes/Productroute.js";
import CartRouter from "./Routes/CartRoutes.js";
import AIRouters from "./Routes/Generationroute.js";
const app = express();
const port = process.env.PORT || 3000;
ConnectDB();
Connectcloudinary();
app.use(express.json());
app.use(cors());
app.use('/api/user' , router );
app.use('/api/product',Productrouter);
app.use('/api/cart' , CartRouter);
app.use('/api/order' , OrderRouter);
app.use('/api/ai', AIRouters);
app.get("/", (req, res) => {
  res.send("Hello world from the ecommerce backend!");
});
app.listen(port, () => {
  console.log("Server chal raha hei port number", port);
});
