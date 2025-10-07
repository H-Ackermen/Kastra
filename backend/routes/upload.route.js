import {Router} from 'express';
import { verifyUserJWT } from '../middlewares/jwt.middleware.js';
import { upload } from '../middlewares/multer.middleware.js';
import { uploadAndCreateContent,fetchContentById,fetchAllContents,fetchContentsByUser } from '../controllers/content.controller.js';

const uploadRoutes = Router();

uploadRoutes.post('/upload', verifyUserJWT, upload.single('file'), uploadAndCreateContent);
uploadRoutes.get('/get-content' ,  fetchAllContents);
uploadRoutes.get('/get-content/:id' ,  fetchContentById);
uploadRoutes.get('/get-content-user' ,verifyUserJWT,  fetchContentsByUser);
export default uploadRoutes;