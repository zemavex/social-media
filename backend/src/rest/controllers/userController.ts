import { RequestHandler } from "express";
import {
  userLoginService,
  userRegistrationService,
} from "../services/userService";
import { userSchema } from "../../schemas/userSchema";
import { sessionCreateService } from "../services/sessionService";

const userRegistrationSchema = userSchema.pick({ login: true, password: true });
const userLoginSchema = userSchema.pick({ login: true, password: true });

export const userRegistrationController: RequestHandler = async (req, res) => {
  const { login, password } = userRegistrationSchema.parse(req.body);

  const user = await userRegistrationService(login, password);

  res.json({ message: "User created", user });
};

export const userLoginController: RequestHandler = async (req, res) => {
  const { login, password } = userLoginSchema.parse(req.body);

  const user = await userLoginService(login, password);

  const session = await sessionCreateService(user.id);

  res.cookie("session_id", session.id, {
    httpOnly: true,
    maxAge: 30 * 24 * 60 * 60 * 1000,
    sameSite: "strict",
  });

  res.json({ message: "Login successfully", user });
};
