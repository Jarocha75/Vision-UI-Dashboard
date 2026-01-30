import i18n from "@/i18n";
import { updateUserProfile } from "@/services/useProfile";
import type { AccountSettingsFormData } from "@/validation/accountSettings";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import toast from "react-hot-toast";

interface ApiErrorResponse {
  message?: string;
}

export const useUpdateUserProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (profileData: AccountSettingsFormData) =>
      updateUserProfile(profileData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
      toast.success(i18n.t("toast.profile.updateSuccess"));
    },
    onError: (error: AxiosError<ApiErrorResponse>) => {
      toast.error(
        error.response?.data?.message || i18n.t("toast.profile.updateError")
      );
    },
  });
};
