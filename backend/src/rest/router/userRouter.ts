import { Router } from "express";
import {
  userRegistrationController,
  userLoginController,
  userAuthController,
  userLogoutController,
} from "../controllers/userController";
import { authMiddleware } from "../middlewares/authMiddleware";

const userRouter = Router();

userRouter.post("/registration", userRegistrationController);
userRouter.post("/login", userLoginController);
userRouter.post("/auth", authMiddleware, userAuthController);
userRouter.post("/logout", authMiddleware, userLogoutController);

export { userRouter };
