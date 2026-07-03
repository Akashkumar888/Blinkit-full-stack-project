import { Router } from "express";
import { authUser } from "../middlewares/authUser.middleware.js";
import {
  AddCategoryController,
  deleteCategoryController,
  getCategoryController,
  updateCategoryController,
} from "../controllers/category.controller.js";

const categoryRouter = Router();

categoryRouter.post("/add-category", authUser, AddCategoryController);
categoryRouter.get("/get", getCategoryController);
categoryRouter.put("/update", authUser, updateCategoryController);
categoryRouter.delete("/delete", authUser, deleteCategoryController);

export default categoryRouter;
