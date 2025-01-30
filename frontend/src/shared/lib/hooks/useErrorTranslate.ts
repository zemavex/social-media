import { useTranslation } from "react-i18next";
import type { SingleZodIssue } from "shared/lib";
import { ZodIssueCode } from "zod";

export const useErrorTranslate = () => {
  const { t } = useTranslation();

  const tZodIssue = (issue: SingleZodIssue) => {
    switch (issue.code) {
      case ZodIssueCode.invalid_string:
        return t("error.validation.invalid_string", { field: issue.path });
      case ZodIssueCode.too_small:
        return t("error.validation.too_small", {
          field: issue.path,
          min: issue.min,
        });
      case ZodIssueCode.too_big:
        return t("error.validation.too_big", {
          field: issue.path,
          max: issue.max,
        });
    }
  };

  return { tZodIssue };
};
