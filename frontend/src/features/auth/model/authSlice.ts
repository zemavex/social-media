import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { authenticateThunk, loginThunk } from "./authThunks";

interface AuthState {
  isAuthenticated: boolean;
  isAuthenticating: boolean;
}

const initialState: AuthState = {
  isAuthenticated: false,
  isAuthenticating: true,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setIsAuthenticated(state, action: PayloadAction<boolean>) {
      state.isAuthenticated = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(authenticateThunk.pending, (state, action) => {
      state.isAuthenticating = true;
    });
    builder.addCase(authenticateThunk.fulfilled, (state, action) => {
      state.isAuthenticated = true;
      state.isAuthenticating = false;
    });
    builder.addCase(authenticateThunk.rejected, (state, action) => {
      state.isAuthenticated = false;
      state.isAuthenticating = false;
    });

    builder.addCase(loginThunk.fulfilled, (state, action) => {
      state.isAuthenticated = true;
    });
  },
});

export const { setIsAuthenticated } = authSlice.actions;
export const authReducer = authSlice.reducer;
