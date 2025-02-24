import { useTranslation } from "react-i18next";
import { Input } from "@/shared/ui/input";
import { useErrorTranslation } from "@/shared/lib/hooks";
import cls from "./FinishRegistrationPage.module.scss";
import { useAuthForm } from "../../model/useAuthForm";
import { apiFinishRegistration } from "@/features/auth";
import { finishRegistrationSchema } from "~shared/user";
import type { ChangeEvent, FormEvent } from "react";
import { Button } from "@/shared/ui/button";

export const FinishRegistrationPage = () => {
  const {
    formData,
    setFormData,
    validateDebounced,
    submitForm,
    isPending,
    errors,
  } = useAuthForm({
    apiCall: apiFinishRegistration,
    validationSchema: finishRegistrationSchema,
    initialFormData: { firstName: "", lastName: "" },
  });
  const { translateError } = useErrorTranslation();
  const { t } = useTranslation();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    submitForm();
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    validateDebounced();
  };

  return (
    <div className={cls["finish-registration-page"]}>
      <form className={cls["finish-registration-form"]} onSubmit={handleSubmit}>
        <h1>{t("finish_registration")}</h1>
        <Input
          name="firstName"
          label={t("firstName")}
          id="register-form__input-firstName"
          value={formData.firstName}
          onChange={handleInputChange}
          error={
            errors.fields?.firstName &&
            translateError({
              scope: "validation",
              issue: errors.fields.firstName,
            })
          }
        />
        <Input
          name="lastName"
          label={t("lastName")}
          id="register-form__input-lastName"
          value={formData.lastName}
          onChange={handleInputChange}
          error={
            errors.fields?.lastName &&
            translateError({
              scope: "validation",
              issue: errors.fields.lastName,
            })
          }
        />
        <Button
          color="primary"
          variant="contained"
          isLoading={isPending}
          type="submit"
        >
          {t("finish")}
        </Button>
      </form>
    </div>
  );
};
