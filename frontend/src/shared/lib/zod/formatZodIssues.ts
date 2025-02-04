import { ZodIssueCode, type ZodIssue } from "zod";
import type { FormattedZodIssuesRecord } from "./types";

export const formatZodIssues = <Keys extends string>(
  issues: ZodIssue[]
): FormattedZodIssuesRecord<Keys> => {
  const formattedIssues = {} as FormattedZodIssuesRecord<Keys>;

  issues.forEach((i) => {
    const path = i.path[0] as Keys;

    switch (i.code) {
      case ZodIssueCode.invalid_string:
        formattedIssues[path] = {
          code: i.code,
          path,
          validation: i.validation,
        };
        break;
      case ZodIssueCode.too_small:
        formattedIssues[path] = { code: i.code, path, min: i.minimum };
        break;
      case ZodIssueCode.too_big:
        formattedIssues[path] = { code: i.code, path, max: i.maximum };
        break;
    }
  });

  return formattedIssues;
};
