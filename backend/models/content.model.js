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
    //if value is article then no need of url use the content.content
    url:{type:String,required:false},
    content:{type:String},
    
   } 
)
export const Content=mongoose.model('Content',contentSchema);