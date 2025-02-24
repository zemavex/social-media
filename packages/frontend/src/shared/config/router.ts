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

export type Route = (typeof ROUTES)[keyof typeof ROUTES];
