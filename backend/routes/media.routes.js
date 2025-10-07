import {Router} from 'express'
import { updateLikeCnt,savedContent } from '../controllers/media.controller.js'
import { verifyUserJWT } from '../middlewares/jwt.middleware.js';
const mediaroutes=Router();


mediaroutes.route('/update/:contentId/like').post(verifyUserJWT,updateLikeCnt);
mediaroutes.route('/update/:contentId/saved').post(verifyUserJWT,savedContent);
export default mediaroutes;