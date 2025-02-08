import { type FormEvent, type ChangeEvent } from "react";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import { apiRegister, registerSchema } from "features/auth";
import { useErrorTranslation } from "shared/lib/hooks";
import { useAuthForm } from "../model/useAuthForm";

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
    <div>
      <h1>Register</h1>
      {errors?.general && (
        <p>{translateError({ scope: "api", code: errors.general })}</p>
      )}
      <form onSubmit={handleSubmit}>
        <div>
          {errors.fields?.firstName && (
            <p>
              {translateError({
                scope: "validation",
                issue: errors.fields.firstName,
              })}
            </p>
          )}
          <label htmlFor="login-form__input-firstName">{t("firstName")}</label>
          <input
            style={{ outline: errors.fields?.firstName ? "1px solid red" : "" }}
            type="text"
            name="firstName"
            id="login-form__input-firstName"
            value={formData.firstName}
            onChange={handleInputChange}
          />
        </div>
        <div>
          {errors.fields?.lastName && (
            <p>
              {translateError({
                scope: "validation",
                issue: errors.fields.lastName,
              })}
            </p>
          )}
          <label htmlFor="login-form__input-lastName">{t("lastName")}</label>
          <input
            style={{ outline: errors.fields?.lastName ? "1px solid red" : "" }}
            type="text"
            name="lastName"
            id="login-form__input-lastName"
            value={formData.lastName}
            onChange={handleInputChange}
          />
        </div>
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
        <button disabled={isPending}>Register</button>
      </form>
      <p>
        {"Have account?"} <Link to={"/login"}>Login</Link>
      </p>
    </div>
  );
};
