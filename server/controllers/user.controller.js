import { sendEmail } from "../configs/sendEmail.config.js";
import userModel from "../models/user.model.js";
import { validationResult } from "express-validator";
import { verifyEmailTemplate } from "../utils/verifyEmailTemplate.js";
import { generateAccessToken } from "../utils/generateAccessToken.util.js";
import { generateRefreshToken } from "../utils/generateRefreshToken.util.js";

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

    const cookiesOption={
      httpOnly:true,
      secure:true,
      sameSite:'None'
    };

    res.clearCookie('accessToken',cookiesOption);
    res.clearCookie('refreshToken',cookiesOption);
    
    return res.json({success:true,message:"Logout successfully!"});
  } catch (error) {
    console.log(error);
    res.status(500).json({success:false,message:error.message || "Server error",error:true});
  }
}
