import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { UI_ROUTES } from "~shared/core";
import type { UserAuthDTO } from "~shared/user";
import { apiGithubAuth, apiGithubConnect } from "@/features/auth";
import { setAuthState, authenticateUser } from "@/entities/user";
import { isAxiosError } from "@/shared/api";
import type { TranslateErrorOptions } from "@/shared/lib/hooks";
import { useAppDispatch } from "@/shared/lib/redux";
import { storage, STORAGE_KEYS } from "@/shared/lib/storage";

export const useOAuthHandler = (action: "auth" | "connect") => {
  const [error, setError] = useState<TranslateErrorOptions | null>(null);
  const [searchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const state = searchParams.get("state");
    const storedState = storage.get(STORAGE_KEYS.GITHUB_CSRF_TOKEN);
    storage.remove(STORAGE_KEYS.GITHUB_CSRF_TOKEN);
    if (!state || state !== storedState) {
      setError({ scope: "general", code: "unknown_error" });
      return;
    }

    const code = searchParams.get("code");
    if (!code) {
      setError({ scope: "general", code: "unknown_error" });
      return;
    }

    const handleOAuth = async (
      apiCall: () => Promise<UserAuthDTO>,
      redirectTo?: string,
    ) => {
      dispatch(setAuthState("pending"));
      try {
        const userData = await apiCall();
        dispatch(authenticateUser(userData));
        if (redirectTo) {
          navigate(redirectTo);
        }
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
      handleOAuth(() => apiGithubAuth(code), UI_ROUTES.FEED);
    } else if (action === "connect") {
      handleOAuth(() => apiGithubConnect(code), UI_ROUTES.FEED);
    }
  }, []);

  return {
    error,
  };
};
