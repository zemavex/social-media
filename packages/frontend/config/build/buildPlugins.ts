import Dotenv from "dotenv-webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import CopyPlugin from "copy-webpack-plugin";
import type { Configuration } from "webpack";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import type { BuildOptions } from "./types/config";

export function buildPlugins(options: BuildOptions): Configuration["plugins"] {
  const devPlugins = [
    new BundleAnalyzerPlugin({ openAnalyzer: false }),
  ]
  
  return [
    new HtmlWebpackPlugin({ template: options.paths.html }),
    new MiniCssExtractPlugin({
      filename: "css/[name].[contenthash].css",
      chunkFilename: "css/[name].[contenthash].css",
    }),
    new Dotenv(),
    new CopyPlugin({patterns: [
      {from: options.paths.public, to: options.paths.output}
    ]}),
    ...(options.isDev ? devPlugins : [])
  ];
}
