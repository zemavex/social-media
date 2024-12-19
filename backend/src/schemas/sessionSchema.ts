import { z } from "zod";

export const sessionSchema = z.object({
  id: z.string(),
  user_id: z.number(),
  created_at: z.string(),
  last_online: z.string(),
  expires_at: z.string(),
});

export type SessionSchema = z.infer<typeof sessionSchema>;
