type Str = string | undefined;
type Num = number | undefined;

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DB_USER: Str;
      DB_PASSWORD: Str;
      DB_HOST: Str;
      DB_PORT: Num;
      DB_DATABASE_NAME: Str;
      CLIENT_URL: Str;
      GITHUB_OAUTH_CLIENT_ID: Str;
      GITHUB_OAUTH_CLIENT_SECRET: Str;
    }
  }
}

export {};
