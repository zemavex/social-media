import { Router } from "express";
import { userController } from "@/rest/controllers/userController";
import { middleware } from "@/rest/middlewares";

const userRouter = Router();

userRouter.post("/oauth/github/auth", userController.githubAuth);
userRouter.post(
  "/oauth/github/connect",
  middleware.auth,
  userController.githubConnect
);
userRouter.post("/register", userController.register);
userRouter.post("/login", userController.login);
userRouter.post("/auth", middleware.auth, userController.auth);
userRouter.post("/logout", middleware.auth, userController.logout);

userRouter.get(
  "/test",
  middleware.auth,
  middleware.checkFinishedRegistration,
  middleware.checkRole("admin"),
  userController.test
);

export { userRouter };
