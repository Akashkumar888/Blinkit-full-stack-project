import express from 'express'
import { loginController, logoutController, registerUserController, verifyEmailController } from '../controllers/user.controller.js';
const userRouter=express.Router();
import {body} from "express-validator"
import { authUser } from '../middlewares/authUser.middleware.js';

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
export default userRouter;