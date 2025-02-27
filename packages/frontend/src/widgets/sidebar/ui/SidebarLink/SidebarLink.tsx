import type { FC, JSX } from "react";
import { type LinkProps } from "react-router";
import { Button } from "@/shared/ui/button";
import cls from "./SidebarLink.module.scss";

interface SidebarLinkProps extends LinkProps {
  icon: JSX.Element;
  to: string;
}

export const SidebarLink: FC<SidebarLinkProps> = ({ icon, children, to }) => {
  return (
    <Button
      startIcon={icon}
      size="small"
      className={cls["sidebar-link"]}
      to={to}
    >
      {children}
    </Button>
  );
};
