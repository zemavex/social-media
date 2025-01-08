import { z } from "zod";

const login = z.string().min(4).max(20);
const password = z.string().min(8).max(30);

export const loginSchema = z.object({
  login,
  password,
});

export const registerSchema = z.object({
  login,
  password,
});
