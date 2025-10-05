import mongoose from "mongoose";
const contentSchema=new mongoose.Schema
(
   {
    owner :{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},
    title:{type:String,required:true},
    likecnt:{type:Number,default:0},
    description:{type:String,required:true},
    contentType:{type:String,enum:['video','article','image']},
    url:{type:String,required:false},
    likedBy:[{type:mongoose.Schema.Types.ObjectId,ref:'User'}],
    savedBy:[{type:mongoose.Schema.Types.ObjectId,ref:'User'}]

   } 
)
const Content=mongoose.model('Content',contentSchema);
export default Content;