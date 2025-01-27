import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router";
import {
  apiGithubAuth,
  apiGithubConnect,
  GITHUB_OAUTH_CSRF_TOKEN,
} from "features/auth";
import { setAuthState, authenticateUser, type User } from "entities/user";
import { useAppDispatch } from "shared/lib";
import { ROUTES } from "shared/config";

export const useOAuthHandler = (action: "auth" | "connect") => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const state = searchParams.get("state");
    if (state !== localStorage.getItem(GITHUB_OAUTH_CSRF_TOKEN)) {
      // TODO
    }

    const code = searchParams.get("code");

    if (!code) {
      navigate(ROUTES.AUTH);
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
        navigate(ROUTES.AUTH);
      }
    };

    if (action === "auth") {
      handleOAuth(() => apiGithubAuth(code));
    } else if (action === "connect") {
      handleOAuth(() => apiGithubConnect(code));
    }
  }, []);
};
