import { useTranslation } from "react-i18next";
import { ROUTES } from "@/shared/config";
import { SidebarLink } from "../SidebarLink/SidebarLink";
import ProfileIcon from "../assets/circle-user-round.svg";
import FriendsIcon from "../assets/contact-round.svg";
import MessengerIcon from "../assets/message-circle.svg";
import NewsIcon from "../assets/newspaper.svg";
import CommunitiesIcon from "../assets/users-round.svg";
import cls from "./Sidebar.module.scss";

export const Sidebar = () => {
  const { t } = useTranslation();

  return (
    <div className={cls.sidebar}>
      <SidebarLink icon={<ProfileIcon />} to={ROUTES.PROFILE}>
        {t("profile")}
      </SidebarLink>
      <SidebarLink icon={<NewsIcon />} to={ROUTES.NEWS}>
        {t("news")}
      </SidebarLink>
      <SidebarLink icon={<MessengerIcon />} to={ROUTES.MESSENGER}>
        {t("messenger")}
      </SidebarLink>
      <SidebarLink icon={<FriendsIcon />} to={ROUTES.FRIENDS}>
        {t("friends")}
      </SidebarLink>
      <SidebarLink icon={<CommunitiesIcon />} to={ROUTES.COMMUNITIES}>
        {t("communities")}
      </SidebarLink>
    </div>
  );
};
