import { useTheme } from "../model/useTheme";
import { THEMES } from "../config/themeConstants";

export const ThemeSwitcher = () => {
  const { theme, isFollowingSystem, setTheme, setThemeToFollowSystem } =
    useTheme();

  return (
    <div>
      <div>theme: {theme}</div>
      <div>following system: {isFollowingSystem ? "yes" : "no"}</div>
      <button onClick={() => setTheme(THEMES.DARK)}>set dark theme</button>
      <button onClick={() => setTheme(THEMES.LIGHT)}>set light theme</button>
      <button onClick={() => setThemeToFollowSystem()}>
        set to follow system
      </button>
    </div>
  );
};
