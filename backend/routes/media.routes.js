import {Router} from 'express'
import { updateLikeCnt,savedContent } from '../controllers/media.controller.js'

const mediaroutes=Router();


mediaroutes.route('/media/:contentId/like',updateLikeCnt);
mediaroutes.route('/media/:contentId/saved',savedContent);
export default mediaroutes;