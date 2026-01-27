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
  FormControlLabel,
  Stack,
  Switch,
  Typography,
  useTheme,
} from "@mui/material";
import { useTranslation } from "react-i18next";

interface Props {
  className?: string;
}

const NotificationSettings = ({ className }: Props) => {
  const theme = useTheme();
  const { t } = useTranslation();

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
              {t("notificationSettings.title")}
            </Typography>
            <Typography sx={typographyStyles.bodySecondary(theme)}>
              {t("notificationSettings.subtitle")}
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
              {t("notificationSettings.emailNotifications")}
            </Typography>

            <Stack spacing={2}>
              <FormControlLabel
                control={
                  <Switch
                    defaultChecked
                    sx={{
                      "& .MuiSwitch-switchBase.Mui-checked": {
                        color: theme.palette.primary.main,
                      },
                      "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track":
                        {
                          backgroundColor: theme.palette.primary.main,
                        },
                    }}
                  />
                }
                label={
                  <Box>
                    <Typography sx={typographyStyles.bodyPrimary(theme)}>
                      {t("notificationSettings.accountActivity")}
                    </Typography>
                    <Typography
                      sx={mergeSx(typographyStyles.bodySecondary(theme), {
                        fontSize: 13,
                      })}
                    >
                      {t("notificationSettings.accountActivityDesc")}
                    </Typography>
                  </Box>
                }
                sx={{ alignItems: "flex-start", m: 0 }}
              />

              <FormControlLabel
                control={
                  <Switch
                    defaultChecked
                    sx={{
                      "& .MuiSwitch-switchBase.Mui-checked": {
                        color: theme.palette.primary.main,
                      },
                      "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track":
                        {
                          backgroundColor: theme.palette.primary.main,
                        },
                    }}
                  />
                }
                label={
                  <Box>
                    <Typography sx={typographyStyles.bodyPrimary(theme)}>
                      {t("notificationSettings.transactionUpdates")}
                    </Typography>
                    <Typography
                      sx={mergeSx(typographyStyles.bodySecondary(theme), {
                        fontSize: 13,
                      })}
                    >
                      {t("notificationSettings.transactionUpdatesDesc")}
                    </Typography>
                  </Box>
                }
                sx={{ alignItems: "flex-start", m: 0 }}
              />

              <FormControlLabel
                control={
                  <Switch
                    sx={{
                      "& .MuiSwitch-switchBase.Mui-checked": {
                        color: theme.palette.primary.main,
                      },
                      "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track":
                        {
                          backgroundColor: theme.palette.primary.main,
                        },
                    }}
                  />
                }
                label={
                  <Box>
                    <Typography sx={typographyStyles.bodyPrimary(theme)}>
                      {t("notificationSettings.marketingEmails")}
                    </Typography>
                    <Typography
                      sx={mergeSx(typographyStyles.bodySecondary(theme), {
                        fontSize: 13,
                      })}
                    >
                      {t("notificationSettings.marketingEmailsDesc")}
                    </Typography>
                  </Box>
                }
                sx={{ alignItems: "flex-start", m: 0 }}
              />

              <FormControlLabel
                control={
                  <Switch
                    defaultChecked
                    sx={{
                      "& .MuiSwitch-switchBase.Mui-checked": {
                        color: theme.palette.primary.main,
                      },
                      "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track":
                        {
                          backgroundColor: theme.palette.primary.main,
                        },
                    }}
                  />
                }
                label={
                  <Box>
                    <Typography sx={typographyStyles.bodyPrimary(theme)}>
                      {t("notificationSettings.securityAlerts")}
                    </Typography>
                    <Typography
                      sx={mergeSx(typographyStyles.bodySecondary(theme), {
                        fontSize: 13,
                      })}
                    >
                      {t("notificationSettings.securityAlertsDesc")}
                    </Typography>
                  </Box>
                }
                sx={{ alignItems: "flex-start", m: 0 }}
              />
            </Stack>
          </Stack>

          <Divider sx={{ borderColor: "rgba(255,255,255,0.08)" }} />

          <Stack spacing={2.5}>
            <Typography
              sx={mergeSx(typographyStyles.bodyPrimary(theme), {
                fontWeight: 600,
                fontSize: 16,
              })}
            >
              {t("notificationSettings.pushNotifications")}
            </Typography>

            <Stack spacing={2}>
              <FormControlLabel
                control={
                  <Switch
                    defaultChecked
                    sx={{
                      "& .MuiSwitch-switchBase.Mui-checked": {
                        color: theme.palette.primary.main,
                      },
                      "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track":
                        {
                          backgroundColor: theme.palette.primary.main,
                        },
                    }}
                  />
                }
                label={
                  <Box>
                    <Typography sx={typographyStyles.bodyPrimary(theme)}>
                      {t("notificationSettings.enablePush")}
                    </Typography>
                    <Typography
                      sx={mergeSx(typographyStyles.bodySecondary(theme), {
                        fontSize: 13,
                      })}
                    >
                      {t("notificationSettings.enablePushDesc")}
                    </Typography>
                  </Box>
                }
                sx={{ alignItems: "flex-start", m: 0 }}
              />

              <FormControlLabel
                control={
                  <Switch
                    defaultChecked
                    sx={{
                      "& .MuiSwitch-switchBase.Mui-checked": {
                        color: theme.palette.primary.main,
                      },
                      "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track":
                        {
                          backgroundColor: theme.palette.primary.main,
                        },
                    }}
                  />
                }
                label={
                  <Box>
                    <Typography sx={typographyStyles.bodyPrimary(theme)}>
                      {t("notificationSettings.sound")}
                    </Typography>
                    <Typography
                      sx={mergeSx(typographyStyles.bodySecondary(theme), {
                        fontSize: 13,
                      })}
                    >
                      {t("notificationSettings.soundDesc")}
                    </Typography>
                  </Box>
                }
                sx={{ alignItems: "flex-start", m: 0 }}
              />
            </Stack>
          </Stack>

          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            sx={{ mt: 2 }}
          >
            <Button
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
              {t("notificationSettings.saveChanges")}
            </Button>
            <Button
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
              {t("notificationSettings.cancel")}
            </Button>
          </Stack>
        </Stack>
      </Card>
    </Box>
  );
};

export default NotificationSettings;
