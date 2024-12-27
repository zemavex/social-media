import { RequestHandler } from "express";
import { userSchema } from "@/schemas/userSchema";
import { sessionCreateService } from "../services/sessionService";
import { setSessionCookie } from "../utils/cookieUtils";
import {
  userRegistrationService,
  userLoginService,
} from "../services/userService";
import { AuthError } from "@/errors/customErrors";
import { dbSessionDelete } from "@/database/queries/sessionQueries";
import { SESSION_ID_COOKIE_NAME } from "../config/constants";
import { dbUserFindById } from "@/database/queries/userQueries";
import { UserAuthResponse } from "../types/responseTypes";

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
    if (!req.session) throw AuthError;

    const user = await dbUserFindById(req.session.userId);
    if (!user) throw AuthError;

    const response: UserAuthResponse = {
      message: "Successfully authenticated",
      user: {
        id: user.id,
        login: user.login,
        role: user.role,
      },
    };

    res.json(response);
  } catch (err) {
    next(err);
  }
};

export const userLogoutController: RequestHandler = async (req, res, next) => {
  try {
    if (!req.session) throw AuthError;

    res.clearCookie(SESSION_ID_COOKIE_NAME);
    await dbSessionDelete(req.session.id);

    res.json({ message: "Successfully logged out" });
  } catch (err) {
    next(err);
  }
};

export const userTestController: RequestHandler = async (req, res, next) => {
  try {
    if (!req.session) throw AuthError;

    res.json({ message: "Secret route" });
  } catch (err) {
    next(err);
  }
};
