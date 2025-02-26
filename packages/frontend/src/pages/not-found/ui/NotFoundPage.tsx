import { useTranslation } from "react-i18next";
import { Button } from "@/shared/ui/button";
import { ROUTES } from "@/shared/config";
import NotFoundErrorIcon from "./assets/404-error.svg";
import cls from "./NotFoundPage.module.scss";

export const NotFoundPage = () => {
  const { t } = useTranslation();

  return (
    <div className={cls["not-found-page"]}>
      <NotFoundErrorIcon className={cls["not-found-page__icon"]} />
      <p className={cls["not-found-page__text"]}>{t("page_not_found")}</p>
      <Button size="large" variant="contained" to={ROUTES.HOME}>
        {t("go_back")}
      </Button>
    </div>
  );
};
