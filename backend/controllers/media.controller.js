import Content from "../models/content.model.js";
export const updateLikeCnt = async (req, res) => {
  try {
    const { contentId } = req.params;
    if (!contentId)
    {
      console.log("content id is not present in updateLike controller ");
    }
    const { userId } = req.body;
    if (!userId)
    {
      console.log("user id is not coming in updatelike controller");
    }
    const content = await Content.findById(contentId);
    //check if user has already liked
  
    if (content.likedBy.includes(userId)) {
      //it is a unlike request
      // so decrease the like count from content model

      content.likedBy = content.likedBy.filter(
        (id) => id.toString() !== userId.toString()
      );
      content.likecnt--;
    } else {
      //it is a like request
      // so create a new like document
      content.likecnt++;
      content.push(userId)
    }
    const res = await content.save();
    if (res)
    {
      console.log("like count updated successfully");
      return res.status(200).json({
        success: true,
      });
    } else {
      console.log(
        "like not updated in content model in database in updatelike controller"
      );
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Update Like Count Failed",
      error: error.message,
    });
  }
};
export const savedContent = async (req, res) => {
  try {
    const { title, description, userId } = req.body;
    if (!title || !description || !userId) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    const contentid=req.params
    const content=Content.findById(contentid);
    if(content.savedBy.includes(userId))
    {
        //unsave request user id already present hence remove it
        content.savedBy=content.savedBy.filter((id)=>id.toString()!==userId.toString());
    }
    else
    {
        content.savedBy.push(userId);
    }
    const res=await content.save();
    if(res)
    {
        console.log("content saved successfully");
        return res.status(200).json(
            {
                success:true,
                message:"Content saved successfully"
            }
        )
    }
    else
    {
        console.log("content not saved in database");
    }
   
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Content saving failed",
      error: error.message,
    });
  }
};
