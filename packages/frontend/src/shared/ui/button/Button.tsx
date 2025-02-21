import type { ButtonHTMLAttributes, FC, JSX, RefObject } from "react";
import { Loader } from "@/shared/ui/loader";
import { classNames } from "@/shared/lib/utils";
import cls from "./Button.module.scss";

interface ButtonPropsBase extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: "small" | "medium" | "large";
  variant?: "text" | "outlined" | "contained";
  color?: "primary" | "secondary" | "danger" | "text";
  ref?: RefObject<HTMLButtonElement | null>;
  isLoading?: boolean;
}

interface ButtonPropsWithIcons extends ButtonPropsBase {
  iconOnly?: false;
  startIcon?: JSX.Element;
  endIcon?: JSX.Element;
  loadingPosition?: "start" | "center" | "end";
}

interface ButtonPropsIconOnly extends ButtonPropsBase {
  iconOnly: true;
  startIcon?: never;
  endIcon?: never;
  loadingPosition?: never;
}

export type ButtonProps = ButtonPropsWithIcons | ButtonPropsIconOnly;

export const Button: FC<ButtonProps> = ({
  children,
  className,
  size = "medium",
  variant = "text",
  color = "secondary",
  iconOnly,
  startIcon,
  endIcon,
  isLoading,
  loadingPosition = "center",
  disabled,
  ref,
  type = "button",
  ...props
}) => {
  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      ref={ref}
      className={classNames(
        className,
        cls.btn,
        cls[`btn--variant-${variant}`],
        cls[`btn--color-${color}`],
        cls[`btn--size-${size}`],
        {
          [cls["btn--icon-only"]]: iconOnly,
          [cls["btn--text-transparent"]]:
            isLoading && loadingPosition === "center",
        }
      )}
      {...props}
    >
      {isLoading && loadingPosition === "start" ? <Loader /> : startIcon}
      {children}
      {isLoading && loadingPosition === "end" ? <Loader /> : endIcon}

      {isLoading && loadingPosition === "center" && (
        <div className={cls["btn__loader-center"]}>
          <Loader />
        </div>
      )}
    </button>
  );
};
