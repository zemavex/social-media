import { configureStore } from "@reduxjs/toolkit";
import { setupAuthApiInterceptors } from "features/auth";
import { userReducer } from "entities/user";

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

setupAuthApiInterceptors(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
