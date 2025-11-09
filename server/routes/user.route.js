import express from 'express'
import { forgotPassowrdController, loginController, logoutController, refreshToken, registerUserController, resetPassword, updateUserDetails, uploadAvatar, verifyEmailController, verifyForgotPasswordOtp } from '../controllers/user.controller.js';
const userRouter=express.Router();
import {body} from "express-validator"
import { authUser } from '../middlewares/authUser.middleware.js';
import upload from '../middlewares/multer.middleware.js';

userRouter.post(
  "/register",
  [
    // isEmpty() means name must be EMPTY 😅 (reverse logic)
    body("name").notEmpty().withMessage("Please enter your name"),
    body("email").isEmail().withMessage("Please enter a valid email"),
    body("password").isLength({ min: 8 }).withMessage("Password must be at least 8 characters long"),
  ],
  registerUserController
);

userRouter.post("/verify-email",verifyEmailController);
userRouter.post(
  "/login",
  [
    body("email").isEmail().withMessage("Please enter a valid email"),
    body("password").isLength({ min: 8 }).withMessage("Password must be at least 8 characters long"),
  ],
  loginController
);
userRouter.get('/logout',authUser, logoutController);


// ✅ Multer middleware
userRouter.put("/upload-avatar",authUser, upload.single("avatar") ,uploadAvatar);
// userRouter.post("/upload-multiple", upload.array("images", 5), uploadMultipleImages);

// ✅ 1. Allow Unlimited Files
// Multer allows unlimited files if you remove the limit:
// userRouter.post("/upload-multiple", upload.array("images"), uploadMultipleImages);
// No maxCount → unlimited images
// But you must set a safe limit on file size in Multer (which you already have: 5MB)
// ✅ Recommended Approach (Flexible & Safe)
// ✅ Use 20 as max (industry standard):
// userRouter.post("/upload-multiple", upload.array("images", 20), uploadMultipleImages);
// ✅ OR unlimited:
// userRouter.post("/upload-multiple", upload.array("images"), uploadMultipleImages);


userRouter.put("/update-user",authUser ,updateUserDetails);
userRouter.put("/forgot-password" ,forgotPassowrdController);
userRouter.put("/verify-forgot-password-otp" ,verifyForgotPasswordOtp);
userRouter.put("/reset-password" ,resetPassword);
userRouter.post("/refresh-token",refreshToken);
export default userRouter;

