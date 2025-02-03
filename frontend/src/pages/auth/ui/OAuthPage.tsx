import type { FC } from "react";
import { useNavigate } from "react-router";
import { ROUTES } from "shared/config";
import { useOAuthHandler } from "../model/useOAuthHandler";
import { useErrorTranslation } from "shared/lib/hooks";

interface OAuthPageProps {
  action: "auth" | "connect";
}

export const OAuthPage: FC<OAuthPageProps> = ({ action }) => {
  const { error } = useOAuthHandler(action);
  const { translateError } = useErrorTranslation();
  const navigate = useNavigate();

  if (error) {
    return (
      <div>
        <div>{`Error during Github ${
          action === "auth" ? "authentication" : "connection"
        }`}</div>
        <div>{translateError(error)}</div>
        <button onClick={() => navigate(ROUTES.AUTH)}>Go back</button>
      </div>
    );
  }

  if (action === "auth") {
    return <div>Github authorization...</div>;
  }

  if (action === "connect") {
    return <div>Connecting Github...</div>;
  }
};
