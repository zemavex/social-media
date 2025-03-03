import { type FormEvent, type ChangeEvent } from "react";
import { useTranslation } from "react-i18next";
import { UI_ROUTES } from "~shared/core";
import { registerSchema } from "~shared/user";
import { apiRegister } from "@/features/auth";
import { useErrorTranslation } from "@/shared/lib/hooks";
import { AppLink } from "@/shared/ui/app-link";
import { Button } from "@/shared/ui/button";
import { Divider } from "@/shared/ui/divider";
import { Input } from "@/shared/ui/input";
import { useAuthForm } from "../../model/useAuthForm";
import { GithubButton } from "../oauth-buttons/GithubButton/GithubButton";
import cls from "./RegisterPage.module.scss";

export const RegisterPage = () => {
  const {
    formData,
    setFormData,
    validateDebounced,
    submitForm,
    isPending,
    errors,
  } = useAuthForm({
    apiCall: apiRegister,
    validationSchema: registerSchema,
    initialFormData: { email: "", password: "", firstName: "", lastName: "" },
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
    <div className={cls["register-page"]}>
      <form onSubmit={handleSubmit} className={cls["register-form"]}>
        <h1>{t("sign_up_heading")}</h1>
        <GithubButton />
        <Divider>{t("or").toUpperCase()}</Divider>
        {errors?.general && (
          <p className={cls["register-form__error"]}>
            {translateError({ scope: "api", code: errors.general })}
          </p>
        )}
        <Input
          name="firstName"
          label={t("firstName")}
          id="register-form__input-firstName"
          value={formData.firstName}
          onChange={handleInputChange}
          error={
            errors.fields?.firstName &&
            translateError({
              scope: "validation",
              issue: errors.fields.firstName,
            })
          }
        />
        <Input
          name="lastName"
          label={t("lastName")}
          id="register-form__input-lastName"
          value={formData.lastName}
          onChange={handleInputChange}
          error={
            errors.fields?.lastName &&
            translateError({
              scope: "validation",
              issue: errors.fields.lastName,
            })
          }
        />
        <Input
          name="email"
          label={t("email")}
          id="register-form__input-email"
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
          id="register-form__input-password"
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
          {t("sign_up_action_text")}
        </Button>
        <p className={cls["register-form__signup-prompt"]}>
          {t("already_have_account_question")}{" "}
          <AppLink to={UI_ROUTES.LOGIN}>{t("sign_in_action_text")}</AppLink>
        </p>
      </form>
    </div>
  );
};
