export { login, register, authenticate, oauthGithub, logout } from "./api";
export { setupAuthApiInterceptors } from "./api/interceptors";
export { loginSchema, registerSchema } from "./model/schemas";
export type { LoginSchema, RegisterSchema } from "./model/types";
