import { Router } from "express";
import {
  userLoginController,
  userRegistrationController,
} from "../controllers/userController";
import { withErrorHandling } from "../middlewares/withErrorHandling";

const userRouter = Router();

userRouter.post("/registration", withErrorHandling(userRegistrationController));
userRouter.post("/login", withErrorHandling(userLoginController));

export { userRouter };
