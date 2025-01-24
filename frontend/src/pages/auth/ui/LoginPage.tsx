import { type FormEvent, type ChangeEvent } from "react";
import { Link } from "react-router";
import { apiLogin, loginSchema } from "features/auth";
import { githubOAuthClientID } from "shared/config";
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

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    submitForm();
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    validateDebounced();
  };

  const loginWithGithub = () => {
    window.location.assign(
      `https://github.com/login/oauth/authorize?client_id=${githubOAuthClientID}`
    );
  };

  return (
    <div>
      <h1>Login</h1>
      {errors?.general && <p>{errors.general}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          {errors?.email && <p>{errors.email}</p>}
          <label htmlFor="login-form__input-email">email</label>
          <input
            style={{ outline: errors?.email ? "1px solid red" : "" }}
            type="text"
            name="email"
            id="login-form__input-email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>
        <div>
          {errors?.password && <p>{errors.password}</p>}
          <label htmlFor="login-form__input-password">password</label>
          <input
            style={{ outline: errors?.password ? "1px solid red" : "" }}
            type="password"
            name="password"
            id="login-form__input-password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </div>
        <button disabled={isPending}>login</button>
      </form>
      <button onClick={loginWithGithub}>login with github</button>
      <p>
        {"Don't have account?"} <Link to={"/register"}>Register</Link>
      </p>
    </div>
  );
};
