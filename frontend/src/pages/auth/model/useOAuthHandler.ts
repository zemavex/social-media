import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import {
  apiGithubAuth,
  apiGithubConnect,
  GITHUB_OAUTH_CSRF_TOKEN,
} from "features/auth";
import { setAuthState, authenticateUser, type User } from "entities/user";
import { useAppDispatch } from "shared/lib/redux";

export const useOAuthHandler = (action: "auth" | "connect") => {
  const [error, setError] = useState<string | null>(null);
  const [searchParams] = useSearchParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const defaultError = "An unexpected error occurred.";

    const state = searchParams.get("state");
    const storedState = localStorage.getItem(GITHUB_OAUTH_CSRF_TOKEN);
    localStorage.removeItem(GITHUB_OAUTH_CSRF_TOKEN);
    if (!state || state !== storedState) {
      setError(defaultError);
      return;
    }

    const code = searchParams.get("code");
    if (!code) {
      setError(defaultError);
      return;
    }

    const handleOAuth = async (apiCall: () => Promise<User>) => {
      dispatch(setAuthState("pending"));
      try {
        const userData = await apiCall();
        dispatch(authenticateUser(userData));
      } catch (err) {
        console.error(err);
        dispatch(setAuthState("idle"));
        setError(defaultError);
      }
    };

    if (action === "auth") {
      handleOAuth(() => apiGithubAuth(code));
    } else if (action === "connect") {
      handleOAuth(() => apiGithubConnect(code));
    }
  }, []);

  return {
    error,
  };
};
