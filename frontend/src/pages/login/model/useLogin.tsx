import { useState } from "react";
import { isAxiosError } from "axios";
import { login as loginRequest } from "features/auth";
import { setIsAuthenticated, setUser } from "entities/user";
import { useAppDispatch } from "shared/lib";

interface LoginErrors {
  general?: string;
  login?: string;
  password?: string;
}

interface LoginAxiosErrorData {
  message: string;
  details?: {
    path: ["login" | "password"];
    message: string;
  }[];
}

export const useLogin = () => {
  const [credentials, setCredentials] = useState({ login: "", password: "" });
  const [isPending, setIsPending] = useState(false);
  const [errors, setErrors] = useState<LoginErrors | null>(null);
  const dispatch = useAppDispatch();

  const login = async () => {
    if (isPending) return;
    setIsPending(true);
    setErrors(null);

    try {
      const res = await loginRequest(credentials);

      dispatch(setUser(res.user));
      dispatch(setIsAuthenticated(true));
    } catch (err) {
      console.error(err);

      if (!isAxiosError(err) || !err.response) {
        setErrors({ general: "Unknown error occured" });
        return;
      }

      const error = err.response.data as LoginAxiosErrorData;

      if (!error.details) {
        setErrors({ general: error.message });
        return;
      }

      const newErrors: LoginErrors = {};
      error.details.forEach((e) => {
        newErrors[e.path[0]] = e.message;
      });
      setErrors(newErrors);
    } finally {
      setIsPending(false);
    }
  };

  return {
    credentials,
    setCredentials,
    isPending,
    errors,
    login,
  };
};
