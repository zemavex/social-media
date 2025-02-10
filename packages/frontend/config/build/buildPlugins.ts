import type { Configuration } from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import Dotenv from "dotenv-webpack";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import type { BuildOptions } from "./types/config";

export function buildPlugins(options: BuildOptions): Configuration["plugins"] {
  return [
    new HtmlWebpackPlugin({ template: options.paths.html }),
    new Dotenv(),
    new BundleAnalyzerPlugin({ openAnalyzer: false }),
  ];
}
