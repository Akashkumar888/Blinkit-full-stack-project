import { Router } from "express";
import { authUser } from "../middlewares/authUser.middleware.js";
import {
  createProductController,
  deleteProductDetails,
  getProductByCategory,
  getProductByCategoryAndSubCategory,
  getProductController,
  getProductDetails,
  searchProduct,
  updateProductDetails,
} from "../controllers/product.controller.js";
import admin from "../middlewares/admin.middleware.js";

const productRouter = Router();

productRouter.post("/create", authUser, admin, createProductController);
productRouter.post("/get", getProductController);
productRouter.post("/get-product-by-category", getProductByCategory);
productRouter.post(
  "/get-pruduct-by-category-and-subcategory",
  getProductByCategoryAndSubCategory,
);
productRouter.post("/get-product-details", getProductDetails);

//update product
productRouter.put("/update-product-details", authUser, admin, updateProductDetails);

//delete product
productRouter.delete("/delete-product", authUser, admin, deleteProductDetails);

//search product
productRouter.post("/search-product", searchProduct);

export default productRouter;
