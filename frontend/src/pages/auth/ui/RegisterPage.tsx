import type { FormEvent, ChangeEvent } from "react";
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
          {errors?.email && <p>{errors.email}</p>}
          <label htmlFor="login-form__input-email">email</label>
          <input
            style={{ outline: errors?.email ? "1px solid red" : "" }}
            type="text"
            name="email"
            id="login-form__input-email"
            value={registerData.email}
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
