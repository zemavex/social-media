import { useState, useRef, useCallback, useEffect } from "react";
import { isAxiosError } from "axios";
import type { ZodIssue, ZodType } from "zod";
import { authenticateUser, type User } from "entities/user";
import { formatZodIssues, type FormattedZodIssues } from "shared/lib/zod";
import { debounce, useAppDispatch } from "shared/lib";

interface UseAuthFormOptions<Payload> {
  apiCall: (payload: Payload) => Promise<User>;
  validationSchema: ZodType<Payload>;
  initialFormData: Payload;
}

interface FormErrors<Keys extends string> {
  general?: string;
  fields?: FormattedZodIssues<Keys>;
}

interface AxiosErrorData {
  message: string;
  details?: ZodIssue[];
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
    []
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
      console.error(err);

      if (!isAxiosError(err) || !err.response) {
        setErrors({ general: "Unknown error occured" });
        return;
      }

      const error = err.response.data as AxiosErrorData;

      if (!error.details) {
        setErrors({ general: error.message });
        return;
      }

      setValidationErrors(error.details);
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
