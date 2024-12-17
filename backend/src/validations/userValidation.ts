import { z } from "zod";

export const userLoginValidation = z.string().min(4).max(20);
export const userPasswordValidation = z.string().min(8).max(30);
export const userEmailValidation = z.string().email();
