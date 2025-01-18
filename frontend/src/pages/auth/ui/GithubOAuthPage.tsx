import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { apiGithubOAuth } from "features/auth";
import { useAuthenticate } from "../model/useAuthenticate";

export const GithubOAuthPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { handleAuth } = useAuthenticate();

  useEffect(() => {
    const code = searchParams.get("code");

    if (!code) {
      navigate("/"); // redirect to AuthPage for basic auth
      return;
    }

    handleAuth(() => apiGithubOAuth(code));
  }, []);

  return <div>authenticating using github...</div>;
};
