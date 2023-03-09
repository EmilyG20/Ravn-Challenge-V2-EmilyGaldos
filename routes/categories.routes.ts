import { Router } from "express";
import * as controller from '../controllers/categories.controller'
import { validateTokenManager, validateTokenClient } from "../utils/validate";

export const categoryRouter = Router()
categoryRouter.route('/categories').post(validateTokenManager,controller.createCategory).get(controller.listCategories)
categoryRouter.route('/categories/:id').get(controller.listCategoryById).put(validateTokenManager,controller.updateCategory).delete(validateTokenManager,controller.deleteCategory)