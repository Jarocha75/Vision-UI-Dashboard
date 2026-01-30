import i18n from "@/i18n";
import { updateProfileSettings } from "@/services/useProfile";
import type { ProfileSettingsFormData } from "@/validation/profileSettings";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import toast from "react-hot-toast";

interface ApiErrorResponse {
  message?: string;
}

export const useUpdateProfileSettings = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (profileData: ProfileSettingsFormData) =>
      updateProfileSettings(profileData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
      toast.success(i18n.t("toast.profile.profileUpdateSuccess"));
    },
    onError: (error: AxiosError<ApiErrorResponse>) => {
      toast.error(
        error.response?.data?.message || i18n.t("toast.profile.profileUpdateError")
      );
    },
  });
};
