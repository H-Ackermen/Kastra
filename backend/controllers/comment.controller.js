import express from 'express';
import Comment from '../models/comment.model.js';

const router = express.Router();

// add new comment
export const createCommentController = async(req , res)=>{
    try{
        const {contentId,description} = req.body;

        const newComment = new Comment({
            user : req.user._id,
            contentId,
            description
        })
        await newComment.save();
        res.status(201).json({
            success : true,
            message : "Comment Added"
        })
    }
    catch(error){
        res.status(500).json({
            success : false,
            message : "comment not added ",
            error:error.message

        })
    }
};
// get all comment on a post

export const getCommentController = async(req , res)=>{
    try{
        const comments = await Comment.find({contentId : req.params.contentId}).populate("user" , "username").sort({createdAt : -1});
        res.status(201).json({
            success : true,
            message : "comment fetched successfully",
            comments,
        })
    }   
    catch(err){
        res.status(500).json({
            success : false,
            message : "comment fetching failed",
        })
    }
};

// delete comment 

export const deleteCommentController = async(req , res)=>{
    try{
        const comment = await Comment.findById(req.params.commentId);
        if(!comment) {
            return res.status(404).json({
                success : false,
                message : "comment does not exist"
            })
        }
        if(comment.user.toString() !== req.user._id){
            return res.status(403).json({
                success : false,
                message : "Not a authorized user to delete comment"
            })
        }
        await Comment.findByIdAndDelete(req.params.commentId);
        res.status(200).json({
            success : true,
            message : "comment successfully deleted"
        })
    }
    catch(error){
        res.status(500).json({
            success : false,
            message : "error deleting comment"
        })
    }
};
