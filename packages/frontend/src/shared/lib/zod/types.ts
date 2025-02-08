import { ZodIssueCode, type StringValidation } from "zod";

export const UNKNOWN_ISSUE = "unknown_issue";

interface InvalidStringIssue {
  code: typeof ZodIssueCode.invalid_string;
  path: string;
  validation: StringValidation;
}

interface TooSmallIssue {
  code: typeof ZodIssueCode.too_small;
  path: string;
  min: number | bigint;
}

interface TooBigIssue {
  code: typeof ZodIssueCode.too_big;
  path: string;
  max: number | bigint;
}

interface InvalidTypeIssue {
  code: typeof ZodIssueCode.invalid_type;
  path: string;
}

interface UnknownIssue {
  code: typeof UNKNOWN_ISSUE;
  path: string;
}

export type FormattedZodIssue =
  | InvalidStringIssue
  | TooSmallIssue
  | TooBigIssue
  | InvalidTypeIssue
  | UnknownIssue;

export type FormattedZodIssuesRecord<Keys extends string> = Record<
  Keys,
  FormattedZodIssue
>;
