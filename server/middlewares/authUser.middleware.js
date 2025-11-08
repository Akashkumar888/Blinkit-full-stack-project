
import  jwt  from "jsonwebtoken";
import userModel from "../models/user.model.js";


export const authUser = async (req, res, next) => {
  try {
    // 1. Get token from cookie or Authorization header
    const token =
      req.cookies?.accessToken ||
      (req.headers.authorization?.startsWith("Bearer ")
        ? req.headers.authorization.split(" ")[1]
        : null);

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Authentication token not found.",
      });
    }

    // 2. Verify token
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET_KEY_ACCESS_TOKEN);
    } catch (err) {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired token.",
      });
    }

    // 3. Extract user ID
    const userId = decoded._id || decoded.id;
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User ID missing in token.",
      });
    }

    // 4. Fetch user
    const user = await userModel.findById(userId).select("-password");
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found.",
      });
    }

    // 5. Attach user object to req
    req.user = user;
    next();
  } catch (error) {
    console.error("AUTH ERROR:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Server error",
    });
  }
};
