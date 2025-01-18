import { authenticateUser, setAuthState, type User } from "entities/user";
import { useAppDispatch } from "shared/lib";

export const useAuthenticate = () => {
  const dispatch = useAppDispatch();

  const handleAuth = async (apiCall: () => Promise<User>) => {
    dispatch(setAuthState("pending"));

    try {
      const userData = await apiCall();
      dispatch(authenticateUser(userData));
    } catch (err) {
      console.error(err);
      dispatch(setAuthState("unauthenticated"));
    }
  };

  return { handleAuth };
};
