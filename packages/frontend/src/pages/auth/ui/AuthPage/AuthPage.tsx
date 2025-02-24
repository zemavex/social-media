import { useEffect } from "react";
import { authenticateThunk } from "@/features/auth";
import { Loader } from "@/shared/ui/loader";
import { useAppDispatch } from "@/shared/lib/redux";
import cls from "./AuthPage.module.scss";

export const AuthPage = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(authenticateThunk());
  }, []);

  return (
    <div className={cls["auth-page"]}>
      <Loader size="2xl" />
    </div>
  );
};
