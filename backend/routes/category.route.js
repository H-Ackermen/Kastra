import { Router } from "express";
import { AllCategory } from "../controllers/category.controller.js";

 const CategoryRouter=Router();
CategoryRouter.route('/all-category').get(AllCategory);
export default CategoryRouter