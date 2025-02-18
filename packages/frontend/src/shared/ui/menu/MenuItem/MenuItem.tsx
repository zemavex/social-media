import type { FC } from "react";
import { Button, type ButtonProps } from "@/shared/ui/button";
import { classNames } from "@/shared/lib/utils";
import cls from "./MenuItem.module.scss";

interface MenuItemProps extends ButtonProps {
  isActive?: boolean;
}

export const MenuItem: FC<MenuItemProps> = ({
  className,
  children,
  isActive,
  ...props
}) => {
  return (
    <Button
      className={classNames(className, cls.item, {
        [cls["item--active"]]: isActive,
      })}
      {...props}
    >
      {children}
    </Button>
  );
};
