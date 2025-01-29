import { ZodIssueCode, type StringValidation, type ZodIssue } from "zod";

interface InvalidStringIssue {
  code: (typeof ZodIssueCode)["invalid_string"];
  validation: StringValidation;
}

interface TooSmallIssue {
  code: (typeof ZodIssueCode)["too_small"];
  minimum: number | bigint;
}

interface TooBigIssue {
  code: (typeof ZodIssueCode)["too_big"];
  maximum: number | bigint;
}

export type FormattedZodIssues<Keys extends string> = Record<
  Keys,
  InvalidStringIssue | TooSmallIssue | TooBigIssue
>;

export const formatZodIssues = <Keys extends string>(
  issues: ZodIssue[]
): FormattedZodIssues<Keys> => {
  const formattedIssues = {} as FormattedZodIssues<Keys>;

  issues.forEach((i) => {
    const path = i.path[0] as Keys;

    switch (i.code) {
      case ZodIssueCode.invalid_string:
        formattedIssues[path] = {
          code: i.code,
          validation: i.validation,
        };
        break;
      case ZodIssueCode.too_small:
        formattedIssues[path] = { code: i.code, minimum: i.minimum };
        break;
      case ZodIssueCode.too_big:
        formattedIssues[path] = { code: i.code, maximum: i.maximum };
        break;
    }
  });

  return formattedIssues;
};
