import type { THEMES } from "../config/themeConstants";

export type Theme = (typeof THEMES)[keyof typeof THEMES];
