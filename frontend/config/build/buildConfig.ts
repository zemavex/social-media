import type { Configuration } from "webpack";
import type { BuildOptions } from "./types/config";
import { buildLoaders } from "./buildLoaders";
import { buildPlugins } from "./buildPlugins";
import { buildResolvers } from "./buildResolvers";
import "webpack-dev-server";

export const buildConfig = (options: BuildOptions): Configuration => {
  return {
    mode: options.isDev ? "development" : "production",
    entry: options.paths.entry,
    devtool: "source-map",
    devServer: {
      historyApiFallback: true,
    },
    output: {
      path: options.paths.output,
      publicPath: "/",
      filename: "[name].[contenthash].js",
      clean: true,
    },
    module: {
      rules: buildLoaders(),
    },
    plugins: buildPlugins(options),
    resolve: buildResolvers(),
  };
};
