import { useTranslation } from "react-i18next";
import { startGithubOAuth } from "@/features/auth";
import { Button } from "@/shared/ui/button";
import { ROUTES } from "@/shared/config";
import GithubMark from "./assets/github-mark.svg";
import cls from "./GithubButton.module.scss";

export const GithubButton = () => {
  const { t } = useTranslation();

  const handleGithubOAuth = () => {
    startGithubOAuth(ROUTES.GITHUB_AUTH);
  };

  return (
    <Button
      onClick={handleGithubOAuth}
      startIcon={<GithubMark />}
      className={cls["github-btn"]}
      variant="contained"
    >
      {t("continue_with_github")}
    </Button>
  );
};
