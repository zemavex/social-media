import { isAxiosError } from "axios";
import {
  authenticateUser,
  setAuthState,
  unauthenticateUser,
} from "@/entities/user";
import { storage, STORAGE_KEYS } from "@/shared/lib/storage";
import { apiAuthenticate } from "../api";

export const authenticateThunk = () => async (dispatch: AppDispatch) => {
  if (!storage.get(STORAGE_KEYS.IS_AUTHENTICATED)) {
    dispatch(setAuthState("unauthenticated"));
    return;
  }

  dispatch(setAuthState("pending"));

  try {
    const userData = await apiAuthenticate();
    dispatch(authenticateUser(userData));
  } catch (err) {
    if (isAxiosError(err) && err.response?.status === 401) {
      dispatch(unauthenticateUser());
      return;
    }
    dispatch(setAuthState("unauthenticated"));
  }
};
