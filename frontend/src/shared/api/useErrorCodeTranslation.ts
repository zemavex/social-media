import { useTranslation } from "react-i18next";
import type { ErrorCode } from "./errorCodes";

export const useErrorCodeTranslation = () => {
  const { t } = useTranslation("translation", { keyPrefix: "error.code" });

  const tErrorCode = (errorCode: ErrorCode) => {
    return t([errorCode, "unknown_error"]);
  };

  return { tErrorCode };
};
