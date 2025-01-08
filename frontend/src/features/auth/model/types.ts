import { z } from "zod";
import { User } from "entities/user";
import { loginSchema, registerSchema } from "./schemas";

type PartialUser = Pick<User, "id" | "login" | "role">;

export interface AuthResponse {
  message: string;
  user: PartialUser;
}

export type LoginSchema = z.infer<typeof loginSchema>;
export type RegisterSchema = z.infer<typeof registerSchema>;
