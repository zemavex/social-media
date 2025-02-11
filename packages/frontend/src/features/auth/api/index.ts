import type { LoginSchema, RegisterSchema, UserAuthDTO } from "~shared/user";
import { apiInstance } from "@/shared/api";

export const apiGithubAuth = async (code: string): Promise<UserAuthDTO> => {
  const res = await apiInstance.post<UserAuthDTO>("/users/oauth/github/auth", {
    code,
  });
  return res.data;
};

export const apiGithubConnect = async (code: string): Promise<UserAuthDTO> => {
  const res = await apiInstance.post<UserAuthDTO>(
    "/users/oauth/github/connect",
    {
      code,
    }
  );
  return res.data;
};

export const apiRegister = async (
  payload: RegisterSchema
): Promise<UserAuthDTO> => {
  const res = await apiInstance.post<UserAuthDTO>("/users/register", payload);
  return res.data;
};

export const apiLogin = async (payload: LoginSchema): Promise<UserAuthDTO> => {
  const res = await apiInstance.post<UserAuthDTO>("/users/login", payload);
  return res.data;
};

export const apiAuthenticate = async (): Promise<UserAuthDTO> => {
  const res = await apiInstance.post<UserAuthDTO>("/users/auth");
  return res.data;
};

export const apiLogout = async () => {
  await apiInstance.post("/users/logout");
  return;
};
