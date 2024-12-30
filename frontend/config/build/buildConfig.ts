import { Configuration } from "webpack";
import { BuildOptions } from "./types/config";
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
      filename: "[name].[contenthash].js",
      clean: true,
    },
    module: {
      rules: buildLoaders(options),
    },
    plugins: buildPlugins(options),
    resolve: buildResolvers(options),
  };
};
