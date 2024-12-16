import { RequestHandler } from "express";
import { userSchema } from "../../schemas/userSchema";

export const userRegistrationController: RequestHandler = async (req, res) => {
  const data = userSchema.parse(req.body);

  res.json({ message: "User successfully created", data });
};
