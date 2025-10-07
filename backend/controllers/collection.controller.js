import  Collection  from "../models/collection.model.js";

// Create a new Collection
export const createCollection = async (req,res) => {
    try{
        const {name,description} = req.body; // Destructure form data
        const owner = req.user._id; // take owner id from JWT middleware

        // creating new Collection
        const newCollection = await Collection.create({
            name,description,owner
        })

        // sending response
        res.status(201).json({
            success:true,
            message:"Collection created Successfully",
            collection: newCollection
        })
    }
    catch(error){
        console.error("Error creating collection");
        res.status(500).json({success:false,message: "Server error"})       
    }
} 

// adding content to Collection
export const addContentToCollection = async (req,res) => {
    try{

        const {contentId} = req.body; // destructuring contentId 
        console.log(contentId)
        // Prevent duplicates of Content
        if(req.collection.contents.includes(contentId)){
            return res.status(400).json({success:false,message:"Content already added"})
        }
        
        // pushing contentId into collection.Content array
        req.collection.contents.push(contentId)
        await req.collection.save();

        return res.status(200).json({success:true,message:"Content added successfully", collection:req.collection})
    }
     catch(error){
        console.error("Error adding Content",error)
        res.status(500).json({success:false,message:"Server error"})
     }   
}

// Remove Content from Collection
export const removeContentFromCollection = async (req,res) => {
    try { 
        const {contentId} = req.body; // Destructuring content

    const index = req.collection.contents.indexOf(contentId);
    if (index === -1) {
      return res.status(404).json({
        success: false,
        message: "Content not found in this collection"
      });
    }

    // Remove the content
    req.collection.contents.splice(index, 1);
    await req.collection.save();
        res.status(200).json({success:true,message:"Content removed successfully", collection:req.collection})
    } catch (error) {
        console.error("Error removing content",error);
        res.status(500).json({success:false,message: "Internal Server Error"})
    }
}

// Delete Collection
export const deleteCollection = async (req,res) => {
    try{
       await req.collection.deleteOne();
        res.status(200).json({success:true,message:"Collection deleted successfully"})
    }
    catch(error){
        console.error("Error deleting collection : ",error)
        res.status(500).json({success:false,message: "Internal sServer Error"})
    }
}


// Fetch all collections from owner
export const fetchCollectionByOwner = async (req,res) => {
    try {
        const ownerId = req.user._id
        const collections = await Collection.find({owner:ownerId}).select('name description')
        res.status(200).json({success:true,
            count:collections.length,
            collections
        })
    } catch (error) {
        console.error("Error Fetching Collection by Owner", error);
        res.status(500).json({success:false,message:"Internal Server Error",error:error.message})
    }
}

// Get All Content of the Collection
export const getContentofCollection = async (req,res) => {
    try {
       // req.collection is already verified and fetched by middleware
    await req.collection.populate('contents'); // populate the contents field

    res.status(200).json({
      success: true,
      collection: {
        _id: req.collection._id,
        name: req.collection.name,
        description: req.collection.description,
        contents: req.collection.contents
      }
    });

    } catch (error) {
       res.status(500).json({
      success: false,
      message: "Error fetching collection contents",
      error: err.message
    }); 
    }
}