import Content from "../models/content.model.js";
import  {updateDailyEngagement}  from "../utils/engagement.util.js"

export const updateLikeCnt = async (req, res) => {
  try {
    const { contentId } = req.params;
    const userId = req.user?._id;
    if (!userId) return res.status(401).json({ success: false, message: "Unauthorized" });

    const content = await Content.findById(contentId).select("likedBy likecnt");
    if (!content) return res.status(404).json({ success: false, message: "Content not found" });

    const userIdStr = userId.toString();
    const alreadyLiked = content.likedBy.some((id) => id.toString() === userIdStr);

    const update = alreadyLiked
      ? { $pull: { likedBy: userId }, $inc: { likecnt: -1 } }
      : { $addToSet: { likedBy: userId }, $inc: { likecnt: 1 } };

    const updated = await Content.findByIdAndUpdate(contentId, update, { new: true });

    // ensure likecnt never negative
    if (updated.likecnt < 0) {
      updated.likecnt = 0;
      await updated.save();
    }
    const delta = alreadyLiked ? -1 : 1;
       try {
      await updateDailyEngagement(contentId, { likes: delta });
    } catch (err) {
      console.error("Failed to update engagementHistory for save:", err);
    }
    return res.status(200).json({
      success: true,
      data: {
        likecnt: updated.likecnt,
        liked: !alreadyLiked,
        likedBy: updated.likedBy,
      },
    });
  } catch (error) {
    console.error("Error in updateLikeCnt:", error);
    return res.status(500).json({ success: false, message: "Update Like Count Failed", error: error.message });
  }
};
export const savedContent = async (req, res) => {
  try {
   
    const user = req.user;  //full user document from middleware
    const { contentId } = req.params;
    const userId=user._id;
    const content = await Content.findById(contentId);
    if (!content) {
      console.log("content not found");
      return res.status(404).json({
        success: false,
        message: "Content not found",
      });
    }
    const userIdStr = user._id.toString();
const alreadySaved = content.savedBy.some((id) => id.toString() === userIdStr);


    // Toggle save/unsave on content document
    const update = alreadySaved
      ? { $pull: { savedBy: userId } }
      : { $addToSet: { savedBy: userId } };

    const updated = await Content.findByIdAndUpdate(contentId, update, { new: true });

    // Also toggle in user.savedContents for consistency
    if (alreadySaved) {
      user.savedContents = user.savedContents.filter(
        (id) => id.toString() !== contentId.toString()
      );
    } else {
      user.savedContents.push(contentId);
    }
    await user.save();
    const delta = alreadySaved ? -1 : 1;
       try {
      await updateDailyEngagement(contentId, { saves: delta });
    } catch (err) {
      console.error("Failed to update engagementHistory for save:", err);
    }

    return res.status(200).json({
      success: true,
      data: {
        saved: !alreadySaved,       // true if now saved, false if unsaved
        savedBy: updated.savedBy,   // list of users who saved it
        savedContents: user.savedContents, // optional: return updated user's saved list
      },
    });
  } catch (error) {
    console.error("Error in savedContent controller:", error);
    return res.status(500).json({
      success: false,
      message: "Update Saved Content Failed",
      error: error.message,
    });
  }
};