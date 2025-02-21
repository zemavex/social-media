export interface BuildEnv {
  production?: boolean;
}

export interface BuildPaths {
  entry: string;
  output: string;
  html: string;
  scss: string;
}

export interface BuildOptions {
  paths: BuildPaths;
  isDev: boolean;
}
