import { useTranslation } from "react-i18next";
import { ZodIssueCode } from "zod";
import type { SingleZodIssue } from "./types";

export const useZodIssueTranslation = () => {
  const { t } = useTranslation("translation", {
    keyPrefix: "error.validation",
  });

  const tZodIssue = (issue: SingleZodIssue) => {
    switch (issue.code) {
      case ZodIssueCode.invalid_string:
        return t("invalid_string", { field: issue.path });
      case ZodIssueCode.too_small:
        return t("too_small", {
          field: issue.path,
          min: issue.min,
        });
      case ZodIssueCode.too_big:
        return t("too_big", {
          field: issue.path,
          max: issue.max,
        });
      default:
        return t("unknown_error");
    }
  };

  return { tZodIssue };
};
