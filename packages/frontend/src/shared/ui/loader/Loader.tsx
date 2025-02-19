import type { FC, SVGProps } from "react";
import LoaderCircle from "./assets/loader-circle.svg";
import cls from "./Loader.module.scss";

interface LoaderProps extends SVGProps<SVGElement> {
  className?: string;
}

export const Loader: FC<LoaderProps> = ({ className, ...props }) => {
  return <LoaderCircle className={`${cls.loader} ${className}`} {...props} />;
};
