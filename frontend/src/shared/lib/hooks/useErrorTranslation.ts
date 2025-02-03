import { useTranslation } from "react-i18next";
import { ZodIssueCode } from "zod";
import type { ApiErrorCode } from "shared/api";
import type { SingleZodIssue } from "shared/lib/zod";

interface ZodIssueOptions {
  scope: "validation";
  issue: SingleZodIssue;
}

interface ApiErrorOptions {
  scope: "api";
  code: ApiErrorCode;
}

interface GeneralErrorOptions {
  scope: "general";
  code: string;
}

export type TranslateErrorOptions =
  | ZodIssueOptions
  | ApiErrorOptions
  | GeneralErrorOptions;

export const useErrorTranslation = () => {
  const { t } = useTranslation();

  const translateZodIssue = (issue: SingleZodIssue) => {
    const translationBase = "error.validation";

    switch (issue.code) {
      case ZodIssueCode.invalid_string:
        return t(`${translationBase}.invalid_string`, { field: issue.path });
      case ZodIssueCode.too_small:
        return t(`${translationBase}.too_small`, {
          field: issue.path,
          min: issue.min,
        });
      case ZodIssueCode.too_big:
        return t(`${translationBase}.too_big`, {
          field: issue.path,
          max: issue.max,
        });
      default:
        return t("error.app.unknown_error");
    }
  };

  const translateError = (options: TranslateErrorOptions): string => {
    if (options.scope === "validation") {
      return translateZodIssue(options.issue);
    }

    return t([
      `error.${options.scope}.${options.code}`,
      "error.general.unknown_error",
    ]);
  };

  return { translateError };
};
