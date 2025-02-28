import { useState } from "react";
import { API_ERROR_CODES, type ApiErrorCode } from "~shared/core";
import {
  apiFetchUserProfileById,
  mapUserProfileDTOToLocal,
  type UserProfile,
} from "@/entities/user";
import { isAxiosError } from "@/shared/api";

export const useFetchProfile = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [apiErrorCode, setApiErrorCode] = useState<ApiErrorCode | null>(null);

  const fetchProfileById = async (userId: number) => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const fetchedProfile = await apiFetchUserProfileById(userId);
      setProfile(mapUserProfileDTOToLocal(fetchedProfile));
    } catch (err) {
      if (isAxiosError(err) && err.response) {
        setApiErrorCode(err.response.data.code);
      } else {
        setApiErrorCode(API_ERROR_CODES.UNKNOWN_ERROR);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { profile, isLoading, apiErrorCode, fetchProfileById };
};
