import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/shared/ui/button";
import { Menu, MenuItem } from "@/shared/ui/menu";
import DefaultAvatar from "@/shared/assets/default-avatar.jpg";
import { useLogout } from "../model/useLogout";
import LogoutIcon from "../assets/log-out.svg";
import cls from "./UserMenu.module.scss";

export const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const avatarBtnRef = useRef(null);
  const { isLoggingOut, logout } = useLogout();
  const { t } = useTranslation();

  const handleLogout = async () => {
    await logout(() => setIsOpen(false));
  };

  return (
    <>
      <Button
        iconOnly
        ref={avatarBtnRef}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <img
          src={DefaultAvatar}
          className={cls["user-menu__img"]}
          draggable={false}
        />
      </Button>
      <Menu
        target={avatarBtnRef}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        placement="bottom-end"
        offset={{ y: 10 }}
      >
        <MenuItem
          startIcon={<LogoutIcon />}
          color="danger"
          onClick={handleLogout}
          isLoading={isLoggingOut}
          loadingPosition="start"
        >
          {t("logout")}
        </MenuItem>
      </Menu>
    </>
  );
};
