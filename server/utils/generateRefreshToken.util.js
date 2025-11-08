
import jwt from 'jsonwebtoken'
import userModel from '../models/user.model.js';
export const generateRefreshToken=async (userId)=>{
    const token= jwt.sign({ _id: userId }, process.env.JWT_SECRET_KEY_REFRESH_TOKEN, 
      { expiresIn: "30d", // expiry is best practice
    });

    const updateRefreshTokenUser=await userModel.updateOne(
      {_id:userId},
      {
        refresh_token:token
      }
    );
    return token;
}
