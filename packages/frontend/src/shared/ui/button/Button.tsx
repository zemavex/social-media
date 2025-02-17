import type { ButtonHTMLAttributes, FC } from "react";
import { classNames } from "@/shared/lib/utils";
import cls from "./Button.module.scss";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: "small" | "medium" | "large";
  variant?: "text" | "outlined" | "contained";
  color?: "primary" | "secondary" | "danger";
  iconOnly?: boolean;
}

export const Button: FC<ButtonProps> = ({
  children,
  className,
  size = "medium",
  variant = "text",
  color = "secondary",
  iconOnly,
  ...props
}) => {
  console.log(cls.btn_icon_only);
  return (
    <button
      className={classNames(
        className,
        cls.btn,
        cls[`btn--variant-${variant}`],
        cls[`btn--color-${color}`],
        cls[`btn--size-${size}`],
        {
          [cls["btn--icon-only"]]: iconOnly,
        }
      )}
      {...props}
    >
      {children}
    </button>
  );
};
