import { z } from "zod";

const email = z.string().email();
const password = z.string().min(8).max(30);

export const registrationSchema = z.object({
  email,
  password,
});

export const loginSchema = z.object({
  email,
  password,
});
