import { RequestHandler } from "express";
import { z } from "zod";
import {
  registerSchema,
  loginSchema,
  finishRegistrationSchema,
} from "~shared/user";
import { API_ERROR_CODES } from "~shared/core";
import { Session } from "@/entities/session";
import { User, toUserAuthDTO, toUserProfileDTO } from "@/entities/user";
import { authService } from "@/services/authService";
import { sessionService } from "@/services/sessionService";
import { setSessionCookie } from "@/rest/helpers";
import { SESSION } from "@/entities/session";
import {
  BadRequestError,
  InternalServerError,
  NotFoundError,
  UnauthorizedError,
} from "@/errors";
import { userService } from "@/services/userService";

const githubAuth: RequestHandler = async (req, res, next) => {
  try {
    const { code } = z.object({ code: z.string() }).parse(req.body);

    const user = await authService.githubAuth(code);

    const session = await sessionService.create(user.id);
    setSessionCookie(res, session.id);

    res.json(toUserAuthDTO(user));
  } catch (err) {
    next(err);
  }
};

const githubConnect: RequestHandler = async (req, res, next) => {
  try {
    if (!req.session)
      throw new InternalServerError(API_ERROR_CODES.SESSION_MISSING);
    const { code } = z.object({ code: z.string() }).parse(req.body);

    const user = await authService.githubConnect(req.session.userId, code);

    res.json(toUserAuthDTO(user));
  } catch (err) {
    next(err);
  }
};

const register: RequestHandler = async (req, res, next) => {
  try {
    const userData = registerSchema.parse(req.body);

    const user = await authService.register(userData);

    const session = await sessionService.create(user.id);
    setSessionCookie(res, session.id);

    res.json(toUserAuthDTO(user));
  } catch (err) {
    next(err);
  }
};

const finishRegistration: RequestHandler = async (req, res, next) => {
  try {
    if (!req.session)
      throw new InternalServerError(API_ERROR_CODES.SESSION_MISSING);

    const userData = finishRegistrationSchema.parse(req.body);

    const user = await authService.finishRegistration(
      req.session.userId,
      userData
    );

    res.json(toUserAuthDTO(user));
  } catch (err) {
    next(err);
  }
};

const login: RequestHandler = async (req, res, next) => {
  try {
    const userData = loginSchema.parse(req.body);

    const user = await authService.login(userData);

    const session = await sessionService.create(user.id);
    setSessionCookie(res, session.id);

    res.json(toUserAuthDTO(user));
  } catch (err) {
    next(err);
  }
};

const auth: RequestHandler = async (req, res, next) => {
  try {
    if (!req.session)
      throw new InternalServerError(API_ERROR_CODES.SESSION_MISSING);

    const user = await User.findById(req.session.userId);
    if (!user) throw new UnauthorizedError();

    res.json(toUserAuthDTO(user));
  } catch (err) {
    next(err);
  }
};

const logout: RequestHandler = async (req, res, next) => {
  try {
    if (!req.session)
      throw new InternalServerError(API_ERROR_CODES.SESSION_MISSING);

    res.clearCookie(SESSION.ID_COOKIE_NAME);
    await Session.delete(req.session.id);

    res.json({ message: "Successfully logged out" });
  } catch (err) {
    next(err);
  }
};

const getProfileById: RequestHandler = async (req, res, next) => {
  try {
    if (!req.session)
      throw new InternalServerError(API_ERROR_CODES.SESSION_MISSING);

    const { id } = req.params;

    const parsedId = Number(id);
    if (isNaN(parsedId))
      throw new BadRequestError(API_ERROR_CODES.INVALID_USER_ID);

    const userProfile = await userService.getProfileById(parsedId);

    if (!userProfile) throw new NotFoundError(API_ERROR_CODES.USER_NOT_FOUND);

    res.json(toUserProfileDTO(userProfile));
  } catch (err) {
    next(err);
  }
};

const test: RequestHandler = (req, res, next) => {
  try {
    if (!req.session)
      throw new InternalServerError(API_ERROR_CODES.SESSION_MISSING);

    res.json({ message: "Secret route" });
  } catch (err) {
    next(err);
  }
};

export const userController = {
  githubAuth,
  githubConnect,
  register,
  finishRegistration,
  login,
  auth,
  logout,
  getProfileById,
  test,
};
