import type { RootState, AppDispatch } from "../store";

declare global {
  type RootStateGlobal = RootState;
  type AppDispatchGlobal = AppDispatch;
}
