import { RequestHandler } from "express";
import {
  userLoginService,
  userRegistrationService,
} from "../services/userService";
import { userSchema } from "../../schemas/userSchema";

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

  res.json({ message: "Login successfully", user });
};
