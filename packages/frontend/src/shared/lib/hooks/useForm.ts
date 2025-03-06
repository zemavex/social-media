import {
  useState,
  useRef,
  useCallback,
  useEffect,
  type ChangeEvent,
} from "react";
import type { SafeParseReturnType, ZodIssue, ZodType } from "zod";
import { API_ERROR_CODES, type ApiErrorCode } from "~shared/core";
import { isAxiosError, isValidationFailed } from "@/shared/api";
import type { NonNullishObj } from "@/shared/lib/types";
import { debounce } from "@/shared/lib/utils";
import {
  formatZodIssues,
  type FormattedZodIssuesRecord,
} from "@/shared/lib/zod";

interface UseFormOptions<Payload, ApiResponse> {
  apiCall: (payload: Payload) => Promise<ApiResponse> | null;
  onSuccess?: (res: ApiResponse) => void;
  validationSchema: ZodType<Payload>;
  initialFormData: NonNullishObj<Payload>;
}

export interface FormErrors<Keys extends string> {
  general?: string;
  api?: ApiErrorCode;
  fields?: FormattedZodIssuesRecord<Keys>;
}

export const useForm = <Payload extends Record<string, unknown>, ApiResponse>({
  apiCall,
  onSuccess,
  validationSchema,
  initialFormData,
}: UseFormOptions<Payload, ApiResponse>) => {
  const [formData, setFormData] =
    useState<NonNullishObj<Payload>>(initialFormData);
  const [formState, setFormState] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errors, setErrors] = useState<FormErrors<keyof Payload & string>>({});
  const formDataRef = useRef(formData);
  const hasSubmitted = useRef(false);

  const setValidationErrors = (issues: ZodIssue[]) => {
    setErrors((prev) => ({
      ...prev,
      fields: formatZodIssues(issues),
    }));
  };

  const validate = (
    dataToValidate = formData,
  ): SafeParseReturnType<Payload, Payload> => {
    const result = validationSchema.safeParse(dataToValidate);

    setErrors((prev) => ({ ...prev, fields: undefined }));
    if (!result.success) {
      setValidationErrors(result.error.issues);
    }

    return result;
  };

  const validateDebounced = useCallback(
    debounce(() => {
      if (!hasSubmitted.current) return;
      validate(formDataRef.current);
    }, 300),
    [],
  );

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name as keyof Payload]: value }));
    validateDebounced();
  };

  const submitForm = async () => {
    if (formState === "loading") return;
    hasSubmitted.current = true;
    setFormState("loading");
    setErrors({});

    const validationResult = validate();
    if (!validationResult.success) {
      setFormState("error");
      return;
    }

    try {
      const res = await apiCall(validationResult.data);

      if (res === null) {
        setFormState("error");
        setErrors({ general: "no_fields_changed" });
        return;
      }

      onSuccess?.(res);
      setFormState("success");
    } catch (err) {
      if (!isAxiosError(err) || !err.response) {
        setErrors({ api: API_ERROR_CODES.UNKNOWN_ERROR });
        return;
      }

      if (!isValidationFailed(err)) {
        setErrors({ api: err.response.data.code });
        return;
      }

      setValidationErrors(err.response.data.issues);
      setFormState("error");
    }
  };

  useEffect(() => {
    formDataRef.current = formData;
  }, [formData]);

  return {
    formData,
    setFormData,
    handleInputChange,
    submitForm,
    formState,
    errors,
  };
};
