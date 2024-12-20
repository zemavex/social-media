import { Router } from "express";
import {
  userRegistrationController,
  userLoginController,
  userAuthController,
  userLogoutController,
  userTestController,
} from "../controllers/userController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { checkRoleMiddleware } from "../middlewares/checkRoleMiddleware";

const userRouter = Router();

userRouter.post("/registration", userRegistrationController);
userRouter.post("/login", userLoginController);
userRouter.post("/auth", authMiddleware, userAuthController);
userRouter.post("/logout", authMiddleware, userLogoutController);
userRouter.get(
  "/test",
  authMiddleware,
  checkRoleMiddleware("admin"),
  userTestController
);

export { userRouter };
