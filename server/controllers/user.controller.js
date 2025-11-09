import { sendEmail } from "../configs/sendEmail.config.js";
import userModel from "../models/user.model.js";
import { validationResult } from "express-validator";
import { verifyEmailTemplate } from "../utils/verifyEmailTemplate.js";
import { generateAccessToken } from "../utils/generateAccessToken.util.js";
import { generateRefreshToken } from "../utils/generateRefreshToken.util.js";
import uploadImageCloudinary from "../utils/uploadImageCloudinary.util.js";
import bcrypt from "bcryptjs";
import { generateSixDigitsOtp } from "../utils/generateOtp.util.js";
import { forgotPasswordTemplate } from "../utils/forgotPasswordTemplate.js";
import jwt from 'jsonwebtoken'

// register a user 
export const registerUserController=async(req,res)=>{
  try {
    const errors=validationResult(req);
    if(!errors.isEmpty()){
      return res.status(400).json({success:false,message:errors.array().map((errs)=>errs.msg)})
    }
    const {name,email,password}=req.body;
    
    const userAlreadyExists=await userModel.findOne({email});
    if(userAlreadyExists){
      return res.status(401).json({success:false,message:'User Already Exists'});
    }
    const user=await userModel.create({
      name,
      email,
      password
    });

    const verifyEmailUrl = `${process.env.FRONTEND_URL}/verify-email?code=${user._id}`;
    
    const sent = await sendEmail({
      sendTo: email,
      subject: "Verify your Blinkit Email",
      html: verifyEmailTemplate({ name, url: verifyEmailUrl })
    });

    if (!sent) {
      return res.status(500).json({ success:false, message:"Failed to send verification email" });
    }

    res.status(201).json({success:true,message:"User registered successfully",data:user});
  } catch (error) {
    console.log(error);
    res.status(500).json({success:false,message:error.message || "Server error",error:true});
  }
}

export const verifyEmailController=async(req,res)=>{
  try {
    const {code}=req.body;
    const user=await userModel.findOne({_id:code});
    if(!user){
      return res.status(400).json({success:false,message:"Invalid Code"});
    }
    const updatedUser=await userModel.updateOne({_id:code},{
      verify_email:true
    });
    res.status(200).json({success:true,message:"Verify Email"});
  } catch (error) {
    console.log(error);
    res.status(500).json({success:false,message:error.message || "Server error",error:true});
  }
}

export const loginController=async(req,res)=>{
  try {
    const errors=validationResult(req);
    if(!errors.isEmpty()){
      return res.status(400).json({success:false,message:errors.array().map((errs)=>errs.msg)})
    }
    const {email,password}=req.body;
    const user=await userModel.findOne({email}).select("+password");
    if(!user)return res.status(400).json({success:false,message:"User not found!"});
    if(user.status !=='Active'){
      res.status(400).json({success:false,message:"Contact to Admin"});
    }
    const isMatch=await user.comparePassword(password);
    if(!isMatch)return  res.status(400).json({success:false,message:"Invalid credentials"});
    const accessToken=await generateAccessToken(user._id);
    const refreshToken=await generateRefreshToken(user._id);
    
    const cookiesOption={
      httpOnly:true,
      secure:true,
      sameSite:'None'
    };


    res.cookie('accessToken',accessToken,cookiesOption);
    res.cookie('refreshToken',refreshToken,cookiesOption);

    res.status(200).json({success:true,message:"Login successfully!",
      data:{
      accessToken,
      refreshToken
    }
  });
  } catch (error) {
    console.log(error);
    res.status(500).json({success:false,message:error.message || "Server error",error:true});
  }
}



export const logoutController=async(req,res)=>{
  try {
    const userId = req.user._id;  // ✅ Fetch from req.user set by auth middleware
    const cookiesOption={
      httpOnly:true,
      secure:true,
      sameSite:'None'
    };
    const removeRefreshToken=await userModel.findByIdAndUpdate(userId,{
      refresh_token:"",
    });

    res.clearCookie('accessToken',cookiesOption);
    res.clearCookie('refreshToken',cookiesOption);
    
    return res.json({success:true,message:"Logout successfully!"});
  } catch (error) {
    console.log(error);
    res.status(500).json({success:false,message:error.message || "Server error",error:true});
  }
}


export const uploadAvatar=async(req,res)=>{
  try {
    const userId = req.user._id;  // ✅ Fetch from req.user set by auth middleware
    const file = req.file; // ✅ multer middleware puts file here
    console.log(file);
    // const files = req.files; // ✅ array of files
    if (!file) {
      return res.status(400).json({ success: false, message: "No image found" });
    }

    const uploaded = await uploadImageCloudinary(file);
    
    const updatesUser=await userModel.findByIdAndUpdate(userId,{
      avatar:uploaded.secure_url
    });

    res.json({
      success: true,
      message:"Upload profile",
      data:{
        _id:userId,
        avatar:uploaded.secure_url
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({success:false,message:error.message || "Server error",error:true});
  }
}

// update user details
export const updateUserDetails=async(req,res)=>{
  try {
    const userId = req.user._id;  // ✅ Fetch from req.user set by auth middleware
    const {name,email,password,mobile}=req.body;

    const user = await userModel.findById(userId).select("+password");
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Update fields ONLY if provided
    if (name) user.name = name;
    if (email) user.email = email;
    if (password) user.password = password; // ✅ plain password, NOT hashed
    if (mobile) user.mobile = mobile;

    // ✅ Pre-save hook will hash password automatically
    await user.save();
    
    // ✅ Remove password before sending response
    const safeUser = user.toObject();
    delete safeUser.password;   // ✅ delete from the object you send, not DB instance


    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      date:safeUser
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({success:false,message:error.message || "Server error",error:true});
  }
}


// forgot password (user not logged in)
export const forgotPassowrdController = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Generate OTP
    const otp = generateSixDigitsOtp();

    // Set expiry time = 1 hour
    const expireTime = new Date(Date.now() + 60 * 60 * 1000);

    // Update user OTP + Expiry (correct update query)
    await userModel.findByIdAndUpdate(user._id, {
      forgot_password_otp: otp,
      forgot_password_expiry: expireTime,
    });

    // Send email
    await sendEmail({
      sendTo: email,
      subject: "Blinkit Password Reset OTP",
      html: forgotPasswordTemplate(user.name, otp), // ✅ correct template usage
    });

    res.json({
      success: true,
      message: "OTP sent to your email. Please check your inbox.",
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message || "Server error",
      error: true,
    });
  }
};

// verify forgot password otp
export const verifyForgotPasswordOtp=async(req,res)=>{
  try {
    const {email,otp}=req.body;
    if(!email || !otp){
      return res.status(400).json({success:false,message:'Invalid credentials'});
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    const currentTime=new Date();
    if(user.forgot_password_expiry < currentTime){
       return res.status(400).json({
        success:false,
        message:"Otp is expired"
       });
    }
    if(otp!==user.forgot_password_otp){
      return res.status(400).json({
        success:false,
        message:"Otp is incorrect"
       });
    }
    // if otp is not expired 
    return res.json({success:true,message:"Verify otp successfully"});

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message || "Server error",
      error: true,
    });
  }
}


// reset the password
export const resetPassword = async (req, res) => {
  try {
    const { email, newPassword, confirmPassword } = req.body;

    if (!email || !newPassword || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Both passwords must be the same",
      });
    }

    // find user and include password (since password has select:false)
    const user = await userModel.findOne({ email }).select("+password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // ✅ Update password
    user.password = newPassword;  // pre-save hook will hash it

    // ✅ Clear OTP/expiry fields (optional but recommended)
    user.forgot_password_otp = null;
    user.forgot_password_expiry = null;

    await user.save(); // triggers pre('save') → hashes password

    return res.status(200).json({
      success: true,
      message: "Password reset successful",
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message || "Server error",
      error: true,
    });
  }
};


// refresh_token controller
export const refreshToken = async (req, res) => {
  try {
    // 1. Get refresh token from cookie or header
    const refreshToken =
      req.cookies?.refreshToken ||
      (req.headers.authorization?.startsWith("Bearer ")
        ? req.headers.authorization.split(" ")[1]
        : null);

    if (!refreshToken) {
      return res.status(400).json({
        success: false,
        message: "Refresh token missing",
      });
    }

    // 2. Verify token
    let decodedToken;
    try {
      decodedToken = jwt.verify(
        refreshToken,
        process.env.JWT_SECRET_KEY_REFRESH_TOKEN
      );
    } catch (err) {
      return res.status(401).json({
        success: false,
        message: "Refresh token expired or invalid",
      });
    }

    const userId = decodedToken?._id;

    // 3. Find user and validate stored refresh token
    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.refresh_token !== refreshToken) {
      return res.status(401).json({
        success: false,
        message: "Refresh token is not valid or revoked",
      });
    }

    // 4. Generate new access token
    const newAccessToken = await generateAccessToken(userId);

    const cookiesOption = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    };

    res.cookie("accessToken", newAccessToken, cookiesOption);

    return res.json({
      success: true,
      message: "New Access Token generated",
      data: {
        accessToken: newAccessToken,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message || "Server error",
      error: true,
    });
  }
};
