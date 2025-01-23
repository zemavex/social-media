import {
  useRef,
  useCallback,
  type FormEvent,
  type ChangeEvent,
  useEffect,
} from "react";
import { Link } from "react-router";
import type { LoginSchema } from "features/auth";
import { debounce } from "shared/lib";
import { githubOAuthClientID } from "shared/config";
import { useLogin } from "../model/useLogin";

export const LoginPage = () => {
  const {
    credentials,
    setCredentials,
    validateCredentials,
    isPending,
    errors,
    login,
  } = useLogin();
  const credentialsRef = useRef(credentials);

  const debouncedValidation = useCallback(
    debounce((field: keyof LoginSchema) => {
      validateCredentials(field, credentialsRef.current);
    }, 300),
    []
  );

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    login();
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));

    debouncedValidation(name as keyof LoginSchema);
  };

  const loginWithGithub = () => {
    window.location.assign(
      `https://github.com/login/oauth/authorize?client_id=${githubOAuthClientID}`
    );
  };

  useEffect(() => {
    credentialsRef.current = credentials;
  }, [credentials]);

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
            value={credentials.email}
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
            value={credentials.password}
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
