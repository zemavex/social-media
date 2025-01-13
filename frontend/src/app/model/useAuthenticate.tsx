import { useEffect, useState } from "react";
import {
  authenticate as authenticateRequest,
  oauthGithub as oauthGithubRequest,
} from "features/auth";
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

  const oauthGithub = async (code: string) => {
    setIsAuthenticating(true);

    try {
      const res = await oauthGithubRequest({ code });
      dispatch(setUser(res.user));
      dispatch(setIsAuthenticated(true));
    } catch (err) {
      console.error(err);
    } finally {
      setIsAuthenticating(false);
    }
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const codeParam = urlParams.get("code");
    if (codeParam) {
      oauthGithub(codeParam);
      return;
    }

    authenticate();
  }, []);

  return {
    isAuthenticating,
  };
};
