import type { AxiosError } from "axios";
import { unauthenticateUser } from "@/entities/user";
import { apiInstance } from "@/shared/api";

export const setupAuthApiInterceptors = (dispatch: AppDispatch) => {
  apiInstance.interceptors.response.use(
    (res) => res,
    (error: AxiosError) => {
      if (error.status !== 401) return Promise.reject(error);

      dispatch(unauthenticateUser());

      return Promise.reject(error);
    },
  );
};
