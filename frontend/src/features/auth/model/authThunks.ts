import { authenticateUser, setAuthState } from "entities/user";
import { apiAuthenticate } from "../api";

export const authenticateThunk = () => async (dispatch: AppDispatchGlobal) => {
  dispatch(setAuthState("pending"));

  try {
    const userData = await apiAuthenticate();
    dispatch(authenticateUser(userData));
  } catch (err) {
    console.error(err);
    dispatch(setAuthState("unauthenticated"));
  }
};
