import UserModel from "../models/user.model.js";

/**
 * ==========================================================
 * Admin Authorization Middleware
 * ==========================================================
 * Allows only ADMIN users to access protected routes.
 *
 * Requirements:
 * - auth middleware must execute before this middleware
 * - req.userId should be available
 * ==========================================================
 */

const admin = async (req, res, next) => {
  try {
    const userId = req.user?._id || req.user?.id || req.userId;

    // Authentication check
    if (!userId) {
      return res.status(401).json({
        success: false,
        error: true,
        message: "Unauthorized access.",
      });
    }

    // Fetch only the role for better performance
    const user = await UserModel.findById(userId).select("role");

    // User not found
    if (!user) {
      return res.status(404).json({
        success: false,
        error: true,
        message: "User not found.",
      });
    }

    // Authorization check
    if (user.role !== "ADMIN") {
      return res.status(403).json({
        success: false,
        error: true,
        message: "Access denied. Admin privileges are required.",
      });
    }

    next();
  } catch (error) {
    console.error("Admin Middleware Error:", error);

    return res.status(500).json({
      success: false,
      error: true,
      message: error.message || "Internal Server Error",
    });
  }
};

export default admin;
