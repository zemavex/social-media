import { THEMES } from "../config/themeConstants";
import type { Theme } from "../model/themeTypes";

export const getSystemTheme = (): Theme => {
  if (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: light)").matches
  ) {
    return THEMES.LIGHT;
  }

  return THEMES.DARK;
};
