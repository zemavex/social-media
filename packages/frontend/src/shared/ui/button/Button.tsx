import type { ButtonHTMLAttributes, FC } from "react";
import { classNames } from "@/shared/lib/utils";
import cls from "./Button.module.scss";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: string;
}

export const Button: FC<ButtonProps> = ({ children, className, ...props }) => {
  return (
    <button className={classNames(cls.button, className)} {...props}>
      {children}
    </button>
  );
};
