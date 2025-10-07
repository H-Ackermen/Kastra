import  Category from "../models/category.model.js"

export const addToCategory = async (contentId, name) => {
  try {
    // finds category with name and add contentID to it, if not found then creates one
    const category = await Category.findOneAndUpdate(
      { name }, // match category name
      { $addToSet: { contents: contentId } }, // add unique ObjectId
      { upsert: true, new: true } // create if not exist, return updated doc
    );
    console.log(category)
    return category
  } catch (error) {
    throw new Error("Failed to add content to category: " + error.message);
  }
};
