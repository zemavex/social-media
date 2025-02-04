import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import {
  apiGithubAuth,
  apiGithubConnect,
  GITHUB_OAUTH_CSRF_TOKEN,
} from "features/auth";
import { setAuthState, authenticateUser, type User } from "entities/user";
import { isAxiosError } from "shared/api";
import { useAppDispatch } from "shared/lib/redux";
import { storage } from "shared/lib/storage";
import type { TranslateErrorOptions } from "shared/lib/hooks";

export const useOAuthHandler = (action: "auth" | "connect") => {
  const [error, setError] = useState<TranslateErrorOptions | null>(null);
  const [searchParams] = useSearchParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const state = searchParams.get("state");
    const storedState = storage.get(GITHUB_OAUTH_CSRF_TOKEN);
    storage.remove(GITHUB_OAUTH_CSRF_TOKEN);
    if (!state || state !== storedState) {
      setError({ scope: "general", code: "unknown_error" });
      return;
    }

    const code = searchParams.get("code");
    if (!code) {
      setError({ scope: "general", code: "unknown_error" });
      return;
    }

    const handleOAuth = async (apiCall: () => Promise<User>) => {
      dispatch(setAuthState("pending"));
      try {
        const userData = await apiCall();
        dispatch(authenticateUser(userData));
      } catch (err) {
        if (!isAxiosError(err) || !err.response) {
          setError({ scope: "general", code: "unknown_error" });
        } else {
          setError({ scope: "api", code: err.response.data.code });
        }
        dispatch(setAuthState("idle"));
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
