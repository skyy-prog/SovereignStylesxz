import { v2 as cloudinary } from "cloudinary";
import ProductModel from "../Models/ProductNeuralschema.js";
export const addproducts = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      subcategory,
      sizes,
      bestseller,
      review,
    } = req.body;
    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];
    const image3 = req.files.image3 && req.files.image3[0];
    const image4 = req.files.image4 && req.files.image4[0];
    console.log({
      name,
      description,
      price,
      category,
      subcategory,
      sizes,
      bestseller,
    });
    const images = [image1, image2, image3, image4].filter(
      (items) => items !== undefined
    ); ////this is blue print for the storing the img in the databases
    const imageURL = await Promise.all(
      images.map(async (item) => {
        let resultURL = await cloudinary.uploader.upload(item.path, {
          resource_type: "image",
        }); /////////yaha perr hum cloadinary per upload karhe hei photos ko
        return resultURL.secure_url;
      })
    );
    console.log(imageURL);
    const productsData = {
      name,
      description,
      price: Number(price),
      category,
      subcategory,
      sizes: JSON.parse(sizes),
      bestseller: bestseller === "true" ? true : false,
      img: imageURL,
      date: Date.now(),
      review: review ? [{ Comments: review }] : [],
    };
    const Product = new ProductModel(productsData);
    await Product.save();
    res.json({ sucess: true, msg: "product added " });
  } catch (error) {
    res.json({ sucess: false, msg: error.message });
  }
};
export const listproduct = async (req, res) => {
  try {
    const Products = await ProductModel.find({});
    if (Products) {
      res.json({ success: true, Products });
    } else {
      res.json({
        success: false,
        messgae: "failed to load the product due to techinical issue",
      });
    }
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
export const removeproduct = async (req, res) => {
  try {
    await ProductModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Product Removed" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
export const singleproduct = async (req, res) => {
  try {
    const { ProductId } = req.body;
    const product = await ProductModel.findById(ProductId);
    res.json({ success: true, product });
  } catch (error) {
    res.json({ sucsess: false, message: error.message });
  }
};

export const addReviews = async (req, res) => {
  try {
    const { productId, CommentText, commentname } = req.body;

    if (!CommentText) {
      return res.json({ success: false, message: "Review is required" });
    }

    await ProductModel.findByIdAndUpdate(
      productId,
      {
        $push: {
          review: {
            Comments: CommentText,
            commentname: commentname,
            // date mongoose khud de deg
          },
        },
      },
      { new: true }
    );

    return res.json({ success: true, message: "Review added for the product" });
  } catch (error) {
    return res.json({ success: false, message: "Internal error" });
  }
};
