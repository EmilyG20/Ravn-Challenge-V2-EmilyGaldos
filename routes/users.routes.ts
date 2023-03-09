import { Router } from "express";
import * as controller from "../controllers/users.controller";

export const userRouter = Router()

userRouter.route('/signup').post(controller.registerUser)
userRouter.route('/login').get(controller.login)