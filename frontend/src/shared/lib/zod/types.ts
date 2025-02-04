import { ZodIssueCode, type StringValidation } from "zod";

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

export type FormattedZodIssue =
  | InvalidStringIssue
  | TooSmallIssue
  | TooBigIssue;

export type FormattedZodIssuesRecord<Keys extends string> = Record<
  Keys,
  FormattedZodIssue
>;
