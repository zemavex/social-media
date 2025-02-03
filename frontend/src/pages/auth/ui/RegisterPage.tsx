import { type FormEvent, type ChangeEvent } from "react";
import { Link } from "react-router";
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
    initialFormData: { email: "", password: "" },
  });
  const { translateError } = useErrorTranslation();

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
          {errors.fields?.email && (
            <p>
              {translateError({
                scope: "validation",
                issue: errors.fields.email,
              })}
            </p>
          )}
          <label htmlFor="login-form__input-email">email</label>
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
          <label htmlFor="login-form__input-password">password</label>
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
