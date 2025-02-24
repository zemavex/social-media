import type { FC, SVGProps } from "react";
import { classNames } from "@/shared/lib/utils";
import LoaderCircle from "./assets/loader-circle.svg";
import cls from "./Loader.module.scss";

interface LoaderProps extends SVGProps<SVGElement> {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl" | "2xl";
}

export const Loader: FC<LoaderProps> = ({ className, size, ...props }) => {
  return (
    <LoaderCircle
      className={classNames(className, cls.loader, {
        [cls[`loader--${size}`]]: size,
      })}
      {...props}
    />
  );
};
