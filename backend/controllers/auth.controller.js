import mongoose from "mongoose";
import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";

const generateToken = async (id) => {
  try {
    const user = await User.findById(id);
    return await user.generateAccessToken();
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// Register a new rapper
export const registerUser = async (req, res) => {
  try {
    // Destructure
    const { name, username, email, password } = req.body;

    // check existing user
    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists",
      });
    }

    // Create New User
    const user = await User.create({
      name,
      username,
      email,
      password,
    });

    // Generate JWT Token
    const accessToken = await generateToken(user._id);
    console.log(accessToken);
    
    // Remove password
    const userWithoutPassword = await User.findById(user._id).select(
      "-password"
    );

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });

    return res.status(201).json({
      success: true,
      message: "User Registered Successfully",
      user: userWithoutPassword,
      accessToken,
    });
  } catch (err) {
    if (err.name === "ValidationError") {
      // Collect all field-specific errors
      const errors = {};
      Object.keys(err.errors).forEach((key) => {
        errors[key] = err.errors[key].message;
      });
      return res.status(400).json({ errors });
    }

    // Handle duplicate key error (unique)
    if (err.code === 11000) {
      const field = Object.keys(err.keyValue)[0];
      return res.status(400).json({
        errors: { [field]: `${field} already exists` },
      });
    }
    return res.status(500).json({
      success: false,
      message: "Error in User Registration",
      error: err.message,
    });
  }
};

// Login User
export const loginUser = async (req, res) => {
  try {
    // Destructure Request
    console.log(req.body);

    const { credential, password } = req.body;

    // Check if user exist
    const user = await User.findOne({
      $or: [{ email: credential }, { username: credential }],
    });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not Found",
      });
    }

    // Verify Password
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid Credentials",
      });
    }

    // Generate Token
    const accessToken = await generateToken(user._id);
    console.log(accessToken);
    
    const userWithoutPassword = await User.findById(user._id).select(
      "-password"
    );

    // Store token in cookie
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });

    return res.status(200).json({
      success: true,
      message: "Logged in successfully",
      user: userWithoutPassword,
      token: accessToken,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error in Login",
      error: error.message,
    });
  }
};

// Logout User
export const logoutUser = async (req, res) => {
  try {
    // Clear Cookie
    res.clearCookie("accessToken");
    return res.status(200).json({
      success: true,
      message: "Logged Out Succesfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Logout Failed",
      error: error.message,
    });
  }
};

export const currentUser = (req, res) => {
  return res.status(200).json({
    success: true,
    user: req.user,
    message: "User Fetched Successfully",
  });
};
