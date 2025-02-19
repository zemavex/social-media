import type { FC } from "react";
import { Link, type LinkProps } from "react-router";
import cls from "./AppLink.module.scss";
import { classNames } from "@/shared/lib/utils";

interface AppLinkProps extends LinkProps {
  size?: "small" | "medium" | "large";
  color?: "primary" | "secondary";
  withUnderline?: boolean;
}

export const AppLink: FC<AppLinkProps> = ({
  children,
  className,
  size = "medium",
  color = "secondary",
  withUnderline = true,
  ...props
}) => {
  return (
    <Link
      {...props}
      className={classNames(
        className,
        cls["app-link"],
        cls[`app-link--${size}`],
        cls[`app-link--${color}`],
        { [cls["app-link--underline"]]: withUnderline }
      )}
    >
      {children}
    </Link>
  );
};
