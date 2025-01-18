import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { AuthPage, GithubOAuthPage, LoginPage, RegisterPage } from "pages/auth";
import { HomePage } from "pages/home";
import { selectAuthState } from "entities/user";
import { useAppSelector } from "shared/lib";

export const AppRouter = () => {
  const authState = useAppSelector(selectAuthState);

  let routes;

  if (authState === "idle" || authState === "pending") {
    routes = (
      <>
        <Route path="/oauth/github" element={<GithubOAuthPage />} />
        <Route path="*" element={<AuthPage />} />
      </>
    );
  } else if (authState === "unauthenticated") {
    routes = (
      <>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={<Navigate to={"/login"} replace />} />
      </>
    );
  } else if (authState === "authenticated") {
    routes = (
      <>
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<Navigate to={"/"} replace />} />
      </>
    );
  }

  return (
    <BrowserRouter>
      <Routes>{routes}</Routes>
    </BrowserRouter>
  );
};
