import type { WebpackPluginInstance } from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import type { BuildOptions } from "./types/config";

export function buildPlugins(options: BuildOptions): WebpackPluginInstance[] {
  return [new HtmlWebpackPlugin({ template: options.paths.html })];
}
