import { createAsyncThunk } from "@reduxjs/toolkit";
import { authenticate, login as loginRequest } from "../api";
import { setUser } from "entities/user";
import { AuthResponse } from "./types";

export const authenticateThunk = createAsyncThunk(
  "auth/authenticate",
  async (_, thunkAPI) => {
    const res = await authenticate();

    thunkAPI.dispatch(setUser(res.user));

    return res;
  }
);

export const loginThunk = createAsyncThunk<
  AuthResponse,
  { login: string; password: string }
>("auth/login", async ({ login, password }, thunkAPI) => {
  const res = await loginRequest(login, password);

  thunkAPI.dispatch(setUser(res.user));

  return res;
});
