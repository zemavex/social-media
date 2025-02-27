import { useTranslation } from "react-i18next";
import { UI_ROUTES } from "~shared/core";
import { selectUser } from "@/entities/user";
import { useAppSelector } from "@/shared/lib/redux";
import { SidebarLink } from "../SidebarLink/SidebarLink";
import ProfileIcon from "../assets/circle-user-round.svg";
import FriendsIcon from "../assets/contact-round.svg";
import MessengerIcon from "../assets/message-circle.svg";
import FeedIcon from "../assets/newspaper.svg";
import CommunitiesIcon from "../assets/users-round.svg";
import cls from "./Sidebar.module.scss";

export const Sidebar = () => {
  const user = useAppSelector(selectUser);
  const { t } = useTranslation();

  return (
    <div className={cls.sidebar}>
      <SidebarLink
        icon={<ProfileIcon />}
        to={user.username ? `/${user.username}` : `/u/${user.id}`}
      >
        {t("profile")}
      </SidebarLink>
      <SidebarLink icon={<FeedIcon />} to={UI_ROUTES.FEED}>
        {t("feed")}
      </SidebarLink>
      <SidebarLink icon={<MessengerIcon />} to={UI_ROUTES.MESSENGER}>
        {t("messenger")}
      </SidebarLink>
      <SidebarLink icon={<FriendsIcon />} to={UI_ROUTES.FRIENDS}>
        {t("friends")}
      </SidebarLink>
      <SidebarLink icon={<CommunitiesIcon />} to={UI_ROUTES.COMMUNITIES}>
        {t("communities")}
      </SidebarLink>
    </div>
  );
};
