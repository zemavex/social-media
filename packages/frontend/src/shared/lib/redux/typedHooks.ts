import {
  useDispatch,
  useSelector,
  type TypedUseSelectorHook,
} from "react-redux";

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
