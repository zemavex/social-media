import type { FC } from "react";
import { Popper, type PopperProps } from "@/shared/ui/popper";
import cls from "./Menu.module.scss";

export const Menu: FC<PopperProps> = ({ children, ...props }) => {
  return (
    <Popper {...props}>
      <div className={cls.menu}>{children}</div>
    </Popper>
  );
};
