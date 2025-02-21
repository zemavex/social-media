import type { FC, ReactNode } from "react";
import cls from "./Divider.module.scss";

interface DividerProps {
  children?: ReactNode;
}

export const Divider: FC<DividerProps> = ({ children }) => {
  if (!children) return <div className={cls.divider} />;

  return (
    <div className={cls.divider__wrap}>
      <div className={cls.divider} />
      <span className={cls.divider__middle}>{children}</span>
      <div className={cls.divider} />
    </div>
  );
};
