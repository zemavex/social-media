import { useState } from "react";
import { apiLogout, startGithubOAuth } from "features/auth";
import { selectUser, unauthenticateUser } from "entities/user";
import { useAppDispatch, useAppSelector } from "shared/lib";
import { ROUTES } from "shared/config";

export const HomePage = () => {
  const [loggingOut, setLoggingOut] = useState(false);
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  const handleConnectGithub = () => {
    startGithubOAuth(ROUTES.GITHUB_CONNECT);
  };

  const handleLogoutClick = async () => {
    if (loggingOut) return;
    setLoggingOut(true);

    try {
      await apiLogout();
      dispatch(unauthenticateUser());
    } finally {
      setLoggingOut(false);
    }
  };

  return (
    <div>
      <p>id: {user.id}</p>
      <p>username: {user.username}</p>
      <p>first_name: {user.first_name}</p>
      <p>last_name: {user.last_name}</p>
      <p>full_name: {`${user.first_name} ${user.last_name || ""}`.trim()}</p>
      <p>role: {user.role}</p>
      <button onClick={handleConnectGithub}>connect github</button>
      <button onClick={handleLogoutClick} disabled={loggingOut}>
        logout
      </button>
    </div>
  );
};
