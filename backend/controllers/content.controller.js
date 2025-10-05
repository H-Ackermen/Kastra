import Content from "../models/content.model.js"; 
import { uploadOnCloudinary } from "./upload.cloudinary.js";

export const uploadAndCreateContent = async (req, res) => {
    console.log("Running uploadAndCreateContents");
    
    const file = req.file;
    const { title, description } = req.body;
    const owner = req.user._id;

    if (!file) {
        return res.status(400).json({
            success: false,
            message: "No file uploaded"
        });
    }
    if (file.mimetype.startsWith('image/') && file.size > 10 * 1024 * 1024) {
        return res.status(400).json({
            success: false,
            message: "Image size should be less than 10MB"
        });
    }
    if (file.mimetype.startsWith("video/") && file.size > 100 * 1024 * 1024) {
        return res.status(400).json({
            success: false,
            message: "Video size should be less than 100MB"
        });
    }
    if (!title || !description) {
        return res.status(400).json({
            success: false,
            message: "Title and description are required"
        });
    }

    // Upload to Cloudinary
    const result = await uploadOnCloudinary(file.path);
    if (!result) {
        return res.status(500).json({
            success: false,
            message: "Failed to upload file to Cloudinary"
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
            contentType: result.resource_type
        });
        await newContent.save();
        return res.status(201).json({
            success: true,
            message: "Content created successfully",
            data: newContent
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error occurred while creating content",
        });
    }
};