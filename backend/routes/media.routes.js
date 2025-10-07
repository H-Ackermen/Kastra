import {Router} from 'express'
import { updateLikeCnt,savedContent } from '../controllers/media.controller.js'

const mediaroutes=Router();


mediaroutes.route('/update/:contentId/like').post(updateLikeCnt);
mediaroutes.route('/update/:contentId/saved').post(savedContent);
export default mediaroutes;