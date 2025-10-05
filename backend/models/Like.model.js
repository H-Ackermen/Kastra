import mongoose from  "mongoose";
const Likschema=new mongoose.Schema
(
   {
    likedBy:{type:mongoose.Schema.Types.ObjectId,
        ref:'User', required:true},
    contentId:{type:mongoose.Schema.Types.ObjectId,
        ref:'Content', required:true}
    }
   
)
 const Like =mongoose.model('Like',Likschema);
export default Like;