import { type FormEvent, type ChangeEvent } from "react";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import { apiLogin, loginSchema, startGithubOAuth } from "features/auth";
import { useErrorTranslation } from "shared/lib/hooks";
import { ROUTES } from "shared/config";
import { useAuthForm } from "../model/useAuthForm";

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
  const { t, i18n } = useTranslation();

  const handleChangeLang = () => {
    i18n.changeLanguage(i18n.language === "ru" ? "en" : "ru");
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    submitForm();
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    validateDebounced();
  };

  const handleGithubOAuth = () => {
    startGithubOAuth(ROUTES.GITHUB_AUTH);
  };

  return (
    <div>
      <button onClick={handleChangeLang}>{t("current_language")}</button>
      <h1>{t("login")}</h1>
      {errors?.general && (
        <p>{translateError({ scope: "api", code: errors.general })}</p>
      )}
      <form onSubmit={handleSubmit}>
        <div>
          {errors.fields?.email && (
            <p>
              {translateError({
                scope: "validation",
                issue: errors.fields.email,
              })}
            </p>
          )}
          <label htmlFor="login-form__input-email">{t("email")}</label>
          <input
            style={{ outline: errors.fields?.email ? "1px solid red" : "" }}
            type="text"
            name="email"
            id="login-form__input-email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>
        <div>
          {errors.fields?.password && (
            <p>
              {translateError({
                scope: "validation",
                issue: errors.fields.password,
              })}
            </p>
          )}
          <label htmlFor="login-form__input-password">{t("password")}</label>
          <input
            style={{ outline: errors.fields?.password ? "1px solid red" : "" }}
            type="password"
            name="password"
            id="login-form__input-password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </div>
        <button disabled={isPending}>login</button>
      </form>
      <button onClick={handleGithubOAuth}>continue with github</button>
      <p>
        {"Don't have account?"} <Link to={"/register"}>Register</Link>
      </p>
    </div>
  );
};
