import {Router} from 'express'
import { updateLikeCnt,savedContent } from '../controllers/media.controller.js'
import { verifyUserJWT } from '../middlewares/jwt.middleware.js';
const mediaroutes=Router();


mediaroutes.route('/update/:contentId/like').put(verifyUserJWT,updateLikeCnt);
mediaroutes.route('/update/:contentId/saved').put(verifyUserJWT,savedContent);
export default mediaroutes;