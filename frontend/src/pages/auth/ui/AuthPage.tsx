import { useEffect } from "react";
import { apiAuthenticate } from "features/auth";
import { useAuthenticate } from "../model/useAuthenticate";

export const AuthPage = () => {
  const { handleAuth } = useAuthenticate();

  useEffect(() => {
    handleAuth(apiAuthenticate);
  }, []);

  return <div>authenticating...</div>;
};
