import Like from "../models/Like.model.js";
import Content from "../models/content.model.js"
export const updateLikeCnt= async (req,res)=>
{
    try {
        const {contentId}=req.params;
        const {userId}=req.body;
        const content=await Content.findById(contentId);
        //chec if user has already liked
        const existingLike=await Like.findOne({contentId,userId});
        if(existingLike)
        {
            //it is a unlike request
            // so decrease the like count from content model
            
            await Like.deleteOne({contentId,userId});
            
            content.likecnt--;
            await content.save();
        }
        else
        {
            //it is a like request
            // so create a new like document
            const newLike = new Like({contentId,userId});
            content.likecnt++;
            await content.save();
            await newLike.save();
        }
    } catch (error) {
        console.log(error);
    return res.status(500).json({
      success: false,
      message: "Update Like Count Failed",
      error: error.message,
    });
        
    }
}
export const getLikeStatus=async (req,res)=>
{
    try {
        const {contentId}=req.params;
        const {userId}=req.body;
        const existingLike=await Like.findOne({contentId,userId});
        if(existingLike)
        {                       
            return res.status(200).json({
                success: true,
                liked: true,
            });
        }
        return res.status(200).json({
            success: true,
            liked: false,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Get Like Status Failed",
            error: error.message,
        });
    }
}
