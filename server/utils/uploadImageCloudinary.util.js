import { v2 as cloudinary } from "cloudinary";

/**
 * ==========================================================
 * Upload Image to Cloudinary
 * ==========================================================
 * Supports:
 * - Multer files (Express)
 * - Browser File objects
 *
 * @param {Object} file
 * @param {string} folder
 * @returns {Promise<Object>}
 * ==========================================================
 */

const uploadImageCloudinary = async (
  file,
  folder = process.env.CLOUDINARY_FOLDER || "blinkit"
) => {
  try {
    if (!file) {
      throw new Error("Image file is required.");
    }

    let buffer;

    // Multer file
    if (file.buffer) {
      buffer = file.buffer;
    }
    // Browser File object
    else if (typeof file.arrayBuffer === "function") {
      buffer = Buffer.from(await file.arrayBuffer());
    } else {
      throw new Error("Unsupported file format.");
    }

    const uploadedImage = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder,
          resource_type: "image",
          overwrite: false,
        },
        (error, result) => {
          if (error) {
            return reject(error);
          }

          resolve(result);
        }
      );

      uploadStream.end(buffer);
    });

    return uploadedImage;
  } catch (error) {
    console.error("Cloudinary Upload Error:", error);
    throw error;
  }
};

export default uploadImageCloudinary;