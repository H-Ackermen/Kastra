import  Collection  from "../models/collection.model.js";


export const checkCollectionAccess = async (req, res, next) => {
  try {
    const userId = req.user._id; 
    const { id } = req.params;

    const collection = await Collection.findById(id);

    if (!collection) return res.status(404).json({success:false, message: "Collection not found" });

    const isAuthorized =
      collection.owner.toString() === userId.toString() ||
      collection.collaborators.some(
        (id) => id.toString() === userId.toString()
      );

    if (!isAuthorized)
      return res.status(403).json({ message: "Access denied" });

    req.collection = collection;
    next();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const verifyCollectionOwner = async (req,res,next) => {
    try{
        const {id} = req.params;
        const collection = await Collection.findById(id);
        if(!collection) return res.status(404).json({message:"Not found"});
        console.log(collection);
        console.log(req.user._id)
        if(collection.owner.toString() !== req.user._id.toString() ){
            return res.status(403).json({message: "Unauthorized"})
        }
        req.collection = collection;
        next();
    }
     catch(error){
        return res.status(401).json({success:false, message:error.message})
    }
}