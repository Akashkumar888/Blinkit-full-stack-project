import jwt from 'jsonwebtoken'
export const generateAccessToken=(userId)=>{
    const token= jwt.sign({ _id: userId }, process.env.JWT_SECRET_KEY_ACCESS_TOKEN, 
      { expiresIn: "5hr", // expiry is best practice
    });
    return token;
}
