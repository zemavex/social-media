import type { FC, InputHTMLAttributes } from "react";
import { classNames } from "@/shared/lib/utils";
import cls from "./Input.module.scss";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  inputSize?: "small" | "medium" | "large";
  label?: string;
  error?: string;
}

export const Input: FC<InputProps> = ({
  inputSize = "medium",
  label,
  error,
  className,
  id,
  ...props
}) => {
  return (
    <div className={cls.input__wrap}>
      {label && id && (
        <label
          htmlFor={id}
          className={classNames(cls.label, cls[`label--${inputSize}`], {
            [cls["label--error"]]: error,
          })}
        >
          {label}
        </label>
      )}
      <input
        id={id}
        className={classNames(
          className,
          cls.input,
          cls[`input--${inputSize}`],
          { [cls["input--error"]]: error },
        )}
        autoComplete="off"
        {...props}
      />
      {error && (
        <span
          className={classNames(
            cls.input__error,
            cls[`input__error--${inputSize}`],
          )}
        >
          {error}
        </span>
      )}
    </div>
  );
};
