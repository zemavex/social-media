import {
  useDispatch,
  useSelector,
  type TypedUseSelectorHook,
} from "react-redux";

export const useAppSelector: TypedUseSelectorHook<RootStateGlobal> =
  useSelector;
export const useAppDispatch = useDispatch.withTypes<AppDispatchGlobal>();
