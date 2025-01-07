import { AxiosError } from "axios";
import { setIsAuthenticated } from "entities/user";
import { apiInstance } from "shared/api";

export const setupAuthApiInterceptors = (dispatch: AppDispatchGlobal) => {
  apiInstance.interceptors.response.use(
    (res) => res,
    (error) => {
      if (!(error instanceof AxiosError)) return Promise.reject(error);
      if (error.status !== 401) return Promise.reject(error);

      dispatch(setIsAuthenticated(false));

      return Promise.reject(error);
    }
  );
};
