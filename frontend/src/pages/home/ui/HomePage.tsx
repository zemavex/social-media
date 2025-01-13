import { selectUser, setIsAuthenticated } from "entities/user";
import { logout as logoutRequest } from "features/auth";
import { useAppDispatch, useAppSelector } from "shared/lib";

export const HomePage = () => {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  const logout = async () => {
    try {
      await logoutRequest();
      dispatch(setIsAuthenticated(false));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <p>id: {user.id}</p>
      <p>login: {user.login}</p>
      <p>role: {user.role}</p>
      <button onClick={logout}>logout</button>
    </div>
  );
};
