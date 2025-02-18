import type { FC } from "react";
import { Popper, type PopperProps } from "@/shared/ui/popper";
import cls from "./Menu.module.scss";

export const Menu: FC<PopperProps> = ({
  children,
  target,
  isOpen,
  onClose,
  placement,
}) => {
  return (
    <Popper
      target={target}
      isOpen={isOpen}
      onClose={onClose}
      placement={placement}
    >
      <div className={cls.menu}>{children}</div>
    </Popper>
  );
};
