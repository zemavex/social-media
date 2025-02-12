import { authMiddleware } from "./authMiddleware";
import { checkRoleMiddleware } from "./checkRoleMiddleware";
import { fakeDelayMiddleware } from "./fakeDelayMiddleware";
import { errorMiddleware } from "./errorMiddleware";
import { checkFinishedRegistrationMiddleware } from "./checkFinishedRegistrationMiddleware";

export const middleware = {
  auth: authMiddleware,
  checkRole: checkRoleMiddleware,
  fakeDelay: fakeDelayMiddleware,
  error: errorMiddleware,
  checkFinishedRegistration: checkFinishedRegistrationMiddleware,
};
