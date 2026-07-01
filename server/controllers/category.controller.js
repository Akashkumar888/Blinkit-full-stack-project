
import CategoryModel from "../models/category.model.js";
import ProductModel from "../models/product.model.js";
import SubCategoryModel from "../models/subCategory.model.js";

/**
 * -----------------------------------------------------
 * Create Category
 * -----------------------------------------------------
 */
export const AddCategoryController = async (req, res) => {
  try {
    const { name, image } = req.body;

    if (!name?.trim() || !image?.trim()) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Category name and image are required.",
      });
    }

    const existingCategory = await CategoryModel.findOne({
      name: name.trim(),
    });

    if (existingCategory) {
      return res.status(409).json({
        success: false,
        error: true,
        message: "Category already exists.",
      });
    }

    const category = await CategoryModel.create({
      name: name.trim(),
      image,
    });

    return res.status(201).json({
      success: true,
      error: false,
      message: "Category created successfully.",
      data: category,
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
 * -----------------------------------------------------
 * Get All Categories
 * -----------------------------------------------------
 */
export const getCategoryController = async (req, res) => {
  try {
    const categories = await CategoryModel.find()
      .sort({ createdAt: -1 })
      .lean();

    return res.status(200).json({
      success: true,
      error: false,
      data: categories,
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
 * -----------------------------------------------------
 * Update Category
 * -----------------------------------------------------
 */
export const updateCategoryController = async (req, res) => {
  try {
    const { _id, name, image } = req.body;

    if (!_id) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Category ID is required.",
      });
    }

    const updatedCategory = await CategoryModel.findByIdAndUpdate(
      _id,
      {
        name,
        image,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedCategory) {
      return res.status(404).json({
        success: false,
        error: true,
        message: "Category not found.",
      });
    }

    return res.status(200).json({
      success: true,
      error: false,
      message: "Category updated successfully.",
      data: updatedCategory,
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
 * -----------------------------------------------------
 * Delete Category
 * -----------------------------------------------------
 */
export const deleteCategoryController = async (req, res) => {
  try {
    const { _id } = req.body;

    if (!_id) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Category ID is required.",
      });
    }

    const [subCategoryCount, productCount] = await Promise.all([
      SubCategoryModel.countDocuments({
        category: {
          $in: [_id],
        },
      }),

      ProductModel.countDocuments({
        category: {
          $in: [_id],
        },
      }),
    ]);

    if (subCategoryCount > 0 || productCount > 0) {
      return res.status(409).json({
        success: false,
        error: true,
        message:
          "Category is already linked with products or subcategories and cannot be deleted.",
      });
    }

    const deletedCategory = await CategoryModel.findByIdAndDelete(_id);

    if (!deletedCategory) {
      return res.status(404).json({
        success: false,
        error: true,
        message: "Category not found.",
      });
    }

    return res.status(200).json({
      success: true,
      error: false,
      message: "Category deleted successfully.",
      data: deletedCategory,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: true,
      message: error.message,
    });
  }
};