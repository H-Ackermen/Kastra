import {Router} from 'express';
import { verifyUserJWT } from '../middlewares/JWTAuth.js';
import { upload } from '../middlewares/multer.middleware.js';
import { uploadAndCreateContent } from '../controllers/content.controller.js';

const uploadRoutes = Router();

uploadRoutes.post('/upload', verifyUserJWT, upload.single('file'), uploadAndCreateContent);

export default uploadRoutes;