import { z } from "zod";

const email = z.string().email();
const password = z.string().min(8).max(30);

export const loginSchema = z.object({
  email,
  password,
});

export const registerSchema = z.object({
  email,
  password,
});

export type LoginSchema = z.infer<typeof loginSchema>;
export type RegisterSchema = z.infer<typeof registerSchema>;
