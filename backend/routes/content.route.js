import {Router} from 'express';
import { verifyUserJWT } from '../middlewares/jwt.middleware.js';
import { upload } from '../middlewares/multer.middleware.js';
import { uploadAndCreateContent,fetchContentById,fetchAllContents,fetchContentsByUser } from '../controllers/content.controller.js';

const contentRoutes = Router();

contentRoutes.post('/upload', verifyUserJWT, upload.single('file'), uploadAndCreateContent);
contentRoutes.get('/get-content' ,  fetchAllContents);
contentRoutes.get('/get-content/:id' ,  fetchContentById);
contentRoutes.get('/get-content-user' ,verifyUserJWT,  fetchContentsByUser);
export default contentRoutes;