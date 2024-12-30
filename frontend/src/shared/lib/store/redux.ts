import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const useAppSelector: TypedUseSelectorHook<RootStateGlobal> =
  useSelector;
export const useAppDispatch = useDispatch.withTypes<AppDispatchGlobal>();
