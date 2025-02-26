import { useMemo } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import {
  AuthPage,
  OAuthPage,
  LoginPage,
  RegisterPage,
  FinishRegistrationPage,
} from "@/pages/auth";
import { HomePage } from "@/pages/home";
import { NotFoundPage } from "@/pages/not-found";
import { selectAuthState, selectUser } from "@/entities/user";
import { useAppSelector } from "@/shared/lib/redux";
import { ROUTES } from "@/shared/config";
import { AuthenticatedLayout } from "./ui/AuthenticatedLayout/AuthenticatedLayout";
import { Layout } from "./ui/Layout/Layout";

export const AppRouter = () => {
  const authState = useAppSelector(selectAuthState);
  const user = useAppSelector(selectUser);

  const routes = useMemo(() => {
    if (authState === "idle" || authState === "pending") {
      return (
        <>
          <Route
            path={ROUTES.GITHUB_AUTH}
            element={<OAuthPage action="auth" />}
          />
          <Route
            path={ROUTES.GITHUB_CONNECT}
            element={<OAuthPage action="connect" />}
          />
          <Route path="*" element={<AuthPage />} />
        </>
      );
    } else if (authState === "unauthenticated") {
      return (
        <>
          <Route path={ROUTES.LOGIN} element={<LoginPage />} />
          <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
          <Route path="*" element={<Navigate to={ROUTES.LOGIN} replace />} />
        </>
      );
    } else if (authState === "authenticated") {
      if (!user.is_finished_registration) {
        return (
          <>
            <Route path="*" element={<FinishRegistrationPage />} />
          </>
        );
      } else {
        return (
          <Route element={<AuthenticatedLayout />}>
            <Route path={ROUTES.HOME} element={<HomePage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        );
      }
    }
  }, [authState, user.is_finished_registration]);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          {routes}
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
