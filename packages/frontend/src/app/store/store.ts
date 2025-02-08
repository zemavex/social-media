import { configureStore } from "@reduxjs/toolkit";
import { setupAuthApiInterceptors } from "features/auth";
import { userReducer } from "entities/user";

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

setupAuthApiInterceptors(store.dispatch);

declare global {
  type RootState = ReturnType<typeof store.getState>;
  type AppDispatch = typeof store.dispatch;
}
