import { useState, useRef, useCallback, useEffect } from "react";
import type { ZodIssue, ZodType } from "zod";
import { API_ERROR_CODES, type ApiErrorCode } from "~shared/core";
import type { UserAuthDTO } from "~shared/user";
import { authenticateUser } from "@/entities/user";
import { isAxiosError, isValidationFailed } from "@/shared/api";
import { useAppDispatch } from "@/shared/lib/redux";
import { debounce } from "@/shared/lib/utils";
import {
  formatZodIssues,
  type FormattedZodIssuesRecord,
} from "@/shared/lib/zod";

interface UseAuthFormOptions<Payload> {
  apiCall: (payload: Payload) => Promise<UserAuthDTO>;
  validationSchema: ZodType<Payload>;
  initialFormData: Payload;
}

interface FormErrors<Keys extends string> {
  general?: ApiErrorCode;
  fields?: FormattedZodIssuesRecord<Keys>;
}

export const useAuthForm = <Payload extends Record<string, unknown>>({
  apiCall,
  validationSchema,
  initialFormData,
}: UseAuthFormOptions<Payload>) => {
  const [formData, setFormData] = useState<Payload>(initialFormData);
  const [isPending, setIsPending] = useState(false);
  const [errors, setErrors] = useState<FormErrors<keyof Payload & string>>({});
  const formDataRef = useRef(formData);
  const hasSubmitted = useRef(false);
  const dispatch = useAppDispatch();

  const setValidationErrors = (issues: ZodIssue[]) => {
    setErrors((prev) => ({
      ...prev,
      fields: formatZodIssues(issues),
    }));
  };

  const validate = (dataToValidate = formData): boolean => {
    const result = validationSchema.safeParse(dataToValidate);

    setErrors((prev) => ({ general: prev.general }));
    if (!result.success) {
      setValidationErrors(result.error.issues);
    }

    return result.success;
  };

  const validateDebounced = useCallback(
    debounce(() => {
      if (!hasSubmitted.current) return;
      validate(formDataRef.current);
    }, 300),
    [],
  );

  const submitForm = async () => {
    if (isPending) return;
    hasSubmitted.current = true;
    setIsPending(true);
    setErrors({});

    const isCredentialsValid = validate();
    if (!isCredentialsValid) {
      setIsPending(false);
      return;
    }

    try {
      const userData = await apiCall(formData);
      dispatch(authenticateUser(userData));
    } catch (err) {
      if (!isAxiosError(err) || !err.response) {
        setErrors({ general: API_ERROR_CODES.UNKNOWN_ERROR });
        return;
      }

      if (!isValidationFailed(err)) {
        setErrors({ general: err.response.data.code });
        return;
      }

      setValidationErrors(err.response.data.issues);
    } finally {
      setIsPending(false);
    }
  };

  useEffect(() => {
    formDataRef.current = formData;
  }, [formData]);

  return {
    formData,
    setFormData,
    validateDebounced,
    submitForm,
    isPending,
    errors,
  };
};
