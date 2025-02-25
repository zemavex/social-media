import { useEffect } from "react";
import { useAppDispatch } from "@/shared/lib/redux";
import { THEMES } from "../config/themeConstants";
import { setCurrentTheme } from "./themeSlice";
import { useTheme } from "./useTheme";

export const useThemeEffect = () => {
  const { theme, isFollowingSystem } = useTheme();
  const dispatch = useAppDispatch();

  const handlePrefersDarkChanged = (e: MediaQueryListEvent) => {
    if (!isFollowingSystem) return;
    dispatch(setCurrentTheme(e.matches ? THEMES.DARK : THEMES.LIGHT));
  };

  useEffect(() => {
    document.documentElement.classList.remove(...Object.values(THEMES));
    document.documentElement.classList.add(theme);
  }, [theme]);

  useEffect(() => {
    const matchPrefersDark = window.matchMedia("(prefers-color-scheme: dark)");

    matchPrefersDark.addEventListener("change", handlePrefersDarkChanged);

    return () => {
      matchPrefersDark.removeEventListener("change", handlePrefersDarkChanged);
    };
  }, [handlePrefersDarkChanged]);
};
