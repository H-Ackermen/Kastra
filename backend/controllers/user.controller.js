import Follow from "../models/follow.model.js";
import User from "../models/user.model.js";
import { v2 as cloudinary } from "cloudinary";
import { uploadOnCloudinary } from "../utils/content.utils.js";

export const followUser = async (req,res) => {
    try {
         const followerId = req.user._id;
    const followingId = req.params.id;

    if (followerId.equals(followingId)) {
      return res
        .status(400)
        .json({ status: true, message: "You cannot follow yourself." });
    }
    const alreadyExists = await Follow.findOne({
      follower: followerId,
      following: followingId,
    });
    if (alreadyExists) {
      return res
        .status(400)
        .json({ success: false, message: "Already Existing" });
    }
    const follow = await Follow.create({
      follower: followerId,
      following: followingId,
    });
    res
      .status(200)
      .json({ success: true, message: "Followed successfully", follow });
  } catch (error) {
    console.log("Error Following ", error);

    return res.status(500).json({ success: false, message: error.message });
  }
};

export const unfollowUser = async (req, res) => {
  try {
    const followerId = req.user._id;
    const followingId = req.params.id;

    if (followerId.equals(followingId)) {
      return res.status(400).json({
        success: false,
        message: "You cannot unfollow yourself.",
      });
    }

    // Check if follow relation exists
    const existingFollow = await Follow.findOne({
      follower: followerId,
      following: followingId,
    });

    if (!existingFollow) {
      return res.status(404).json({
        success: false,
        message: "You are not following this user.",
      });
    }

    // Delete the follow document
    await Follow.deleteOne({ _id: existingFollow._id });

    return res.status(200).json({
      success: true,
      message: "Unfollowed successfully.",
    });
  } catch (error) {
    console.error("Unfollow user error:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const fetchFollowing = async (req, res) => {
  try {
    const followingList = await Follow.find({ follow: req.user._id }).populate(
      "following",
      "name email"
    );

    const following = followingList.map((entry) => entry.whom);
    return res.status(200).json({
      success: true,
      following,
    });
  } catch (error) {
    console.error("Error in FetchFollowing Controller", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const fetchFollowers = async (req,res) => {
    try {
        const followerList = await Follow.find({following:req.user._id}).populate("follower", "name email")
        
        const followers = followerList.map((entry) => entry.whom);
        return res.status(200).json({
        success: true,
        followers,
        });
    } catch (error) {
        console.error("Error in FetchFollowing Controller",error);
        return res.status(500).json({success:false,message:error.message}) 
    }
}
export const editProfile = async (req , res)=>{
    try {
          const user = req.user;
          console.log("-------------------------",req.body,req.file)
          const {name , email , username } = req.body;
          const profilePicture = req.file;
          let result = null;
          if (email && email !== user.email) {
          const checkEmail = await User.findOne({ email });
          if (checkEmail && checkEmail._id.toString() !== user._id.toString()) {
            return res.status(400).json({
              success: false,
              message: "Email Already Exists"
            });
          }
        }
        if (username && username !== user.username) {
          const checkUsername = await User.findOne({ username });
          if (checkUsername && checkUsername._id.toString() !== user._id.toString()) {
            return res.status(400).json({
              success: false,
              message: "Username Already Exists"
            });
          }
        }
        if(profilePicture){
          if(user.publicId){
            try {
              await cloudinary.uploader.destroy(user.publicId);
            } catch (err) {
              console.error("Error deleting old profile photo from Cloudinary:", err);
            }
          }
          user.name = name || user.name;
          user.email = email || user.email;
          user.username = username || user.username;
          //upload on cloudinary 
          result = await uploadOnCloudinary(profilePicture.path);
          
          if (!result) {
            return res.status(500).json({
              success: false,
              message: "Failed to upload profilePhoto on Cloudinary",
            });
          }
          user.profilePicture = result.secure_url;
          user.publicId = result.public_id;
          await user.save();

          return res.status(200).json({
              success : true,
              message : "Profile Updated Successfully ;)",
              user 
          })
        }
        else{
            user.name = name || user.name;
            user.email = email || user.email;
            user.username = username || user.username;
            await user.save();
            return res.status(200).json({
                success : true,
                message : "Profile Updated Successfully ;)",
                user  
            })
        }
    }   
    catch (error) {
        console.error("Error updating profile:", error);
        res.status(500).json({
             message: "Server error" ,
             success : false
        });
    }
};