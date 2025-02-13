import type { RuleSetRule } from "webpack";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import type { BuildOptions } from "./types/config";

export function buildLoaders(options: BuildOptions): RuleSetRule[] {
  const typescriptLoader = {
    test: /\.tsx?$/,
    use: "ts-loader",
    exclude: /node_modules/,
  };

  const sassLoader = {
    test: /\.s[ac]ss$/i,
    use: [
      options.isDev ? "style-loader" : MiniCssExtractPlugin.loader,
      {
        loader: "css-loader",
        options: {
          modules: {
            localIdentName: options.isDev
              ? "[path][name]__[local]--[hash:base64:5]"
              : "[hash:base64:8]",
            auto: /\.module\.s[ac]ss$/i,
            namedExport: false,
            exportLocalsConvention: "as-is",
          },
        },
      },
      "sass-loader",
    ],
  };

  const fontLoader = {
    test: /\.(woff|woff2|eot|ttf|otf)$/i,
    type: "asset/resource",
  };

  const svgLoader = {
    test: /\.svg$/i,
    issuer: /\.[jt]sx?$/,
    use: ["@svgr/webpack"],
  };

  return [typescriptLoader, sassLoader, fontLoader, svgLoader];
}
