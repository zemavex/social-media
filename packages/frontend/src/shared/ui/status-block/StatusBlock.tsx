import type { FC, ReactNode } from "react";
import { classNames } from "@/shared/lib/utils";
import SuccessIcon from "./assets/circle-check.svg";
import ErrorIcon from "./assets/circle-x.svg";
import cls from "./StatusBlock.module.scss";

interface StatusBlockProps {
  children: ReactNode;
  className?: string;
  status: "error" | "success";
}

export const StatusBlock: FC<StatusBlockProps> = ({
  children,
  className,
  status,
}) => {
  const StatusIcon = () => {
    switch (status) {
      case "error":
        return <ErrorIcon />;
      case "success":
        return <SuccessIcon />;
    }
  };

  return (
    <div
      className={classNames(
        className,
        cls["status-block"],
        cls[`status-block--${status}`],
      )}
    >
      <StatusIcon />
      <p>{children}</p>
    </div>
  );
};
