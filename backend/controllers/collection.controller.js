import Collection from "../models/collection.model.js";
import User from "../models/user.model.js";
// Create a new Collection
export const createCollection = async (req, res) => {
  try {
    const { name, description } = req.body; // Destructure form data
    const owner = req.user._id; // take owner id from JWT middleware

    // creating new Collection
    const newCollection = await Collection.create({
      name,
      description,
      owner,
    });

    // sending response
    res.status(201).json({
      success: true,
      message: "Collection created Successfully",
      collection: newCollection,
    });
  } catch (error) {
    console.error("Error creating collection");
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// adding content to Collection
export const addContentToCollection = async (req,res) => {
    try{

        const {contentId} = req.body; // destructuring contentId 
        
        //console.log("req.boyd=",req.body);
       // console.log("content id=",contentId)
        // Prevent duplicates of Content
        let alreadyAdded=false;
        if(req.collection.contents.includes(contentId)){
            alreadyAdded=true;
            return res.status(200).json({success:false,message:"Content already added",
                alreadyAdded
            })
        }
        
        // pushing contentId into collection.Content array
        req.collection.contents.push(contentId)
        await req.collection.save();

        return res.status(200).json({success:true,message:"Content added successfully", collection:req.collection,
            alreadyAdded
        })
    }

    
   catch (error) {
    console.error("Error adding Content", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Remove Content from Collection
export const removeContentFromCollection = async (req, res) => {
  try {
    const { contentId } = req.body; // Destructuring content

    const index = req.collection.contents.indexOf(contentId);
    if (index === -1) {
      return res.status(404).json({
        success: false,
        message: "Content not found in this collection",
      });
    }

    // Remove the content
    req.collection.contents.splice(index, 1);
    await req.collection.save();
    res
      .status(200)
      .json({
        success: true,
        message: "Content removed successfully",
        collection: req.collection,
      });
  } catch (error) {
    console.error("Error removing content", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Delete Collection
export const deleteCollection = async (req, res) => {
  try {
    await req.collection.deleteOne();
    res
      .status(200)
      .json({ success: true, message: "Collection deleted successfully" });
  } catch (error) {
    console.error("Error deleting collection : ", error);
    res.status(500).json({ success: false, message: "Internal sServer Error" });
  }
};

// Fetch all collections from owner
export const fetchCollectionByOwner = async (req, res) => {
  try {
    const ownerId = req.user._id;
    const collections = await Collection.find({ owner: ownerId }).populate([
      { path: "collaborators", select: "-password" },
      { path: "owner", select: "name email" }]
    );
    res
      .status(200)
      .json({ success: true, count: collections.length, collections });
  } catch (error) {
    console.error("Error Fetching Collection by Owner", error);
    res
      .status(500)
      .json({
        success: false,
        message: "Internal Server Error",
        error: error.message,
      });
  }
};

// Get All Content of the Collection
export const getContentofCollection = async (req, res) => {
  try {
    // req.collection is already verified and fetched by middleware
    await req.collection.populate([
      { path: "owner", select: "name email" },{path:"contents"}]); // populate the contents field

    res.status(200).json({
      success: true,
      collection: {
        _id: req.collection._id,
        name: req.collection.name,
        description: req.collection.description,
        contents: req.collection.contents,
        owner:req.collection.owner
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching collection contents",
      error: err.message,
    });
  }
};

// Add Collaborator
export const addCollaborator = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
      if(req.user.email === email){
         return res.status(403).json({
        success: false,
        message: "Already a Owner",
      });
      }
    if (req.collection.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Only Owner can add collaborators",
      });
    }
    if (!req.collection.collaborators.includes(user._id)) {
      req.collection.collaborators.push(user._id);
      await req.collection.save();
      return res
      .status(200)
      .json({
        message: "Collaborator Added",
        success: true,
        alearyExists:false,
        collection: req.collection,
      });
    }
    else{
      return res
      .status(200)
      .json({
        message: "Collaborator Already Exists",
        success: true,
        alreadyExists:true,
        collection: req.collection,
      });
    }
    
  } catch (error) {
    console.log(error);
    
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const fetchCollectionByCollaborators = async (req, res) => {
  try {
    const userId = req.user._id;
    const collections = await Collection.find({
      collaborators: { $in: [userId] },
    }).populate([ { path: "collaborators", select: "-password" },
      { path: "owner", select: "name email" }]);

    res
      .status(200)
      .json({
        success: true,
        message: "Collaborators fetched successfully",
        collections,
      });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const fetchCollaborators = async (req, res) => {
  try {
    const collectionId = req.params.id;
    const collection = await Collection.findById(collectionId).populate(
      "collaborators",
      "-password -__v"
    );

    if (!collection) {
      return res.status(404).json({ message: "Collection not found" });
    }

    res.status(200).json({
      success: true,
      message: "Collaborators fetched successfully",
      collaborators: collection.collaborators,
      total: collection.collaborators.length,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const removeYourselfAsCollaborator = async (req, res) => {
  try {
    const userId = req.user.id;
    if (req.collection.owner.toString() === userId) {
      return res.status(400).json({
        message: "Owner cannot remove themselves from their own collection",
      });
    } else {
      req.collection.collaborators = req.collection.collaborators.filter(
        (collabId) => collabId.toString() !== userId
      );
      await req.collection.save();

      res.status(200).json({
        success: true,
        message: "You have been removed as collaborator from the collection",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const removeCollaborator = async (req,res) => {
    try {
        const {collaboratorId} = req.body;
        
        req.collection.collaborators = req.collection.collaborators.filter(
      (collabId) => collabId.toString() !== collaboratorId
    );

    await req.collection.save();

    res.status(200).json({
      success: true,
      message: "Collaborator removed successfully",
      updatedCollaborators: req.collection.collaborators,
    });
    } catch (error) {
         res.status(500).json({
      success: false,
      message: err.message,
    });
    }
}
