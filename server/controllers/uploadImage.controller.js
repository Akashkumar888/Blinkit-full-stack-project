
import uploadImageCloudinary from "../utils/uploadImageClodinary.js";

/**
 * ==========================================================
 * Upload Image Controller
 * ==========================================================
 * @route   POST /api/upload/image
 * @access  Private/Admin
 * ==========================================================
 */

const uploadImageController = async (req, res) => {
  try {
    const file = req.file;

    // Validate file
    if (!file) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Please upload an image.",
      });
    }

    // Upload image to Cloudinary
    const uploadedImage = await uploadImageCloudinary(file);

    // Validate upload response
    if (!uploadedImage || !uploadedImage.url) {
      return res.status(500).json({
        success: false,
        error: true,
        message: "Failed to upload image.",
      });
    }

    return res.status(200).json({
      success: true,
      error: false,
      message: "Image uploaded successfully.",
      data: uploadedImage,
    });
  } catch (error) {
    console.error("Upload Image Error:", error);

    return res.status(500).json({
      success: false,
      error: true,
      message: error.message || "Internal Server Error",
    });
  }
};

export default uploadImageController;