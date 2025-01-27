import {
  GITHUB_OAUTH_CLIENT_ID,
  GITHUB_OAUTH_CSRF_TOKEN,
} from "../config/constants";

export const startGithubOAuth = (redirectUri: string) => {
  redirectUri = redirectUri.replace(/^\//, "");

  const csrfToken = crypto.randomUUID();
  localStorage.setItem(GITHUB_OAUTH_CSRF_TOKEN, csrfToken);

  window.location.assign(
    "https://github.com/login/oauth/authorize?" +
      `client_id=${GITHUB_OAUTH_CLIENT_ID}&` +
      `redirect_uri=${window.location.origin}/${redirectUri}&` +
      `state=${csrfToken}`
  );
};
