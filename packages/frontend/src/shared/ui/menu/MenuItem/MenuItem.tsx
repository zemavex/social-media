import type { FC } from "react";
import { Button, type ButtonProps } from "@/shared/ui/button";
import { classNames } from "@/shared/lib/utils";
import cls from "./MenuItem.module.scss";

type MenuItemProps = ButtonProps & {
  isToggled?: boolean;
};

export const MenuItem: FC<MenuItemProps> = ({
  className,
  children,
  isToggled,
  ...props
}) => {
  return (
    <Button
      className={classNames(className, cls.item, {
        [cls["item--toggled"]]: isToggled,
      })}
      {...props}
    >
      {children}
    </Button>
  );
};
