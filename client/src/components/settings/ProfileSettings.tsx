import { useUpdateProfileSettings } from "@/hooks/profile/useUpdateProfileSettings";
import { useUploadAvatar } from "@/hooks/profile/useUploadAvatar";
import { useUserProfile } from "@/hooks/profile/useUserProfile";
import {
  cardStyles,
  mergeSx,
  spacing,
  typographyStyles,
} from "@/styles/commonStyles";
import { useTranslation } from "react-i18next";
import {
  profileSettingsSchema,
  type ProfileSettingsFormData,
} from "@/validation/profileSettings";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  Card,
  Divider,
  Stack,
  TextField,
  Typography,
  useTheme,
  Avatar,
} from "@mui/material";
import { Camera } from "lucide-react";
import { useCallback, useEffect, useRef, type ChangeEvent } from "react";
import { useForm } from "react-hook-form";

const getInitials = (name?: string, displayName?: string): string => {
  const nameToUse = displayName || name || "";
  const words = nameToUse.trim().split(/\s+/);

  if (words.length >= 2) {
    return (words[0][0] + words[1][0]).toUpperCase();
  }

  return nameToUse.slice(0, 2).toUpperCase();
};

interface Props {
  className?: string;
}

const ProfileSettings = ({ className }: Props) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { data: userProfile, isLoading, isError } = useUserProfile();
  const updateProfile = useUpdateProfileSettings();
  const uploadAvatar = useUploadAvatar();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProfileSettingsFormData>({
    resolver: zodResolver(profileSettingsSchema),
  });

  const getDefaultValues = useCallback(
    () => ({
      displayName: userProfile?.displayName || "",
      bio: userProfile?.bio || "",
      location: userProfile?.location || "",
      website: userProfile?.website || "",
      linkedin: userProfile?.linkedin || "",
      github: userProfile?.github || "",
      whatsup: userProfile?.whatsup || "",
    }),
    [userProfile],
  );

  useEffect(() => {
    if (userProfile) {
      reset(getDefaultValues());
    }
  }, [userProfile, reset, getDefaultValues]);

  const onSubmit = (data: ProfileSettingsFormData) => {
    updateProfile.mutate(data);
  };

  const handleCancel = () => {
    reset(getDefaultValues());
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      uploadAvatar.mutate(file);
    }
  };

  const textFieldSx = {
    "& .MuiOutlinedInput-root": {
      backgroundColor: "rgba(255,255,255,0.02)",
      borderRadius: "12px",
      "& fieldset": {
        borderColor: "rgba(255,255,255,0.1)",
      },
      "&:hover fieldset": {
        borderColor: "rgba(255,255,255,0.15)",
      },
      "&.Mui-focused fieldset": {
        borderColor: theme.palette.primary.main,
      },
    },
  };

  if (isLoading) {
    return (
      <Box className={className}>
        <Card
          sx={mergeSx(cardStyles.glassCard(theme), { p: spacing.cardPadding })}
        >
          <Typography>{t("profileSettings.loading")}</Typography>
        </Card>
      </Box>
    );
  }

  if (isError) {
    return (
      <Box className={className}>
        <Card
          sx={mergeSx(cardStyles.glassCard(theme), { p: spacing.cardPadding })}
        >
          <Typography color="error">{t("profileSettings.errorLoading")}</Typography>
        </Card>
      </Box>
    );
  }

  return (
    <Box className={className}>
      <Card
        sx={mergeSx(cardStyles.glassCard(theme), {
          p: spacing.cardPadding,
          maxWidth: 800,
          mx: "auto",
        })}
      >
        <Stack spacing={3} component="form" onSubmit={handleSubmit(onSubmit)}>
          {/* Header */}
          <Stack spacing={1}>
            <Typography sx={typographyStyles.cardTitle(theme)}>
              {t("profileSettings.title")}
            </Typography>
            <Typography sx={typographyStyles.bodySecondary(theme)}>
              {t("profileSettings.subtitle")}
            </Typography>
          </Stack>

          <Divider sx={{ borderColor: "rgba(255,255,255,0.08)" }} />

          {/* Profile Picture Section */}
          <Stack spacing={2.5}>
            <Typography
              sx={mergeSx(typographyStyles.bodyPrimary(theme), {
                fontWeight: 600,
                fontSize: 16,
              })}
            >
              {t("profileSettings.profilePicture")}
            </Typography>

            <Stack direction="row" alignItems="center" spacing={3}>
              <Avatar
                src={userProfile?.avatar ?? undefined}
                sx={{
                  width: 100,
                  height: 100,
                  background:
                    "linear-gradient(135deg, #3A7BFF 0%, #0066FF 100%)",
                }}
              >
                {getInitials(
                  userProfile?.name ?? undefined,
                  userProfile?.displayName ?? undefined,
                )}
              </Avatar>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                hidden
              />
              <Button
                variant="outlined"
                onClick={handleAvatarClick}
                disabled={uploadAvatar.isPending}
                startIcon={<Camera size={18} />}
                sx={{
                  borderRadius: "12px",
                  textTransform: "none",
                  fontWeight: 600,
                  borderColor: "rgba(255,255,255,0.1)",
                  color: theme.palette.text.secondary,
                  "&:hover": {
                    borderColor: "rgba(255,255,255,0.2)",
                    backgroundColor: "rgba(255,255,255,0.02)",
                  },
                }}
              >
                {uploadAvatar.isPending ? t("profileSettings.uploading") : t("profileSettings.changePhoto")}
              </Button>
            </Stack>
          </Stack>

          <Divider sx={{ borderColor: "rgba(255,255,255,0.08)" }} />

          {/* Personal Information */}
          <Stack spacing={2.5}>
            <Typography
              sx={mergeSx(typographyStyles.bodyPrimary(theme), {
                fontWeight: 600,
                fontSize: 16,
              })}
            >
              {t("profileSettings.personalInformation")}
            </Typography>

            <TextField
              {...register("displayName")}
              label={t("profileSettings.displayName")}
              error={!!errors.displayName}
              helperText={errors.displayName?.message}
              fullWidth
              variant="outlined"
              sx={textFieldSx}
            />

            <TextField
              {...register("bio")}
              label={t("profileSettings.bio")}
              error={!!errors.bio}
              helperText={errors.bio?.message}
              fullWidth
              multiline
              rows={3}
              variant="outlined"
              sx={textFieldSx}
            />

            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <TextField
                {...register("location")}
                label={t("profileSettings.location")}
                error={!!errors.location}
                helperText={errors.location?.message}
                fullWidth
                variant="outlined"
                sx={textFieldSx}
              />
              <TextField
                {...register("website")}
                label={t("profileSettings.website")}
                error={!!errors.website}
                helperText={errors.website?.message}
                fullWidth
                variant="outlined"
                sx={textFieldSx}
              />
            </Stack>
          </Stack>

          <Divider sx={{ borderColor: "rgba(255,255,255,0.08)" }} />

          {/* Social Links */}
          <Stack spacing={2.5}>
            <Typography
              sx={mergeSx(typographyStyles.bodyPrimary(theme), {
                fontWeight: 600,
                fontSize: 16,
              })}
            >
              {t("profileSettings.socialLinks")}
            </Typography>

            <TextField
              {...register("linkedin")}
              label={t("profileSettings.linkedin")}
              error={!!errors.linkedin}
              helperText={errors.linkedin?.message}
              fullWidth
              variant="outlined"
              sx={textFieldSx}
            />

            <TextField
              {...register("github")}
              label={t("profileSettings.github")}
              error={!!errors.github}
              helperText={errors.github?.message}
              fullWidth
              variant="outlined"
              sx={textFieldSx}
            />

            <TextField
              {...register("whatsup")}
              label={t("profileSettings.whatsapp")}
              error={!!errors.whatsup}
              helperText={errors.whatsup?.message}
              fullWidth
              variant="outlined"
              sx={textFieldSx}
            />
          </Stack>

          {/* Action Buttons */}
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            sx={{ mt: 2 }}
          >
            <Button
              type="submit"
              disabled={updateProfile.isPending}
              variant="contained"
              fullWidth
              sx={{
                borderRadius: "12px",
                textTransform: "none",
                fontWeight: 600,
                background: "linear-gradient(135deg, #3A7BFF 0%, #0066FF 100%)",
                boxShadow: "0px 4px 14px rgba(0, 102, 255, 0.35)",
                "&:hover": {
                  background:
                    "linear-gradient(135deg, #2E6BE8 0%, #0052CC 100%)",
                },
              }}
            >
              {updateProfile.isPending ? t("profileSettings.saving") : t("profileSettings.saveChanges")}
            </Button>
            <Button
              onClick={handleCancel}
              variant="outlined"
              fullWidth
              sx={{
                borderRadius: "12px",
                textTransform: "none",
                fontWeight: 600,
                borderColor: "rgba(255,255,255,0.1)",
                color: theme.palette.text.secondary,
                "&:hover": {
                  borderColor: "rgba(255,255,255,0.2)",
                  backgroundColor: "rgba(255,255,255,0.02)",
                },
              }}
            >
              {t("profileSettings.cancel")}
            </Button>
          </Stack>
        </Stack>
      </Card>
    </Box>
  );
};

export default ProfileSettings;
