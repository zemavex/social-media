import type { ButtonHTMLAttributes, FC, RefObject } from "react";
import { classNames } from "@/shared/lib/utils";
import cls from "./Button.module.scss";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: "small" | "medium" | "large";
  variant?: "text" | "outlined" | "contained";
  color?: "primary" | "secondary" | "danger";
  iconOnly?: boolean;
  ref?: RefObject<HTMLButtonElement | null>;
}

export const Button: FC<ButtonProps> = ({
  children,
  className,
  size = "medium",
  variant = "text",
  color = "secondary",
  iconOnly,
  ref,
  ...props
}) => {
  return (
    <button
      ref={ref}
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
