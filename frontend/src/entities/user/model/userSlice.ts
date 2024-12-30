import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { User } from "./user";

type NullableUser = {
  [K in keyof User]: User[K] | null;
};

const initialState: NullableUser = {
  id: null,
  login: null,
  role: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<NullableUser>) {
      return action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;
export const userReducer = userSlice.reducer;
