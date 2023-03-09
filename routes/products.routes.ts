import { Router } from "express";
import * as controller from "../controllers/products.controller";
import { validateTokenManager, validateTokenClient } from "../utils/validate";

export const productRouter = Router()

productRouter.route('/products').post(validateTokenManager,controller.createProduct).get(controller.getProducts)

productRouter.route('/products/:id').put(validateTokenManager,controller.updateProduct).delete(validateTokenManager, controller.deleteProduct).get(controller.getProductById)

productRouter.route('/toggle-products/:id').post(validateTokenManager,controller.toggleProduct)
