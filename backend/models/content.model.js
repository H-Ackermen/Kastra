import mongoose from "mongoose";

const engagementSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  views: { type: Number, default: 0 },
  likes: { type: Number, default: 0 },
  saves: { type: Number, default: 0 },
});
const contentSchema=new mongoose.Schema
(
   {
    owner :{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},
    title:{type:String,required:true},
    likecnt:{type:Number,default:0},
    description:{type:String,required:true},
    contentType:{type:String,enum:['video','article','image']},
    publicId : {type:String,required:false,default:null},
    url:{type:String,required:false,default:null},
    likedBy:[{type:mongoose.Schema.Types.ObjectId,ref:'User',default:[]}],
    savedBy:[{type:mongoose.Schema.Types.ObjectId,ref:'User',default:[]}],
   engagementHistory: [engagementSchema],
   views:{type:Number,default:0}
   } 
)
const Content=mongoose.model('Content',contentSchema);
export default Content;