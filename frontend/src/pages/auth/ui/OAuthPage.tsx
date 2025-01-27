import type { FC } from "react";
import { useOAuthHandler } from "../model/useOAuthHandler";

interface OAuthPageProps {
  action: "auth" | "connect";
}

export const OAuthPage: FC<OAuthPageProps> = ({ action }) => {
  useOAuthHandler(action);

  if (action === "auth") {
    return <div>Github authorization...</div>;
  }

  if (action === "connect") {
    return <div>Connecting Github...</div>;
  }
};
