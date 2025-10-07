import {Router} from 'express'
import { searchData } from '../controllers/search.controller.js';
const router=Router()

router.route('/').get(searchData);
export default router;