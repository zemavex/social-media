import type { ComponentPropsWithRef, FC, JSX, Ref } from "react";
import { Link, type LinkProps } from "react-router";
import { Loader } from "@/shared/ui/loader";
import { classNames } from "@/shared/lib/utils";
import type { Route } from "@/shared/config";
import cls from "./Button.module.scss";

interface WithIconsProps {
  iconOnly?: undefined;
  startIcon?: JSX.Element;
  endIcon?: JSX.Element;
}

interface IconOnlyProps {
  iconOnly: true;
  startIcon?: undefined;
  endIcon?: undefined;
}

type ButtonPropsBase = {
  size?: "small" | "medium" | "large";
  variant?: "text" | "outlined" | "contained";
  color?: "primary" | "secondary" | "danger" | "text";
} & (WithIconsProps | IconOnlyProps);

interface LoadingPositionProps {
  iconOnly?: undefined;
  loadingPosition?: "start" | "center" | "end";
}

interface NoLoadingPositionProps {
  iconOnly: true;
  loadingPosition?: undefined;
}

type NativeButtonProps = ComponentPropsWithRef<"button"> &
  ButtonPropsBase &
  (LoadingPositionProps | NoLoadingPositionProps) & {
    to?: undefined;
    isLoading?: boolean;
  };

type LinkButtonProps = LinkProps &
  ButtonPropsBase & {
    to: Route;
    ref?: Ref<HTMLAnchorElement>;
  };

export type ButtonProps = NativeButtonProps | LinkButtonProps;

export const Button: FC<ButtonProps> = ({
  children,
  className,
  size = "medium",
  variant = "text",
  color = "secondary",
  iconOnly,
  startIcon,
  endIcon,
  ...rest
}) => {
  const commonClassNames = classNames(
    className,
    cls.btn,
    cls[`btn--variant-${variant}`],
    cls[`btn--color-${color}`],
    cls[`btn--size-${size}`],
    {
      [cls["btn--icon-only"]]: iconOnly,
    },
  );

  if (rest.to) {
    return (
      <Link className={commonClassNames} {...rest}>
        {startIcon}
        {children}
        {endIcon}
      </Link>
    );
  }

  const {
    type,
    disabled,
    isLoading,
    loadingPosition = "center",
    ...restBtn
  } = rest;

  return (
    <button
      type={type || "button"}
      disabled={disabled || isLoading}
      className={classNames(commonClassNames, {
        [cls["btn--text-transparent"]]:
          isLoading && loadingPosition === "center",
      })}
      {...restBtn}
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
