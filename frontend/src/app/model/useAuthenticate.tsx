import { useEffect, useState } from "react";
import { authenticate as authenticateRequest } from "features/auth";
import { setIsAuthenticated, setUser } from "entities/user";
import { useAppDispatch } from "shared/lib";

export const useAuthenticate = () => {
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const dispatch = useAppDispatch();

  const authenticate = async () => {
    setIsAuthenticating(true);

    try {
      const res = await authenticateRequest();
      dispatch(setUser(res.user));
      dispatch(setIsAuthenticated(true));
    } catch (err) {
      console.error(err);
    } finally {
      setIsAuthenticating(false);
    }
  };

  useEffect(() => {
    authenticate();
  }, []);

  return {
    isAuthenticating,
  };
};
