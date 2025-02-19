import { useRef, useState, type FC } from "react";
import { Menu, MenuItem } from "@/shared/ui/menu";
import type { PopperProps } from "@/shared/ui/popper";
import { Button } from "@/shared/ui/button";
import { useTheme } from "../model/useTheme";
import type { Theme } from "../model/themeTypes";
import { THEMES } from "../config/themeConstants";
import Moon from "../assets/moon.svg";
import Sun from "../assets/sun.svg";
import Monitor from "../assets/monitor.svg";

interface ThemeSwitcherProps {
  dropdownPlacement?: PopperProps["placement"];
  dropdownOffset?: PopperProps["offset"];
}

export const ThemeSwitcher: FC<ThemeSwitcherProps> = ({
  dropdownPlacement,
  dropdownOffset,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);
  const { theme, isFollowingSystem, setTheme, setThemeToFollowSystem } =
    useTheme();

  const handleThemeSelect = (theme: Theme | "system") => {
    if (theme === "system") {
      setThemeToFollowSystem();
    } else {
      setTheme(theme);
    }
    setIsOpen(false);
  };

  const CurrentThemeIcon = () => {
    switch (theme) {
      case THEMES.DARK:
        return <Moon />;
      case THEMES.LIGHT:
        return <Sun />;
    }
  };

  return (
    <>
      <Button onClick={() => setIsOpen((prev) => !prev)} iconOnly ref={btnRef}>
        <CurrentThemeIcon />
      </Button>
      <Menu
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        target={btnRef}
        placement={dropdownPlacement}
        offset={dropdownOffset}
      >
        <MenuItem
          isToggled={theme === THEMES.LIGHT && !isFollowingSystem}
          onClick={() => handleThemeSelect(THEMES.LIGHT)}
          startIcon={<Sun />}
        >
          Light
        </MenuItem>
        <MenuItem
          isToggled={theme === THEMES.DARK && !isFollowingSystem}
          onClick={() => handleThemeSelect(THEMES.DARK)}
          startIcon={<Moon />}
        >
          Dark
        </MenuItem>
        <MenuItem
          isToggled={isFollowingSystem}
          onClick={() => handleThemeSelect("system")}
          startIcon={<Monitor />}
        >
          System
        </MenuItem>
      </Menu>
    </>
  );
};
