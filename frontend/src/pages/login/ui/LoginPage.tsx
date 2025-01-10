import { ChangeEvent, FormEvent, useCallback, useEffect, useRef } from "react";
import { Link } from "react-router";
import { LoginSchema } from "features/auth";
import { debounce } from "shared/lib";
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

  useEffect(() => {
    credentialsRef.current = credentials;
  }, [credentials]);

  return (
    <div>
      <h1>Login</h1>
      {errors?.general && <p>{errors.general}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          {errors?.login && <p>{errors.login}</p>}
          <label htmlFor="login-form__input-login">login</label>
          <input
            style={{ outline: errors?.login ? "1px solid red" : "" }}
            type="text"
            name="login"
            id="login-form__input-login"
            value={credentials.login}
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
      <p>
        {"Don't have account?"} <Link to={"/register"}>Register</Link>
      </p>
    </div>
  );
};
