import Content from "../models/content.model.js";
import { uploadOnCloudinary } from "../utils/content.utils.js";
import { addToCategory } from "../utils/category.utils.js";
export const uploadAndCreateContent = async (req, res) => {
  console.log("Running uploadAndCreateContents");

  const file = req.file;
  console.log(req.body);
  const { title, description, category } = req.body;

  const owner = req.user._id;

  if (!file) {
    return res.status(400).json({
      success: false,
      message: "No file uploaded",
    });
  }
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
  const result = await uploadOnCloudinary(file.path);
  if (!result) {
    return res.status(500).json({
      success: false,
      message: "Failed to upload file to Cloudinary",
    });
  }

  // Save content in DB
  try {
    const newContent = new Content({
      owner,
      title,
      description,
      url: result.secure_url,
      // saare types ke liye
      contentType: result.resource_type,
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
    const deletedContent = await Content.findByIdAndDelete(req.params.id);
    if (!deletedContent) {
      return res
        .status(404)
        .json({ success: false, message: "Content not found" });
    }
    res.json({ success: true, message: "Content deleted successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: err.message });
  }
};
