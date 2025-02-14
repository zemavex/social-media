import type { ButtonHTMLAttributes, FC } from "react";
import { classNames } from "@/shared/lib/utils";
import cls from "./Button.module.scss";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "text" | "outlined" | "contained";
  color?: "primary" | "secondary" | "danger";
  size?: "small" | "medium" | "large";
  hasPressedEffect?: boolean;
}

export const Button: FC<ButtonProps> = ({
  children,
  className,
  variant = "text",
  color = "secondary",
  size = "medium",
  hasPressedEffect = true,
  ...props
}) => {
  return (
    <button
      className={classNames(className, cls.btn, {
        [cls[`btn_variant_${variant}`]]: variant,
        [cls[`btn_color_${color}`]]: color,
        [cls[`btn_size_${size}`]]: size,
      })}
      {...props}
    >
      <span
        className={classNames(cls.btn__container, {
          [cls["btn__container_pressed"]]: hasPressedEffect,
        })}
      >
        {children}
      </span>
    </button>
  );
};
