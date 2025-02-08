import { storage, STORAGE_KEYS } from "shared/lib/storage";

const GITHUB_OAUTH_CLIENT_ID = "Ov23lim20KhWf5gp2ULe";

export const startGithubOAuth = (redirectUri: string) => {
  redirectUri = redirectUri.replace(/^\//, "");

  const csrfToken = crypto.randomUUID();
  storage.set(STORAGE_KEYS.GITHUB_CSRF_TOKEN, csrfToken);

  window.location.assign(
    "https://github.com/login/oauth/authorize?" +
      `prompt=select_account&` +
      `client_id=${GITHUB_OAUTH_CLIENT_ID}&` +
      `redirect_uri=${window.location.origin}/${redirectUri}&` +
      `state=${csrfToken}`
  );
};
