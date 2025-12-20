import mongoose from "mongoose";

const ProductNeuralSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  img: { type: Array, required: true },
  category: { type: String, required: true },
  subcategory: { type: String, required: true },
  sizes: { type: Array, required: true },
  bestseller: { type: Boolean },
  date: { type: Number, required: true },
  review: [
    {
      Comments: { type: String },
      commentname: { type: String },
      date: { type: Number, default: Date.now() },
    },
  ],
});

const ProductModel =
  mongoose.models.product || mongoose.model("product", ProductNeuralSchema);

export default ProductModel;
