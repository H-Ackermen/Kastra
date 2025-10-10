import Content from "../models/content.model.js";
import User from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/content.utils.js";
import { addToCategory } from "../utils/category.utils.js";
import { updateDailyEngagement } from "../utils/engagement.util.js"
import { v2 as cloudinary } from "cloudinary";

export const uploadAndCreateContent = async (req, res) => {
  try {
    console.log("Running uploadAndCreateContents");

    const file = req.file;
    console.log(req.body);
    const { title, description, category } = req.body;
    let result=null;
    const owner = req.user._id;
    if (file) {


      if (file.mimetype.startsWith("image/") && file.size > 10 * 1024 * 1024) {
        return res.status(400).json({
          success: false,
          message: "Image size should be less than 10MB",
        });
      }
      if (file.mimetype.startsWith("video/") && file.size > 100 * 1024 * 1024) {
        return res.status(400).json({
          success: false,
          message: "Video size should be less than 100MB",
        });
      }
      if (!title || !description) {
        return res.status(400).json({
          success: false,
          message: "Title and description are required",
        });
      }

      // Upload to Cloudinary
      result = await uploadOnCloudinary(file.path);
      if (!result) {
        return res.status(500).json({
          success: false,
          message: "Failed to upload file to Cloudinary",
        });
      }

    }
    // Save content in DB

    const newContent = new Content({
      owner,
      title,
      description,
      url: file ? result.secure_url : null,
      publicId : file ? result.public_id : null,
      // saare types ke liye
      contentType: file ? result.resource_type : 'article',
    });


    await newContent.save();
    await addToCategory(newContent._id, category);
    return res.status(201).json({
      success: true,
      message: "Content created successfully",
      data: newContent,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error occurred while creating content",
    });
  }

};
// fetch all contents by a user

export const fetchContentsByUser = async (req, res) => {
  const userId = req.user._id;

  try {
    const contents = await Content.find({ owner: userId }).populate(
      "owner",
      "username email"
    );
    return res.status(200).json({
      success: true,
      message: "Contents fetched successfully",
      contents,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error occurred while fetching contents",
    });
  }
};
// fetch all contents by id
export const fetchContentById = async (req, res) => {
  const { id } = req.params;
  console.log(req.params);

  console.log(id);

  try {
    const content = await Content.findById(id).populate("owner", "username email");
    if (!content) {
      return res.status(404).json({
        success: false,
        message: "Content not found",
      });
    }
    await updateDailyEngagement(id, { views: 1 });
    return res.status(200).json({
      success: true,
      message: "Content fetched successfully",
      content,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error occurred while fetching content",
      error: error.message,
    });
  }
};
// fetch all contents
export const fetchAllContents = async (req, res) => {
  try {
    const contents = await Content.find({}).populate("owner", "username email username");
    return res.status(200).json({
      success: true,
      message: "All contents fetched acche se",
      contents,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error in fetching all contents",
      error: error.message,
    });
  }
};

export const deleteContent = async (req, res) => {
  try {
    const content = await Content.findById(req.params.id);

    if (!content) {
      return res.status(404).json({ success: false, message: "Content not found" });
    }

    // Delete from Cloudinary only if it exists
    if (content.publicId) {
      await cloudinary.uploader.destroy(content.publicId, {
        resource_type: content.contentType || "image", // optional but safe
      });
    }

    await content.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Content deleted successfully",
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: err.message });
  }
};

export const getSavedContents = async (req, res) => {
  try {
    const userId = req.user._id; // assuming JWT middleware sets req.user

    const user = await User.findById(userId).populate("savedContents");

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const savedContents = user.savedContents || [];

    res.status(200).json({
      success: true,
      count: savedContents.length,
      contents: savedContents,
      message: "Saved Content fetched Successfully "
    });
  } catch (error) {
    console.error("Error fetching saved contents:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching saved contents",
    });
  }
};

