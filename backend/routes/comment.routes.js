import express from 'express'; 
import { createCommentController, getCommentController, deleteCommentController } from '../controllers/comment.controller.js';
import { verifyUserJWT } from '../middlewares/jwt.middleware.js';
const commentRouter = express.Router();

// Create a new comment
commentRouter.post("/create-comment" ,verifyUserJWT, createCommentController);
commentRouter.get("/get-comment/:contentId" , getCommentController);
commentRouter.delete('/delete-comment/:commentId' ,verifyUserJWT ,deleteCommentController);
export default commentRouter;