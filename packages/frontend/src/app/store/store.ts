import { configureStore } from "@reduxjs/toolkit";
import { setupAuthApiInterceptors } from "@/features/auth";
import { userReducer } from "@/entities/user";
import { themeReducer } from "@/shared/theme";

export const store = configureStore({
  reducer: {
    user: userReducer,
    theme: themeReducer,
  },
});

setupAuthApiInterceptors(store.dispatch);

declare global {
  type RootState = ReturnType<typeof store.getState>;
  type AppDispatch = typeof store.dispatch;
}
