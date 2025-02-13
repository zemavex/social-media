import { useState } from "react";
import { Button } from "@/shared/ui/button";
import { useTheme } from "../model/useTheme";
import { THEMES } from "../config/themeConstants";
import Moon from "../assets/moon.svg";
import Sun from "../assets/sun.svg";

export const ThemeSwitcher = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, isFollowingSystem, setTheme, setThemeToFollowSystem } =
    useTheme();

  const ThemeIcon = () => {
    switch (theme) {
      case THEMES.DARK:
        return <Moon />;
      case THEMES.LIGHT:
        return <Sun />;
    }
  };

  return (
    <div>
      <Button onClick={() => setIsOpen((prev) => !prev)}>
        <ThemeIcon />
      </Button>
      {isOpen && (
        <>
          <div>theme: {theme}</div>
          <div>following system: {isFollowingSystem ? "yes" : "no"}</div>
          <button onClick={() => setTheme(THEMES.DARK)}>set dark theme</button>
          <button onClick={() => setTheme(THEMES.LIGHT)}>
            set light theme
          </button>
          <button onClick={() => setThemeToFollowSystem()}>
            set to follow system
          </button>
        </>
      )}
    </div>
  );
};
