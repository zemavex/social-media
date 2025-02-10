import path from "path";
import type { ResolveOptions } from "webpack";

export function buildResolvers(): ResolveOptions {
  return {
    extensions: [".tsx", ".ts", ".js"],
    alias: {
      "@": path.join(__dirname, "..", "..", "src"),
      "~shared": path.join(__dirname, "..", "..", "..", "shared", "src"),
    },
  };
}
