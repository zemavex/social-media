import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { HomePage } from "pages/home";
import { LoginPage } from "pages/login";
import { selectIsAuthenticated } from "features/auth";
import { useAppSelector } from "shared/lib";
import { RegisterPage } from "pages/register";

export const AppRouter = () => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  return (
    <BrowserRouter>
      <Routes>
        {!isAuthenticated ? (
          <>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="*" element={<Navigate to={"/login"} replace />} />
          </>
        ) : (
          <>
            <Route path="/" element={<HomePage />} />
            <Route path="*" element={<Navigate to={"/"} replace />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
};
