import { RequestHandler } from "express";
import { userRegistrationService } from "../services/userService";

export const userRegistrationController: RequestHandler = async (req, res) => {
  const user = await userRegistrationService(req.body);

  res.json({ message: "User created", user });
};
