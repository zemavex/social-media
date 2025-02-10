import { useTranslation } from "react-i18next";
import { ZodIssueCode } from "zod";
import type { ApiErrorCode } from "~shared/constants";
import { UNKNOWN_ISSUE, type FormattedZodIssue } from "@/shared/lib/zod";

interface ZodIssueOptions {
  scope: "validation";
  issue: FormattedZodIssue;
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

  const translateZodIssue = (issue: FormattedZodIssue) => {
    let tPath = "error.validation.";
    let tParams: Record<string, unknown> = {};

    switch (issue.code) {
      case ZodIssueCode.invalid_string:
        tPath += issue.code;
        tParams = { field: issue.path };
        break;
      case ZodIssueCode.too_small:
        tPath += issue.code;
        tParams = { field: issue.path, min: issue.min };
        break;
      case ZodIssueCode.too_big:
        tPath += issue.code;
        tParams = { field: issue.path, max: issue.max };
        break;
      case ZodIssueCode.invalid_type:
        tPath += issue.code;
        tParams = { field: issue.path };
        break;
      case UNKNOWN_ISSUE:
        tPath += issue.code;
        break;
      default:
        tPath = "error.general.unknown_error";
        break;
    }

    return t(tPath, tParams);
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
