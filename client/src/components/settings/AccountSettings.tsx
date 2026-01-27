import {
  cardStyles,
  mergeSx,
  spacing,
  typographyStyles,
} from "@/styles/commonStyles";
import {
  Box,
  Button,
  Card,
  Divider,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  accountSettingsSchema,
  type AccountSettingsFormData,
} from "@/validation/accountSettings";
import { useUpdateUserProfile } from "@/hooks/profile/useUpdateUserProfile";
import { useUserProfile } from "@/hooks/profile/useUserProfile";
import { useCallback, useEffect } from "react";

interface Props {
  className?: string;
}

const AccountSettings = ({ className }: Props) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const { data: userProfile, isLoading, isError } = useUserProfile();
  const updateProfile = useUpdateUserProfile();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AccountSettingsFormData>({
    resolver: zodResolver(accountSettingsSchema),
  });

  const getDefaultValues = useCallback(
    () => ({
      name: userProfile?.name || "",
      userName: userProfile?.userName || "",
      phoneNumber: userProfile?.phoneNumber || "",
    }),
    [userProfile],
  );

  useEffect(() => {
    if (userProfile) {
      reset(getDefaultValues());
    }
  }, [userProfile, reset, getDefaultValues]);

  const onSubmit = (data: AccountSettingsFormData) => {
    updateProfile.mutate(data);
  };

  const handleCancel = () => {
    reset(getDefaultValues());
  };

  if (isLoading) {
    return (
      <Box className={className}>
        <Card
          sx={mergeSx(cardStyles.glassCard(theme), {
            p: spacing.cardPadding,
          })}
        >
          <Typography>{t("accountSettings.loading")}</Typography>
        </Card>
      </Box>
    );
  }

  if (isError) {
    return (
      <Box className={className}>
        <Card
          sx={mergeSx(cardStyles.glassCard(theme), {
            p: spacing.cardPadding,
          })}
        >
          <Typography color="error">{t("accountSettings.errorLoading")}</Typography>
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
        <Stack spacing={3}>
          <Stack spacing={1}>
            <Typography sx={typographyStyles.cardTitle(theme)}>
              {t("accountSettings.title")}
            </Typography>
            <Typography sx={typographyStyles.bodySecondary(theme)}>
              {t("accountSettings.subtitle")}
            </Typography>
          </Stack>

          <Divider sx={{ borderColor: "rgba(255,255,255,0.08)" }} />

          <Stack spacing={2.5}>
            <Typography
              sx={mergeSx(typographyStyles.bodyPrimary(theme), {
                fontWeight: 600,
                fontSize: 16,
              })}
            >
              {t("accountSettings.accountInformation")}
            </Typography>

            <TextField
              label={t("accountSettings.email")}
              value={userProfile?.email || ""}
              disabled
              fullWidth
              variant="outlined"
              sx={{
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "rgba(255,255,255,0.02)",
                  borderRadius: "12px",
                  "& fieldset": {
                    borderColor: "rgba(255,255,255,0.1)",
                  },
                  "&:hover fieldset": {
                    borderColor: "rgba(255,255,255,0.15)",
                  },
                  "&.Mui-disabled": {
                    "& fieldset": {
                      borderColor: "rgba(255,255,255,0.06)",
                    },
                  },
                },
              }}
            />

            <TextField
              label={t("accountSettings.userId")}
              value={userProfile?.id || ""}
              disabled
              fullWidth
              variant="outlined"
              sx={{
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "rgba(255,255,255,0.02)",
                  borderRadius: "12px",
                  "& fieldset": {
                    borderColor: "rgba(255,255,255,0.1)",
                  },
                  "&:hover fieldset": {
                    borderColor: "rgba(255,255,255,0.15)",
                  },
                  "&.Mui-disabled": {
                    "& fieldset": {
                      borderColor: "rgba(255,255,255,0.06)",
                    },
                  },
                },
              }}
            />
          </Stack>

          <Divider sx={{ borderColor: "rgba(255,255,255,0.08)" }} />

          <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2.5}>
              <Typography
                sx={mergeSx(typographyStyles.bodyPrimary(theme), {
                  fontWeight: 600,
                  fontSize: 16,
                })}
              >
                {t("accountSettings.profileDetails")}
              </Typography>

              <TextField
                {...register("name")}
                label={t("accountSettings.name")}
                error={!!errors.name}
                helperText={errors.name?.message}
                fullWidth
                variant="outlined"
                sx={{
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
                }}
              />

              <TextField
                {...register("userName")}
                label={t("accountSettings.username")}
                error={!!errors.userName}
                helperText={errors.userName?.message}
                fullWidth
                variant="outlined"
                sx={{
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
                }}
              />

              <TextField
                {...register("phoneNumber")}
                label={t("accountSettings.phoneNumber")}
                error={!!errors.phoneNumber}
                helperText={errors.phoneNumber?.message}
                fullWidth
                variant="outlined"
                sx={{
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
                }}
              />
            </Stack>

            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              sx={{ mt: 3 }}
            >
              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={updateProfile.isPending}
                sx={{
                  borderRadius: "12px",
                  textTransform: "none",
                  fontWeight: 600,
                  background:
                    "linear-gradient(135deg, #3A7BFF 0%, #0066FF 100%)",
                  boxShadow: "0px 4px 14px rgba(0, 102, 255, 0.35)",
                  "&:hover": {
                    background:
                      "linear-gradient(135deg, #2E6BE8 0%, #0052CC 100%)",
                  },
                }}
              >
                {updateProfile.isPending ? t("accountSettings.saving") : t("accountSettings.saveChanges")}
              </Button>
              <Button
                onClick={handleCancel}
                variant="outlined"
                fullWidth
                disabled={updateProfile.isPending}
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
                {t("accountSettings.cancel")}
              </Button>
            </Stack>
          </Box>
        </Stack>
      </Card>
    </Box>
  );
};

export default AccountSettings;
