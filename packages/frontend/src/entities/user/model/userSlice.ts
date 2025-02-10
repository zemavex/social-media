import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { storage, STORAGE_KEYS } from "@/shared/lib/storage";
import type { User } from "./types";

type UserState = {
  user: User;
  authState: "idle" | "pending" | "authenticated" | "unauthenticated";
};

const initialState: UserState = {
  user: {
    id: -1,
    username: undefined,
    first_name: "",
    last_name: undefined,
    role: "user",
  },
  authState: "idle",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    authenticateUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
      state.authState = "authenticated";
      storage.set(STORAGE_KEYS.IS_AUTHENTICATED, true);
    },
    setAuthState(state, action: PayloadAction<UserState["authState"]>) {
      state.authState = action.payload;
    },
    unauthenticateUser(state) {
      storage.remove(STORAGE_KEYS.IS_AUTHENTICATED);
      state.authState = "unauthenticated";
      state.user = initialState.user;
    },
  },
});

export const { authenticateUser, setAuthState, unauthenticateUser } =
  userSlice.actions;
export const userReducer = userSlice.reducer;
