import { useState } from "react";
import { isAxiosError } from "axios";
import { apiRegister } from "features/auth";
import { authenticateUser } from "entities/user";
import { useAppDispatch } from "shared/lib";

interface RegisterErrors {
  general?: string;
  email?: string;
  password?: string;
}

interface RegisterAxiosErrorData {
  message: string;
  details?: {
    path: ["email" | "password"];
    message: string;
  }[];
}

export const useRegister = () => {
  const [registerData, setRegisterData] = useState({ email: "", password: "" });
  const [isPending, setIsPending] = useState(false);
  const [errors, setErrors] = useState<RegisterErrors | null>(null);
  const dispatch = useAppDispatch();

  const register = async () => {
    if (isPending) return;
    setIsPending(true);
    setErrors(null);

    try {
      const userData = await apiRegister(registerData);

      dispatch(authenticateUser(userData));
    } catch (err) {
      console.error(err);

      if (!isAxiosError(err) || !err.response) {
        setErrors({ general: "Unknown error occured" });
        return;
      }

      const error = err.response.data as RegisterAxiosErrorData;

      if (!error.details) {
        setErrors({ general: error.message });
        return;
      }

      const newErrors: RegisterErrors = {};
      error.details.forEach((e) => {
        newErrors[e.path[0]] = e.message;
      });
      setErrors(newErrors);
    } finally {
      setIsPending(false);
    }
  };

  return {
    registerData,
    setRegisterData,
    isPending,
    errors,
    register,
  };
};
