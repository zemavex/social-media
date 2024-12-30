import { registerThunk } from "features/auth/model/authThunks";
import { ChangeEvent, FormEvent, useState } from "react";
import { Link } from "react-router";
import { useAppDispatch } from "shared/lib";

export const RegisterPage = () => {
  const [formData, setFormData] = useState({ login: "", password: "" });
  const [isRegistering, setIsRegistering] = useState(false);
  const dispatch = useAppDispatch();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (isRegistering) return;
    setIsRegistering(true);

    try {
      await dispatch(registerThunk(formData));
    } finally {
      setIsRegistering(false);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div>
      <h1>Register</h1>
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
        <button disabled={isRegistering}>register</button>
      </form>
      <p>
        Have account? <Link to={"/login"}>Log in</Link>
      </p>
    </div>
  );
};
