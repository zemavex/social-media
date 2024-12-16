import { Router } from "express";
import { userRegistrationController } from "../controllers/userController";
import { withErrorHandling } from "../middlewares/withErrorHandling";

const userRouter = Router();

userRouter.post("/registration", withErrorHandling(userRegistrationController));

export { userRouter };
