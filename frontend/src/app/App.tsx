import { useEffect } from "react";
import { AppRouter } from "./router";
import { authenticateThunk, selectIsAuthenticating } from "features/auth";
import { useAppDispatch, useAppSelector } from "shared/lib";

const App = () => {
  const isAuthenticating = useAppSelector(selectIsAuthenticating);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(authenticateThunk());
  }, []);

  if (isAuthenticating) return "loading...";

  return <AppRouter />;
};

export default App;
