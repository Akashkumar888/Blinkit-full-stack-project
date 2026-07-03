import { Router } from "express";
import { authUser } from "../middlewares/authUser.middleware.js";
import uploadImageController from "../controllers/uploadImage.controller.js";
import upload from "../middlewares/multer.middleware.js";

const uploadRouter = Router();

uploadRouter.post(
  "/upload",
  authUser,
  upload.single("image"),
  uploadImageController,
);

export default uploadRouter;
