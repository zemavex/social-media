import path from "path";
import { Configuration } from "webpack";
import { buildConfig } from "./config/build/buildConfig";
import { BuildEnv, BuildPaths } from "./config/build/types/config";

const paths: BuildPaths = {
  entry: path.resolve(__dirname, "src", "index.tsx"),
  public: path.resolve(__dirname, "public"),
  output: path.resolve(__dirname, "dist"),
  html: path.resolve(__dirname, "index.html"),
  scss: path.resolve(__dirname, "src", "shared", "scss"),
};

export default (env: BuildEnv): Configuration => {
  const isDev = !env.production;

  return buildConfig({ paths, isDev });
};
