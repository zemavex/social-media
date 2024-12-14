type EnvVarString = string | undefined;
type EnvVarNumber = number | undefined;

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DB_USER: EnvVarString;
      DB_PASSWORD: EnvVarString;
      DB_HOST: EnvVarString;
      DB_PORT: EnvVarNumber;
      DB_DATABASE_NAME: EnvVarString;
    }
  }
}

export {};
