import type { AccountSettingsFormData } from "@/validation/accountSettings";
import { api } from "./apiClient";
import type { ProfileSettingsFormData } from "@/validation/profileSettings";

export interface UserProfile {
  id: number;
  email: string;
  name: string;
  avatar?: string | null;
  provider?: string;
  phoneNumber?: string | null;
  userName?: string | null;
  displayName?: string | null;
  bio?: string | null;
  location?: string | null;
  website?: string | null;
  linkedin?: string | null;
  github?: string | null;
  whatsup?: string | null;
}

export const getUserProfile = async () => {
  const { data } = await api.get<UserProfile>("/user/profile");
  return data;
};

export const updateUserProfile = async (
  profileData: AccountSettingsFormData
): Promise<UserProfile> => {
  const { data } = await api.put<UserProfile>("/user/profile", profileData);
  return data;
};

export const updateProfileSettings = async (
  profileData: ProfileSettingsFormData
): Promise<UserProfile> => {
  const { data } = await api.put<UserProfile>("/user/profile", profileData);
  return data;
};

export const uploadAvatar = async (file: File): Promise<UserProfile> => {
  const formData = new FormData();
  formData.append("avatar", file);

  const { data } = await api.post<UserProfile>("/user/avatar", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
};
