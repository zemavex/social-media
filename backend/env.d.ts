declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DB_USER: string;
      DB_PASSWORD: string;
      DB_HOST: string;
      DB_PORT: string;
      DB_DATABASE_NAME: string;
      CLIENT_URL: string;
      GITHUB_OAUTH_CLIENT_ID: string;
      GITHUB_OAUTH_CLIENT_SECRET: string;
    }
  }
}

export {};
