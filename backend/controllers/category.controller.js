import Category from "../models/category.model.js";
export const AllCategory=async (req,res)=>
    {
        try {
            const allCategories=await Category.find({});
        if(allCategories)
        {
             return res.status(200).json({
      success: true,
      message: "All acategories Fetched Successfully",
      allCategories
    });
        }
         return res.status(400);
            
        } catch (error) {
            console.error("catch block in all category controller",error);
            
        }
    } 