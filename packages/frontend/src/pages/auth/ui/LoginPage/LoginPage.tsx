import { type FormEvent, type ChangeEvent } from "react";
import { useTranslation } from "react-i18next";
import { UI_ROUTES } from "~shared/core";
import { loginSchema } from "~shared/user";
import { apiLogin } from "@/features/auth";
import { AppLink } from "@/shared/ui/app-link";
import { Button } from "@/shared/ui/button";
import { Divider } from "@/shared/ui/divider";
import { Input } from "@/shared/ui/input";
import { useErrorTranslation } from "@/shared/lib/hooks";
import { useAuthForm } from "../../model/useAuthForm";
import { GithubButton } from "../oauth-buttons/GithubButton/GithubButton";
import cls from "./LoginPage.module.scss";

export const LoginPage = () => {
  const {
    formData,
    setFormData,
    validateDebounced,
    submitForm,
    isPending,
    errors,
  } = useAuthForm({
    apiCall: apiLogin,
    validationSchema: loginSchema,
    initialFormData: { email: "", password: "" },
  });
  const { translateError } = useErrorTranslation();
  const { t } = useTranslation();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    submitForm();
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    validateDebounced();
  };

  return (
    <div className={cls["login-page"]}>
      <form onSubmit={handleSubmit} className={cls["login-form"]}>
        <h1>{t("sign_in_heading")}</h1>
        <GithubButton />
        <Divider>{t("or").toUpperCase()}</Divider>
        {errors?.general && (
          <p className={cls["login-form__error"]}>
            {translateError({ scope: "api", code: errors.general })}
          </p>
        )}
        <Input
          name="email"
          label={t("email")}
          id="login-form__input-email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="email@example.com"
          error={
            errors.fields?.email &&
            translateError({
              scope: "validation",
              issue: errors.fields.email,
            })
          }
        />
        <Input
          name="password"
          label={t("password")}
          id="login-form__input-password"
          value={formData.password}
          onChange={handleInputChange}
          type="password"
          error={
            errors.fields?.password &&
            translateError({
              scope: "validation",
              issue: errors.fields.password,
            })
          }
        />
        <Button
          isLoading={isPending}
          loadingPosition="end"
          color="primary"
          variant="contained"
          type="submit"
        >
          {t("sign_in_action_text")}
        </Button>
        <p className={cls["login-form__signup-prompt"]}>
          {t("no_account_question")}{" "}
          <AppLink to={UI_ROUTES.REGISTER}>{t("sign_up_action_text")}</AppLink>
        </p>
      </form>
    </div>
  );
};
