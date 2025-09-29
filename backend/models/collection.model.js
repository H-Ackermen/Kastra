import mongoose from "mongoose";
const collectionSchema=new mongoose.Schema(
    {
    owner :{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},
    name:{type:String,required:true},
    description:{type:String,required:true},
    contents:[{type:mongoose.Schema.Types.ObjectId,ref:'Content'}]
    }
)
export const Collection=mongoose.model('Collection',collectionSchema);