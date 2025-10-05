import mongoose from "mongoose";
const contentSchema=new mongoose.Schema
(
   {
    owner :{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},
    title:{type:String,required:true},
    likecnt:{type:Number,default:0},
    discription:{type:String,required:true},
    contentType:{type:Enumerator,values:['video','article','image'],
    required:true},
    url:{type:String,required:false},
    likedBy:[{type:mongoose.Schema.Types.ObjectId,ref:'User'}],
    savedBy:[{type:mongoose.Schema.Types.ObjectId,ref:'User'}]

   } 
)
const Content=mongoose.model('Content',contentSchema);
export default Content;