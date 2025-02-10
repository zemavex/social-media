import { z } from "zod";

const normalizeString = (value: string): string | undefined => {
  const trimmed = value.trim().replace(/\s+/g, " ");
  return trimmed.length === 0 ? undefined : trimmed;
};

const email = z.string().email().max(100);
const password = z.string().min(8).max(30);

const anyName = z.string().min(1).max(30);

export const registerSchema = z.object({
  email,
  password,
  firstName: z.string().transform(normalizeString).pipe(anyName),
  lastName: z
    .string()
    .transform(normalizeString)
    .pipe(anyName.optional())
    .optional(),
});

export const loginSchema = z.object({
  email,
  password,
});

export type RegisterSchema = z.infer<typeof registerSchema>;
export type LoginSchema = z.infer<typeof loginSchema>;
