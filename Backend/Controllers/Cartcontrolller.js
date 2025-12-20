import usermodel from "../Models/Usermodel.js";
const addtocart = async (req, res) => {
  try {
    const { ItemId, Size, userId } = req.body;

    const userData = await usermodel.findById(userId);
    let cartData = userData.cartData;
 

    if (cartData[ItemId]) {
      if (cartData[ItemId][Size]) {
        cartData[ItemId][Size] += 1;
      } else {
        cartData[ItemId][Size] = 1;
      }
    } else {
      cartData[ItemId] = {};
      cartData[ItemId][Size] = 1;
    }

    await usermodel.findByIdAndUpdate(userId, { cartData });

    res.json({ success: true, message: "Added to cart" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

const updatecart = async (req, res) => {
  try {
    const { Itemid, size, quantity } = req.body;
    const userId = req.body.userId; // from Auth middleware

    if (!Itemid || !size || quantity == null) {
      return res.json({ success: false, message: "Missing fields" });
    }

    if (quantity < 0) {
      return res.json({ success: false, message: "Invalid quantity" });
    }

    const userData = await usermodel.findById(userId);

    if (!userData || !userData.cartData[Itemid]) {
      return res.json({ success: false, message: "Item not found in cart" });
    }

    if (quantity === 0) {
      // remove size
      delete userData.cartData[Itemid][size];

      // remove item if no sizes left
      if (Object.keys(userData.cartData[Itemid]).length === 0) {
        delete userData.cartData[Itemid];
      }
    } else {
      userData.cartData[Itemid][size] = quantity;
    }

    await usermodel.findByIdAndUpdate(userId, {
      cartData: userData.cartData,
    });

    res.json({ success: true, message: "Cart updated successfully" });
   
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

const getusercart = async (req, res) => {
  try {
    const userId = req.body.userId; // injected by Auth middleware

    const userData = await usermodel.findById(userId);

    if (!userData) {
      return res.json({ success: false, message: "User not found" });
    }

    res.json({
      success: true,
      cartData: userData.cartData || {},
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export {addtocart , updatecart , getusercart}