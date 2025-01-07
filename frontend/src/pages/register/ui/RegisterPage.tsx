import { ChangeEvent, FormEvent } from "react";
import { Link } from "react-router";
import { useRegister } from "../model/useRegister";

export const RegisterPage = () => {
  const { registerData, setRegisterData, isPending, errors, register } =
    useRegister();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    register();
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegisterData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      <h1>Register</h1>
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
            value={registerData.login}
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
            value={registerData.password}
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
