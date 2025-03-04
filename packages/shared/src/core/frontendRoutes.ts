export const UI_ROUTES = {
  // authState = idle || pending
  AUTH: "/",
  GITHUB_AUTH: "/oauth/github/auth",
  GITHUB_CONNECT: "/oauth/github/connect",

  // authState = unauthenticated
  LOGIN: "/login",
  REGISTER: "/register",

  // authState = authenticated
  EDIT_PROFILE: "/edit-profile",
  FEED: "/feed",
  MESSENGER: "/messenger",
  FRIENDS: "/friends",
  COMMUNITIES: "/communities",
} as const;
