import { ZodIssueCode, type StringValidation } from "zod";

interface InvalidStringIssue {
  code: typeof ZodIssueCode.invalid_string;
  validation: StringValidation;
}

interface TooSmallIssue {
  code: typeof ZodIssueCode.too_small;
  minimum: number | bigint;
}

interface TooBigIssue {
  code: typeof ZodIssueCode.too_big;
  maximum: number | bigint;
}

export type SingleZodIssue = InvalidStringIssue | TooSmallIssue | TooBigIssue;

export type FormattedZodIssues<Keys extends string> = Record<
  Keys,
  SingleZodIssue
>;
