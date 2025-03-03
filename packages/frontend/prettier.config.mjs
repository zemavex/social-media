const imagePattern = "svg|png|jpg";
const scssPattern = "scss";

/** @type {import("prettier").Config} */
const config = {
  plugins: ["@trivago/prettier-plugin-sort-imports"],
  importOrder: [
    "^react$",

    "<THIRD_PARTY_MODULES>",

    "^~shared/(.*)$",

    "^@/app(.*)$",
    "^@/pages/(.*)$",
    "^@/widgets/(.*)$",
    "^@/features/(.*)$",
    "^@/entities/(.*)$",
    "^@/shared/(.*)$",
    "^@/(.*)$",

    `^[./](.*)(?<!\\.(${imagePattern}|${scssPattern}))$`,
    `^[./](.*)\\.(${imagePattern})$`,
    `^[./](.*)\\.${scssPattern}$`,
  ],
  importOrderSideEffects: false,
};

export default config;
