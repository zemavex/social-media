import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { AuthPage, OAuthPage, LoginPage, RegisterPage } from "@/pages/auth";
import { HomePage } from "@/pages/home";
import { selectAuthState } from "@/entities/user";
import { useAppSelector } from "@/shared/lib/redux";
import { ROUTES } from "@/shared/config";

export const AppRouter = () => {
  const authState = useAppSelector(selectAuthState);

  let routes;

  if (authState === "idle" || authState === "pending") {
    routes = (
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
    routes = (
      <>
        <Route path={ROUTES.LOGIN} element={<LoginPage />} />
        <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
        <Route path="*" element={<Navigate to={ROUTES.LOGIN} replace />} />
      </>
    );
  } else if (authState === "authenticated") {
    routes = (
      <>
        <Route path={ROUTES.HOME} element={<HomePage />} />
        <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} />
      </>
    );
  }

  return (
    <BrowserRouter>
      <Routes>{routes}</Routes>
    </BrowserRouter>
  );
};
