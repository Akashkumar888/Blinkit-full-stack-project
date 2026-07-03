import { Router } from "express";
import { authUser } from "../middlewares/authUser.middleware.js";
import {
  AddSubCategoryController,
  deleteSubCategoryController,
  getSubCategoryController,
  updateSubCategoryController,
} from "../controllers/subCategory.controller.js";

const subCategoryRouter = Router();

subCategoryRouter.post("/create", authUser, AddSubCategoryController);
subCategoryRouter.post("/get", getSubCategoryController);
subCategoryRouter.put("/update", authUser, updateSubCategoryController);
subCategoryRouter.delete("/delete", authUser, deleteSubCategoryController);

export default subCategoryRouter;
