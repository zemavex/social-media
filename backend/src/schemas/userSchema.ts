import { z } from "zod";

export const userSchema = z.object({
  username: z.string().min(4).max(20),
  password: z.string().min(8).max(30),
});
