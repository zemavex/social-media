import { apiInstance } from "shared/api";
import { AuthResponse } from "../model/types";

export const authenticate = async (): Promise<AuthResponse> => {
  const res = await apiInstance.post<AuthResponse>("/users/auth");
  return res.data;
};

export const login = async (
  login: string,
  password: string
): Promise<AuthResponse> => {
  const res = await apiInstance.post<AuthResponse>("/users/login", {
    login,
    password,
  });
  return res.data;
};
