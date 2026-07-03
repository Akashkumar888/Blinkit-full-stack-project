import { Router } from "express";
import { authUser } from "../middlewares/authUser.middleware.js";
import {
  addToCartItemController,
  deleteCartItemQtyController,
  getCartItemController,
  updateCartItemQtyController,
} from "../controllers/cart.controller.js";

const cartRouter = Router();

cartRouter.post("/create", authUser, addToCartItemController);
cartRouter.get("/get", authUser, getCartItemController);
cartRouter.put("/update-qty", authUser, updateCartItemQtyController);
cartRouter.delete("/delete-cart-item", authUser, deleteCartItemQtyController);

export default cartRouter;
