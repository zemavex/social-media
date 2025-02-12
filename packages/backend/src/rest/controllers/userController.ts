import { RequestHandler } from "express";
import { z } from "zod";
import { registerSchema, loginSchema } from "~shared/user";
import { Session } from "@/entities/session";
import { User, toUserAuthDTO } from "@/entities/user";
import { authService } from "@/services/authService";
import { sessionService } from "@/services/sessionService";
import { setSessionCookie } from "@/rest/helpers";
import { SESSION_ID_COOKIE_NAME } from "@/config/constants";
import { InternalServerError, UnauthorizedError } from "@/errors";
import { API_ERROR_CODES } from "~shared/core";

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

    res.clearCookie(SESSION_ID_COOKIE_NAME);
    await Session.delete(req.session.id);

    res.json({ message: "Successfully logged out" });
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
  login,
  auth,
  logout,
  test,
};
