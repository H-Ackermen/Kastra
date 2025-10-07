import Content from "../models/content.model.js"; 
import   Category  from "../models/category.model.js"


export const searchData = async (req, res) => {
  try {
        const { title, type, category, username } = req.query;
        let searchResult=[];
        if(type)
        {
            searchResult=await Content.find({contentType: { $regex: type, $options: "im" },});
        }
        else if(category)
        {
             const categoryDoc = await Category.findOne({
        name: { $regex: category, $options: "i" },
      }).populate("contents"); 

      searchResult = categoryDoc ? categoryDoc.contents : [];
        }
        else 
        {
          //search by title 
            searchResult=await Content.find({title:{$regex:title,$options:"im"}});
        }
       
    res.status(200).json({
      success:true,
      message:"Contents Searched Succefully",
      contents:searchResult});
  } catch (error) {
    console.error("Search error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
