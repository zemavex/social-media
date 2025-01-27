import { useEffect } from "react";
import { authenticateThunk } from "features/auth";
import { useAppDispatch } from "shared/lib";

export const AuthPage = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(authenticateThunk());
  }, []);

  return <div>authenticating...</div>;
};
