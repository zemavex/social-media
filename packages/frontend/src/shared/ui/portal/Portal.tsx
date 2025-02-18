import type { FC, ReactNode } from "react";
import { createPortal } from "react-dom";

interface PortalProps {
  children: ReactNode;
  parent?: HTMLElement;
}

export const Portal: FC<PortalProps> = ({
  children,
  parent = document.body,
}) => {
  return createPortal(children, parent);
};
