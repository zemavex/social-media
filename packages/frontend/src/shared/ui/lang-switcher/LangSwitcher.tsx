import { useTranslation } from "react-i18next";
import { Button } from "@/shared/ui/button";

export const LangSwitcher = () => {
  const { t, i18n } = useTranslation();

  const handleLangSwitch = () => {
    i18n.changeLanguage(i18n.language === "ru" ? "en" : "ru");
  };

  return (
    <Button onClick={handleLangSwitch}>
      {t("current_language_short").toUpperCase()}
    </Button>
  );
};
