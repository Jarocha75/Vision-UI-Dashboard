import { useState } from "react";
import {
  Card,
  FormControlLabel,
  FormGroup,
  Stack,
  Switch,
  Typography,
  useTheme,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { useInitialSettings } from "../../data/platformSettingsData";
import type { Settings, SettingItem } from "../../data/platformSettingsData";

const PlatformSetCard = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  const initialSettings = useInitialSettings();
  const [settings, setSettings] = useState<Settings>(() => initialSettings);

  const handleToggle = (category: keyof Settings, id: string) => {
    setSettings((prev) => ({
      ...prev,
      [category]: prev[category].map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      ),
    }));
    // Tu môžeš pridať API call na uloženie nastavení
    // Príklad: await saveSettings(updatedSettings);
  };

  const renderSettingGroup = (
    title: string,
    items: SettingItem[],
    category: keyof Settings
  ) => (
    <Stack spacing={2}>
      <Typography
        sx={{
          fontWeight: 700,
          fontSize: 12,
          color: theme.palette.text.secondary,
          textTransform: "uppercase",
          letterSpacing: "0.5px",
        }}
      >
        {title}
      </Typography>

      <FormGroup>
        {items.map((item) => (
          <FormControlLabel
            key={item.id}
            control={
              <Switch
                checked={item.checked}
                onChange={() => handleToggle(category, item.id)}
                sx={{
                  "& .MuiSwitch-switchBase.Mui-checked": {
                    color: theme.palette.primary.main,
                  },
                  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                    backgroundColor: theme.palette.primary.main,
                  },
                }}
              />
            }
            label={
              <Typography
                sx={{
                  fontWeight: 400,
                  fontSize: 14,
                  color: theme.palette.text.secondary,
                }}
              >
                {item.label}
              </Typography>
            }
          />
        ))}
      </FormGroup>
    </Stack>
  );

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        borderRadius: "20px",
        height: { xs: "auto", sm: 320, lg: 485 },
        background: theme.palette.card.overlay,
        backdropFilter: "blur(120px)",
      }}
    >
      <Stack alignItems="flex-start" sx={{ p: 2, pt: 3 }} spacing={3}>
        <Typography
          sx={{
            fontWeight: 700,
            fontSize: 18,
            color: theme.palette.text.primary,
          }}
        >
          {t("profilePage.platformSettings")}
        </Typography>

        {renderSettingGroup(t("profilePage.account"), settings.account, "account")}
        {renderSettingGroup(t("profilePage.application"), settings.application, "application")}
      </Stack>
    </Card>
  );
};

export default PlatformSetCard;
