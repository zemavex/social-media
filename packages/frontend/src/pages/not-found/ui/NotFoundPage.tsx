import { useTranslation } from "react-i18next";
import { UI_ROUTES } from "~shared/core";
import { Button } from "@/shared/ui/button";
import NotFoundErrorIcon from "./assets/404-error.svg";
import cls from "./NotFoundPage.module.scss";

export const NotFoundPage = () => {
  const { t } = useTranslation();

  return (
    <div className={cls["not-found-page"]}>
      <NotFoundErrorIcon className={cls["not-found-page__icon"]} />
      <p className={cls["not-found-page__text"]}>{t("page_not_found")}</p>
      <Button size="large" variant="contained" to={UI_ROUTES.FEED}>
        {t("go_back")}
      </Button>
    </div>
  );
};
