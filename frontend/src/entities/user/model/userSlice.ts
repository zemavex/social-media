import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { User } from "./user";

type NullableUser = {
  [K in keyof User]: User[K] | null;
};

type UserState = NullableUser & {
  isAuthenticated: boolean;
};

const initialState: UserState = {
  id: null,
  login: null,
  role: null,
  isAuthenticated: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<NullableUser>) {
      Object.assign(state, action.payload);
    },
    setIsAuthenticated(state, action: PayloadAction<boolean>) {
      state.isAuthenticated = action.payload;
    },
  },
});

export const { setUser, setIsAuthenticated } = userSlice.actions;
export const userReducer = userSlice.reducer;
