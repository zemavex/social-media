import type { FC } from "react";
import { useTranslation } from "react-i18next";
import { UI_ROUTES } from "~shared/core";
import { Button } from "@/shared/ui/button";
import { Loader } from "@/shared/ui/loader";
import { useErrorTranslation } from "@/shared/lib/hooks";
import { useOAuthHandler } from "../../model/useOAuthHandler";
import GithubMark from "../assets/github-mark.svg";
import cls from "./OAuthPage.module.scss";

interface OAuthPageProps {
  action: "auth" | "connect";
}

export const OAuthPage: FC<OAuthPageProps> = ({ action }) => {
  const { error } = useOAuthHandler(action);
  const { translateError } = useErrorTranslation();
  const { t } = useTranslation();

  if (error) {
    return (
      <div className={cls["oauth-page"]}>
        <GithubMark className={cls["oauth-page__github-icon"]} />
        <p>{t(`github_${action}_error`)}</p>
        <p>{translateError(error)}</p>
        <Button
          variant="contained"
          to={UI_ROUTES.AUTH}
          className={cls["oauth-page__link"]}
        >
          {t("go_back")}
        </Button>
      </div>
    );
  }

  return (
    <div className={cls["oauth-page"]}>
      <GithubMark className={cls["oauth-page__github-icon"]} />
      <div className={cls["oauth-page__loading-wrap"]}>
        <h1>
          {action === "auth"
            ? t("github_authorization")
            : t("github_connecting")}
        </h1>
        <Loader size="2xl" />
      </div>
    </div>
  );
};
