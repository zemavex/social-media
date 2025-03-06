import { updateProfileSchema, type UpdateProfileSchema } from "~shared/user";
import { apiUpdateProfile, selectUser, setUser } from "@/entities/user";
import { useForm } from "@/shared/lib/hooks";
import { useAppDispatch, useAppSelector } from "@/shared/lib/redux";

export const useEditProfileForm = () => {
  const { first_name, last_name } = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  const form = useForm({
    apiCall: (validatedPayload) => {
      const updatedFields: UpdateProfileSchema = {};

      if (validatedPayload.firstName !== first_name) {
        updatedFields.firstName = validatedPayload.firstName;
      }
      if (validatedPayload.lastName !== last_name) {
        updatedFields.lastName = validatedPayload.lastName;
      }

      if (Object.keys(updatedFields).length === 0) {
        form.setFormData({
          firstName: validatedPayload.firstName || "",
          lastName: validatedPayload.lastName || "",
        });
        return null;
      }

      return apiUpdateProfile(updatedFields);
    },
    onSuccess: (updatedUser) => {
      dispatch(setUser(updatedUser));
      form.setFormData({
        firstName: updatedUser.first_name || "",
        lastName: updatedUser.last_name || "",
      });
    },
    validationSchema: updateProfileSchema,
    initialFormData: { firstName: first_name || "", lastName: last_name || "" },
  });

  return form;
};
