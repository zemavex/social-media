import { useState } from "react";
import { isAxiosError } from "axios";
import { ZodIssue } from "zod";
import { login as loginRequest, loginSchema, LoginSchema } from "features/auth";
import { setIsAuthenticated, setUser } from "entities/user";
import { useAppDispatch } from "shared/lib";

interface LoginErrors {
  general?: string;
  login?: string;
  password?: string;
}

interface LoginAxiosErrorData {
  message: string;
  details?: ZodIssue[];
}

export const useLogin = () => {
  const [credentials, setCredentials] = useState<LoginSchema>({
    login: "",
    password: "",
  });
  const [isPending, setIsPending] = useState(false);
  const [errors, setErrors] = useState<LoginErrors | null>(null);
  const dispatch = useAppDispatch();

  const setValidationErrors = (details: ZodIssue[]) => {
    const newErrors: LoginErrors = {};

    details.forEach((e) => {
      const path = e.path[0] as keyof LoginSchema;
      newErrors[path] = e.message;
    });

    setErrors((prev) => ({ ...prev, ...newErrors }));
  };

  const validateCredentials = (): boolean => {
    const result = loginSchema.safeParse(credentials);

    if (!result.success) {
      setValidationErrors(result.error.issues);
    }

    return result.success;
  };

  const login = async () => {
    if (isPending) return;
    setIsPending(true);
    setErrors(null);

    const isCredentialsValid = validateCredentials();
    if (!isCredentialsValid) {
      setIsPending(false);
      return;
    }

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

      setValidationErrors(error.details);
    } finally {
      setIsPending(false);
    }
  };

  return {
    credentials,
    setCredentials,
    validateCredentials,
    isPending,
    errors,
    login,
  };
};
