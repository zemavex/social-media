import { ChangeEvent, FormEvent } from "react";
import { Link } from "react-router";
import { useLogin } from "../model/useLogin";

export const LoginPage = () => {
  const { credentials, setCredentials, isPending, errors, login } = useLogin();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    login();
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

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
