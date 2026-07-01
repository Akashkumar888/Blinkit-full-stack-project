
import mongoose from "mongoose";
import ProductModel from "../models/product.model.js";
import SubCategoryModel from "../models/subCategory.model.js";

/**
 * ==========================================================
 * Create Sub Category
 * ==========================================================
 */
export const AddSubCategoryController = async (req, res) => {
  try {
    const { name, image, category } = req.body;

    if (!name?.trim()) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Sub category name is required.",
      });
    }

    if (!image?.trim()) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Sub category image is required.",
      });
    }

    if (!Array.isArray(category) || category.length === 0) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Please select at least one category.",
      });
    }

    const existingSubCategory = await SubCategoryModel.findOne({
      name: name.trim(),
    });

    if (existingSubCategory) {
      return res.status(409).json({
        success: false,
        error: true,
        message: "Sub category already exists.",
      });
    }

    const subCategory = await SubCategoryModel.create({
      name: name.trim(),
      image,
      category,
    });

    return res.status(201).json({
      success: true,
      error: false,
      message: "Sub category created successfully.",
      data: subCategory,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: true,
      message: error.message,
    });
  }
};

/**
 * ==========================================================
 * Get All Sub Categories
 * ==========================================================
 */
export const getSubCategoryController = async (req, res) => {
  try {
    const subCategories = await SubCategoryModel.find()
      .populate("category", "name image")
      .sort({ createdAt: -1 })
      .lean();

    return res.status(200).json({
      success: true,
      error: false,
      message: "Sub categories fetched successfully.",
      data: subCategories,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: true,
      message: error.message,
    });
  }
};

/**
 * ==========================================================
 * Update Sub Category
 * ==========================================================
 */
export const updateSubCategoryController = async (req, res) => {
  try {
    const { _id, name, image, category } = req.body;

    if (!_id || !mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Invalid sub category ID.",
      });
    }

    const updatedSubCategory = await SubCategoryModel.findByIdAndUpdate(
      _id,
      {
        name,
        image,
        category,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedSubCategory) {
      return res.status(404).json({
        success: false,
        error: true,
        message: "Sub category not found.",
      });
    }

    return res.status(200).json({
      success: true,
      error: false,
      message: "Sub category updated successfully.",
      data: updatedSubCategory,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: true,
      message: error.message,
    });
  }
};

/**
 * ==========================================================
 * Delete Sub Category
 * ==========================================================
 */
export const deleteSubCategoryController = async (req, res) => {
  try {
    const { _id } = req.body;

    if (!_id || !mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Invalid sub category ID.",
      });
    }

    // Prevent deletion if products are using this subcategory
    const productCount = await ProductModel.countDocuments({
      subCategory: {
        $in: [_id],
      },
    });

    if (productCount > 0) {
      return res.status(409).json({
        success: false,
        error: true,
        message:
          "This sub category is already associated with one or more products and cannot be deleted.",
      });
    }

    const deletedSubCategory = await SubCategoryModel.findByIdAndDelete(_id);

    if (!deletedSubCategory) {
      return res.status(404).json({
        success: false,
        error: true,
        message: "Sub category not found.",
      });
    }

    return res.status(200).json({
      success: true,
      error: false,
      message: "Sub category deleted successfully.",
      data: deletedSubCategory,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: true,
      message: error.message,
    });
  }
};