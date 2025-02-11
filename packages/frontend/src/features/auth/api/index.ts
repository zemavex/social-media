import type { LoginSchema, RegisterSchema } from "~shared/user";
import type { User } from "@/entities/user";
import { apiInstance } from "@/shared/api";

export const apiGithubAuth = async (code: string): Promise<User> => {
  const res = await apiInstance.post<User>("/users/oauth/github/auth", {
    code,
  });
  return res.data;
};

export const apiGithubConnect = async (code: string): Promise<User> => {
  const res = await apiInstance.post<User>("/users/oauth/github/connect", {
    code,
  });
  return res.data;
};

export const apiRegister = async (payload: RegisterSchema): Promise<User> => {
  const res = await apiInstance.post<User>("/users/register", payload);
  return res.data;
};

export const apiLogin = async (payload: LoginSchema): Promise<User> => {
  const res = await apiInstance.post<User>("/users/login", payload);
  return res.data;
};

export const apiAuthenticate = async (): Promise<User> => {
  const res = await apiInstance.post<User>("/users/auth");
  return res.data;
};

export const apiLogout = async () => {
  await apiInstance.post("/users/logout");
  return;
};
