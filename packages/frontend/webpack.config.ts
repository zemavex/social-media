import path from "path";
import { Configuration } from "webpack";
import { BuildEnv, BuildPaths } from "./config/build/types/config";
import { buildConfig } from "./config/build/buildConfig";

const paths: BuildPaths = {
  entry: path.resolve(__dirname, "src", "index.tsx"),
  output: path.resolve(__dirname, "dist"),
  html: path.resolve(__dirname, "public", "index.html"),
  scss: path.resolve(__dirname, "src", "shared", "styles"),
};

export default (env: BuildEnv): Configuration => {
  const isDev = !env.production;

  return buildConfig({ paths, isDev });
};
