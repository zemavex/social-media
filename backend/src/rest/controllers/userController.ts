import { RequestHandler } from "express";
import {
  userLoginService,
  userRegistrationService,
} from "../services/userService";
import { userSchema } from "../../schemas/userSchema";
import { sessionCreateService } from "../services/sessionService";
import { setSessionCookie } from "../utils/cookieUtils";

const userRegistrationSchema = userSchema.pick({ login: true, password: true });
const userLoginSchema = userSchema.pick({ login: true, password: true });

export const userRegistrationController: RequestHandler = async (
  req,
  res,
  next
) => {
  try {
    const { login, password } = userRegistrationSchema.parse(req.body);

    const user = await userRegistrationService(login, password);

    const session = await sessionCreateService(user.id);
    setSessionCookie(res, session.id);

    res.json({ message: "User created", user });
  } catch (err) {
    next(err);
  }
};

export const userLoginController: RequestHandler = async (req, res, next) => {
  try {
    const { login, password } = userLoginSchema.parse(req.body);

    const user = await userLoginService(login, password);

    const session = await sessionCreateService(user.id);
    setSessionCookie(res, session.id);

    res.json({ message: "Login successfully", user });
  } catch (err) {
    next(err);
  }
};

export const userAuthController: RequestHandler = async (req, res, next) => {
  try {
    if (req.session) {
      res.json({ message: "okay", user: { id: req.session.userId } });
      return;
    }

    res.json({ message: "ok" });
  } catch (err) {
    next(err);
  }
};
