import { selectUser } from "entities/user";
import { useAppSelector } from "shared/lib";

export const HomePage = () => {
  const user = useAppSelector(selectUser);

  return (
    <div>
      <p>id: {user.id}</p>
      <p>login: {user.login}</p>
      <p>role: {user.role}</p>
    </div>
  );
};
