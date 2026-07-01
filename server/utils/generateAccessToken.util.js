import jwt from "jsonwebtoken";

/**
 * ==========================================================
 * Generate JWT Access Token
 * ==========================================================
 * @param {string} userId - MongoDB User ID
 * @returns {string} Signed JWT Access Token
 * ==========================================================
 */

export const generateAccessToken = (userId) => {
  if (!userId) {
    throw new Error("User ID is required to generate an access token.");
  }

  if (!process.env.JWT_SECRET_KEY_ACCESS_TOKEN) {
    throw new Error("JWT_ACCESS_TOKEN secret is not configured.");
  }

  return jwt.sign(
    {
      _id: userId,
    },
    process.env.JWT_SECRET_KEY_ACCESS_TOKEN,
    {
      expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN,
      issuer: "Blinkit",
      audience: "Blinkit-Users",
    }
  );
};