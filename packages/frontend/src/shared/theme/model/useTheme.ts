import { useAppDispatch, useAppSelector } from "@/shared/lib/redux";
import { storage, STORAGE_KEYS } from "@/shared/lib/storage";
import { getSystemTheme } from "../lib/getSystemTheme";
import { selectThemeState } from "./themeSelectors";
import { setCurrentTheme, setIsFollowingSystem } from "./themeSlice";
import type { Theme } from "./themeTypes";

export const useTheme = () => {
  const { currentTheme, isFollowingSystem } = useAppSelector(selectThemeState);
  const dispatch = useAppDispatch();

  const setTheme = (newTheme: Theme) => {
    dispatch(setCurrentTheme(newTheme));
    dispatch(setIsFollowingSystem(false));
    storage.set(STORAGE_KEYS.THEME, newTheme);
  };

  const setThemeToFollowSystem = () => {
    dispatch(setCurrentTheme(getSystemTheme()));
    dispatch(setIsFollowingSystem(true));
    storage.remove(STORAGE_KEYS.THEME);
  };

  return {
    theme: currentTheme,
    isFollowingSystem,
    setTheme,
    setThemeToFollowSystem,
  };
};
