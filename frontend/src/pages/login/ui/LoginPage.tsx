import { ChangeEvent, FormEvent, useState } from "react";
import { loginThunk } from "features/auth";
import { useAppDispatch } from "shared/lib";

export const LoginPage = () => {
  const [formData, setFormData] = useState({ login: "", password: "" });
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const dispatch = useAppDispatch();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (isLoggingIn) return;
    setIsLoggingIn(true);

    try {
      await dispatch(loginThunk(formData));
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="login-form__input-login">login</label>
          <input
            type="text"
            name="login"
            id="login-form__input-login"
            value={formData.login}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="login-form__input-password">password</label>
          <input
            type="password"
            name="password"
            id="login-form__input-password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </div>
        <button disabled={isLoggingIn}>login</button>
      </form>
    </div>
  );
};
