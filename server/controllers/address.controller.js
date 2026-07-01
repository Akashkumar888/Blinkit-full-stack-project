
import AddressModel from "../models/address.model.js";
import UserModel from "../models/user.model.js";

/**
 * -----------------------------------------------------
 * Create Address
 * -----------------------------------------------------
 */
export const addAddressController = async (req, res) => {
  try {
    const userId = req.userId;

    const {
      address_line,
      city,
      state,
      country,
      pincode,
      mobile,
    } = req.body;

    if (
      !address_line ||
      !city ||
      !state ||
      !country ||
      !pincode ||
      !mobile
    ) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "All address fields are required.",
      });
    }

    const address = await AddressModel.create({
      address_line,
      city,
      state,
      country,
      pincode,
      mobile,
      userId,
    });

    await UserModel.findByIdAndUpdate(
      userId,
      {
        $push: {
          address_details: address._id,
        },
      },
      { new: true }
    );

    return res.status(201).json({
      success: true,
      error: false,
      message: "Address added successfully.",
      data: address,
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
 * Get All Addresses
 * -----------------------------------------------------
 */
export const getAddressController = async (req, res) => {
  try {
    const userId = req.userId;

    const addresses = await AddressModel.find({
      userId,
      status: true,
    })
      .sort({ createdAt: -1 })
      .lean();

    return res.status(200).json({
      success: true,
      error: false,
      message: "Addresses fetched successfully.",
      data: addresses,
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
 * Update Address
 * -----------------------------------------------------
 */
export const updateAddressController = async (req, res) => {
  try {
    const userId = req.userId;

    const {
      _id,
      address_line,
      city,
      state,
      country,
      pincode,
      mobile,
    } = req.body;

    if (!_id) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Address ID is required.",
      });
    }

    const updatedAddress = await AddressModel.findOneAndUpdate(
      {
        _id,
        userId,
      },
      {
        address_line,
        city,
        state,
        country,
        pincode,
        mobile,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedAddress) {
      return res.status(404).json({
        success: false,
        error: true,
        message: "Address not found.",
      });
    }

    return res.status(200).json({
      success: true,
      error: false,
      message: "Address updated successfully.",
      data: updatedAddress,
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
 * Soft Delete Address
 * -----------------------------------------------------
 */
export const deleteAddressController = async (req, res) => {
  try {
    const userId = req.userId;
    const { _id } = req.body;

    if (!_id) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Address ID is required.",
      });
    }

    const deletedAddress = await AddressModel.findOneAndUpdate(
      {
        _id,
        userId,
      },
      {
        status: false,
      },
      {
        new: true,
      }
    );

    if (!deletedAddress) {
      return res.status(404).json({
        success: false,
        error: true,
        message: "Address not found.",
      });
    }

    return res.status(200).json({
      success: true,
      error: false,
      message: "Address removed successfully.",
      data: deletedAddress,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: true,
      message: error.message,
    });
  }
};