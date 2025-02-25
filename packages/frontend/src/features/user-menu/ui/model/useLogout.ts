import { useState } from "react";
import { apiLogout } from "@/features/auth";
import { unauthenticateUser } from "@/entities/user";
import { useAppDispatch } from "@/shared/lib/redux";

export const useLogout = () => {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const dispatch = useAppDispatch();

  const logout = async (onLogout: () => void) => {
    if (isLoggingOut) return;
    setIsLoggingOut(true);

    try {
      await apiLogout();
      dispatch(unauthenticateUser());
      onLogout();
    } finally {
      setIsLoggingOut(false);
    }
  };

  return { isLoggingOut, logout };
};
