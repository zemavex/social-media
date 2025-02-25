const imagePattern = "svg|png|jpg";
const scssPattern = "scss";

/** @type {import("prettier").Config} */
const config = {
  plugins: ["@trivago/prettier-plugin-sort-imports"],
  importOrder: [
    "^react$",

    "<THIRD_PARTY_MODULES>",

    "^@/app(.*)$",
    "^@/pages/(.*)$",
    "^@/widgets/(.*)$",
    "^@/features/(.*)$",
    "^@/entities/(.*)$",

    "^@/shared/api(.*)$",
    "^@/shared/theme(.*)$",
    "^@/shared/ui/(.*)$",
    "^@/shared/lib/(.*)$",
    "^@/shared/config(.*)$",
    "^@/shared/styles/(.*)$",
    "^@/shared/(.*)$",

    "^@/(.*)$",

    `^[./](.*)(?<!\\.(${imagePattern}|${scssPattern}))$`,
    `^[./](.*)\\.(${imagePattern})$`,
    `^[./](.*)\\.${scssPattern}$`,
  ],
  importOrderSideEffects: false,
};

export default config;
