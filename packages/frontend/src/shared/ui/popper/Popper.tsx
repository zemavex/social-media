import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type FC,
  type ReactNode,
  type RefObject,
} from "react";
import { Portal } from "@/shared/ui/portal";
import { classNames } from "@/shared/lib/utils";
import cls from "./Popper.module.scss";

export interface PopperProps {
  target: RefObject<HTMLElement | null>;
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  placement?: "bottom-start" | "bottom-end" | "top-start" | "top-end";
}

export const Popper: FC<PopperProps> = ({
  target,
  children,
  isOpen,
  onClose,
  placement = "bottom-start",
}) => {
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [isMeasuring, setIsMeasuring] = useState(true);
  const popperRef = useRef<HTMLDivElement>(null);

  const updatePosition = useCallback(() => {
    if (!target.current || !popperRef.current) return;

    const targetRect = target.current.getBoundingClientRect();
    const popperRect = popperRef.current.getBoundingClientRect();

    const spaceBelow = window.innerHeight - targetRect.bottom;
    const spaceAbove = targetRect.top;
    let verticalPosition: "bottom" | "top";
    if (placement.split("-")[0] === "bottom") {
      verticalPosition =
        spaceBelow > popperRect.height || spaceBelow > spaceAbove
          ? "bottom"
          : "top";
    } else {
      verticalPosition =
        spaceAbove > popperRect.height || spaceAbove > spaceBelow
          ? "top"
          : "bottom";
    }

    const top =
      verticalPosition === "bottom"
        ? targetRect.bottom + window.scrollY
        : targetRect.top + window.scrollY - popperRect.height;

    let left =
      placement.split("-")[1] === "start"
        ? targetRect.left + window.scrollX
        : targetRect.right + window.scrollX - popperRect.width;

    if (left + popperRect.width > document.documentElement.clientWidth) {
      left = document.documentElement.clientWidth - popperRect.width;
    }

    setPosition({ top, left: left < 0 ? 0 : left });
    setIsMeasuring(false);
  }, [placement]);

  useEffect(() => {
    if (!isOpen) return;

    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition);

    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition);
    };
  }, [isOpen, updatePosition]);

  useEffect(() => {
    if (isOpen) {
      setIsMeasuring(true);
      updatePosition();
    }
  }, [isOpen, updatePosition]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        !popperRef.current?.contains(e.target as Node) &&
        !target.current?.contains(e.target as Node)
      ) {
        onClose();
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <Portal>
      <div
        ref={popperRef}
        className={classNames(cls.popper, {
          [cls["popper--measuring"]]: isMeasuring,
        })}
        style={position}
      >
        {children}
      </div>
    </Portal>
  );
};
