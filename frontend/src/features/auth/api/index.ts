import { apiInstance } from "shared/api";
import { AuthResponse, LoginSchema, RegisterSchema } from "../model/types";

export const authenticate = async (): Promise<AuthResponse> => {
  const res = await apiInstance.post<AuthResponse>("/users/auth");
  return res.data;
};

export const oauthGithub = async (payload: {
  code: string;
}): Promise<AuthResponse> => {
  const res = await apiInstance.post<AuthResponse>(
    "/users/oauth/github",
    payload
  );
  return res.data;
};

export const register = async (
  payload: RegisterSchema
): Promise<AuthResponse> => {
  const res = await apiInstance.post<AuthResponse>(
    "/users/registration",
    payload
  );
  return res.data;
};

export const login = async (payload: LoginSchema): Promise<AuthResponse> => {
  const res = await apiInstance.post<AuthResponse>("/users/login", payload);
  return res.data;
};

export const logout = async (): Promise<void> => {
  return apiInstance.post("/users/logout");
};
