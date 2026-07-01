import jwt from "jsonwebtoken";
import UserModel from "../models/user.model.js";

/**
 * ==========================================================
 * Generate Refresh Token
 * ==========================================================
 * Generates a JWT refresh token and stores it in the database.
 *
 * @param {string} userId - MongoDB User ID
 * @returns {Promise<string>} Refresh Token
 * ==========================================================
 */

const generateRefreshToken = async (userId) => {
  try {
    if (!userId) {
      throw new Error("User ID is required.");
    }

    if (!process.env.JWT_SECRET_KEY_REFRESH_TOKEN) {
      throw new Error("JWT refresh token secret is not configured.");
    }

    const refreshToken = jwt.sign(
      { _id: userId },
      process.env.JWT_SECRET_KEY_REFRESH_TOKEN,
      {
        expiresIn:
          process.env.JWT_REFRESH_TOKEN_EXPIRES_IN || "7d",
        issuer: "Blinkit",
        audience: "Blinkit-Users",
      }
    );

    await UserModel.findByIdAndUpdate(
      userId,
      {
        refresh_token: refreshToken,
      },
      {
        new: false,
      }
    );

    return refreshToken;
  } catch (error) {
    console.error("Generate Refresh Token Error:", error);
    throw error;
  }
};

export default generateRefreshToken;