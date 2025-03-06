import { useTranslation } from "react-i18next";
import { useErrorTranslation } from "@/shared/lib/hooks";
import { Button } from "@/shared/ui/button";
import { Divider } from "@/shared/ui/divider";
import { Input } from "@/shared/ui/input";
import { StatusBlock } from "@/shared/ui/status-block";
import { useEditProfileForm } from "../../model/useEditProfileForm";
import { EditProfileItem } from "../EditProfileItem/EditProfileItem";
import cls from "./EditProfilePage.module.scss";

export const EditProfilePage = () => {
  const { formData, errors, formState, handleInputChange, submitForm } =
    useEditProfileForm();
  const { translateError } = useErrorTranslation();
  const { t } = useTranslation();

  return (
    <div className={cls["profile-editor"]}>
      <div className={`page-block ${cls["profile-editor__general"]}`}>
        <h1 className={cls["profile-editor__heading"]}>{t("profile")}</h1>
        <Divider />
        {formState === "success" && (
          <StatusBlock
            status="success"
            className={cls["profile-editor__status"]}
          >
            {t("changes_saved")}
          </StatusBlock>
        )}
        {errors.general && (
          <StatusBlock status="error" className={cls["profile-editor__status"]}>
            {translateError({ scope: "general", code: errors.general })}
          </StatusBlock>
        )}
        <EditProfileItem label={t("firstName")}>
          <Input
            inputSize="small"
            error={
              errors.fields?.firstName &&
              translateError({
                scope: "validation",
                issue: errors.fields.firstName,
              })
            }
            value={formData.firstName}
            name="firstName"
            onChange={handleInputChange}
          />
        </EditProfileItem>
        <EditProfileItem label={t("lastName")}>
          <Input
            inputSize="small"
            error={
              errors.fields?.lastName &&
              translateError({
                scope: "validation",
                issue: errors.fields.lastName,
              })
            }
            value={formData.lastName}
            name="lastName"
            onChange={handleInputChange}
          />
        </EditProfileItem>
        <Divider />
        <div className={cls["profile-editor__footer"]}>
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={submitForm}
            isLoading={formState === "loading"}
          >
            {t("save")}
          </Button>
        </div>
      </div>
    </div>
  );
};
