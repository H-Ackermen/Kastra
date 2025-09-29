import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
const userSchema=new mongoose.Schema(
    {
    name:{type:String,required:true},
    username:{type:String,required:true,unique:true},
    profilePicture:{type:String,required:false},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    savedContents:[{type:mongoose.Schema.Types.ObjectId,ref:'Content'}],
    collections:[{type:mongoose.Schema.Types.ObjectId,ref:'Collection'}],
    }
)
export const User=mongoose.model('User',userSchema);
