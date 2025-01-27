export const BACKEND_BASE_URL = "http://localhost:3000/api";

export const ROUTES = {
  // authState = idle || pending
  AUTH: "/",
  GITHUB_AUTH: "/oauth/github/auth",
  GITHUB_CONNECT: "/oauth/github/connect",

  // authState = unauthenticated
  LOGIN: "/login",
  REGISTER: "/register",

  // authState = authenticated
  HOME: "/",
} as const;
