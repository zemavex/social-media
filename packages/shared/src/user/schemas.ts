import { z } from "zod";

const collapseWhitespace = (str: string) => str.trim().replace(/\s+/g, " ");
const emptyStringToNull = (str: string) => (str.trim() === "" ? null : str);
const normalizeString = (value: string): string | null => {
  const trimmed = collapseWhitespace(value);
  return emptyStringToNull(trimmed);
};

const anyName = z.string().min(1).max(30);

const email = z.string().email().max(100);
const password = z.string().min(8).max(30);
const registerFirstName = z.string().transform(normalizeString).pipe(anyName);
const registerLastName = z
  .string()
  .transform(normalizeString)
  .pipe(anyName.nullish())
  .nullish();

export const registerSchema = z.object({
  email,
  password,
  firstName: registerFirstName,
  lastName: registerLastName,
});

export const finishRegistrationSchema = z.object({
  firstName: registerFirstName,
  lastName: registerLastName,
});

export const loginSchema = z.object({
  email,
  password,
});

export const updateProfileSchema = z.object({
  firstName: z
    .string()
    .transform(normalizeString)
    .pipe(anyName.optional())
    .optional(),
  lastName: z
    .string()
    .transform(normalizeString)
    .pipe(anyName.nullish())
    .nullish(),
});

export type RegisterSchema = z.infer<typeof registerSchema>;
export type FinishRegistrationSchema = z.infer<typeof finishRegistrationSchema>;
export type LoginSchema = z.infer<typeof loginSchema>;
export type UpdateProfileSchema = z.infer<typeof updateProfileSchema>;
