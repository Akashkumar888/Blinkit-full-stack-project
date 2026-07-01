
import CartProductModel from "../models/cartproduct.model.js";
import UserModel from "../models/user.model.js";

/**
 * -----------------------------------------------------
 * Add Item To Cart
 * -----------------------------------------------------
 */
export const addToCartItemController = async (req, res) => {
  try {
    const userId = req.userId;
    const { productId, quantity = 1 } = req.body;

    if (!productId) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Product ID is required.",
      });
    }

    const existingItem = await CartProductModel.findOne({
      userId,
      productId,
    });

    if (existingItem) {
      return res.status(409).json({
        success: false,
        error: true,
        message: "Product already exists in cart.",
      });
    }

    const cartItem = await CartProductModel.create({
      userId,
      productId,
      quantity,
    });

    await UserModel.findByIdAndUpdate(userId, {
      $push: {
        shopping_cart: cartItem._id,
      },
    });

    return res.status(201).json({
      success: true,
      error: false,
      message: "Product added to cart successfully.",
      data: cartItem,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: true,
      message: error.message,
    });
  }
};

/**
 * -----------------------------------------------------
 * Get Cart Items
 * -----------------------------------------------------
 */
export const getCartItemController = async (req, res) => {
  try {
    const userId = req.userId;

    const cartItems = await CartProductModel.find({ userId })
      .populate({
        path: "productId",
      })
      .sort({ createdAt: -1 })
      .lean();

    return res.status(200).json({
      success: true,
      error: false,
      data: cartItems,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: true,
      message: error.message,
    });
  }
};

/**
 * -----------------------------------------------------
 * Update Cart Quantity
 * -----------------------------------------------------
 */
export const updateCartItemQtyController = async (req, res) => {
  try {
    const userId = req.userId;
    const { _id, qty } = req.body;

    if (!_id) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Cart item ID is required.",
      });
    }

    if (!qty || qty < 1) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Quantity must be greater than zero.",
      });
    }

    const updatedCart = await CartProductModel.findOneAndUpdate(
      {
        _id,
        userId,
      },
      {
        quantity: qty,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedCart) {
      return res.status(404).json({
        success: false,
        error: true,
        message: "Cart item not found.",
      });
    }

    return res.status(200).json({
      success: true,
      error: false,
      message: "Cart updated successfully.",
      data: updatedCart,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: true,
      message: error.message,
    });
  }
};

/**
 * -----------------------------------------------------
 * Delete Cart Item
 * -----------------------------------------------------
 */
export const deleteCartItemQtyController = async (req, res) => {
  try {
    const userId = req.userId;
    const { _id } = req.body;

    if (!_id) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Cart item ID is required.",
      });
    }

    const deletedItem = await CartProductModel.findOneAndDelete({
      _id,
      userId,
    });

    if (!deletedItem) {
      return res.status(404).json({
        success: false,
        error: true,
        message: "Cart item not found.",
      });
    }

    await UserModel.findByIdAndUpdate(userId, {
      $pull: {
        shopping_cart: deletedItem._id,
      },
    });

    return res.status(200).json({
      success: true,
      error: false,
      message: "Cart item removed successfully.",
      data: deletedItem,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: true,
      message: error.message,
    });
  }
};