import { z } from "zod";

export const userSchema = z.object({
  id: z.number(),
  login: z.string().min(4).max(20),
  password: z.string().min(8).max(30),
  email: z.string().email(),
});

export type UserSchema = z.infer<typeof userSchema>;
