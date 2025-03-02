import { useEffect } from "react";
import { useParams } from "react-router";
import { NotFoundPage } from "@/pages/not-found";
import { Button } from "@/shared/ui/button";
import { Loader } from "@/shared/ui/loader";
import DefaultAvatar from "@/shared/assets/default-avatar.jpg";
import { useFetchProfile } from "../model/useFetchProfile";
import cls from "./ProfilePage.module.scss";

export const ProfilePage = () => {
  const { id } = useParams();
  const parsedId = Number(id);
  if (!parsedId || isNaN(parsedId)) {
    return <NotFoundPage />;
  }

  const { profile, isLoading, apiErrorCode, fetchProfileById } =
    useFetchProfile();

  useEffect(() => {
    fetchProfileById(parsedId);
  }, [id]);

  if (apiErrorCode) {
    return <NotFoundPage />;
  }

  if (isLoading) return <Loader size="2xl" />;
  if (!profile) return <div>profile not found</div>;

  return (
    <div className={cls["profile-page"]}>
      <div className={cls["profile-page__left"]}>
        <div className={`page-block ${cls["profile-page__avatar-section"]}`}>
          <div className={cls.avatar__wrap}>
            <img src={DefaultAvatar} className={cls.avatar} draggable={false} />
          </div>
          <Button variant="outlined" color="primary">
            Edit profile
          </Button>
        </div>
      </div>
      <div className={cls["profile-page__right"]}>
        <div className={`page-block ${cls["profile-page__info"]}`}>
          <p className={cls["full-name"]}>{profile.full_name}</p>
        </div>
      </div>
    </div>
  );
};
