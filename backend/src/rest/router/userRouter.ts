import { Router } from "express";
import { userController } from "rest/controllers/userController";
import { middleware } from "rest/middlewares";

const userRouter = Router();

userRouter.post("/oauth/github", userController.githubOAuth);
userRouter.post("/register", userController.register);
userRouter.post("/login", userController.login);
userRouter.post("/auth", middleware.auth, userController.auth);
userRouter.post("/logout", middleware.auth, userController.logout);

userRouter.get(
  "/test",
  middleware.auth,
  middleware.checkRole("admin"),
  userController.test
);

export { userRouter };
