import type { FC, ReactNode } from "react";
import cls from "./EditProfileItem.module.scss";

interface EditProfileItemProps {
  children: ReactNode;
  label: string;
}

export const EditProfileItem: FC<EditProfileItemProps> = ({
  children,
  label,
}) => {
  return (
    <div className={cls["edit-profile-page__item"]}>
      <div className={cls["edit-profile-page__item-label"]}>{`${label}:`}</div>
      <div className={cls["edit-profile-page__item-content"]}>{children}</div>
    </div>
  );
};
