import { RequestHandler } from "express";
import { z } from "zod";
import { Session } from "entities/session";
import { User, loginSchema, registrationSchema } from "entities/user";
import { authService } from "services/authService";
import { sessionService } from "services/sessionService";
import { setSessionCookie } from "rest/helpers";
import { SESSION_ID_COOKIE_NAME } from "config/constants";
import { AuthError } from "errors";

const githubOAuth: RequestHandler = async (req, res, next) => {
  try {
    const code = z.string().parse(req.body.code);

    const userInfo = await authService.githubOAuth(code);

    const foundUser = await User.findByGithubId(userInfo.id);
    if (foundUser) console.log(foundUser);

    // const user = await userLoginService(login, password);
    // const session = await sessionCreateService(user.id);
    // setSessionCookie(res, session.id);

    res.json({ message: "github oauth test" });
  } catch (err) {
    next(err);
  }
};

const register: RequestHandler = async (req, res, next) => {
  try {
    const { email, password } = registrationSchema.parse(req.body);

    const user = await authService.register(email, password);

    const session = await sessionService.create(user.id);
    setSessionCookie(res, session.id);

    res.json({ message: "User created", user });
  } catch (err) {
    next(err);
  }
};

const login: RequestHandler = async (req, res, next) => {
  try {
    const { email, password } = loginSchema.parse(req.body);

    const user = await authService.login(email, password);

    const session = await sessionService.create(user.id);
    setSessionCookie(res, session.id);

    res.json({ message: "Login successfully", user });
  } catch (err) {
    next(err);
  }
};

const auth: RequestHandler = async (req, res, next) => {
  try {
    if (!req.session) throw AuthError;

    const user = await User.findById(req.session.userId);
    if (!user) throw AuthError;

    const response = {
      message: "Successfully authenticated",
      user: {
        id: user.id,
        role: user.role,
      },
    };

    res.json(response);
  } catch (err) {
    next(err);
  }
};

const logout: RequestHandler = async (req, res, next) => {
  try {
    if (!req.session) throw AuthError;

    res.clearCookie(SESSION_ID_COOKIE_NAME);
    await Session.delete(req.session.id);

    res.json({ message: "Successfully logged out" });
  } catch (err) {
    next(err);
  }
};

const test: RequestHandler = async (req, res, next) => {
  try {
    if (!req.session) throw AuthError;

    res.json({ message: "Secret route" });
  } catch (err) {
    next(err);
  }
};

export const userController = {
  githubOAuth,
  register,
  login,
  auth,
  logout,
  test,
};
