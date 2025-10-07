import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
    user :{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    description :{
        type : String,
        required : true
    },
    contentId :{
        type : mongoose.Schema.Types.ObjectId,
        ref : "content",
        required : true,
    },
    createdAt :{
        type : Date,
        default : Date.now
    }
})
export default mongoose.model('Comment', commentSchema);