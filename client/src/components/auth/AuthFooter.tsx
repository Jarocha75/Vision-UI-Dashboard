import { Stack, Typography, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Link as RouterLink } from "react-router-dom";

const AuthFooter = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  const items = [
    { key: "marketplace", label: t("footer.marketplace") },
    { key: "blog", label: t("footer.blog") },
    { key: "license", label: t("footer.license") },
  ];

  return (
    <Stack
      direction={{ xs: "column", md: "column" }}
      justifyContent="space-between"
      alignItems={{ xs: "flex-start", md: "center" }}
      spacing={2}
      sx={{
        py: 2,
        backgroundColor: theme.palette.card.gradientOverlay,
      }}
    >
      <Typography variant="body1">
        &copy; {currentYear} {t("footer.copyright")}
      </Typography>

      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={{ xs: 1, md: 4 }}
        alignItems="center"
        sx={{ width: { xs: "100%", md: "auto" } }}
      >
        {items.map((item) => (
          <Typography
            key={item.key}
            component={RouterLink}
            to="/"
            fontSize={14}
            color={theme.palette.text.primary}
            sx={{
              textDecoration: "none",
              transition: "color 0.2s ease",
              "&:hover": {
                color: theme.palette.text.primary,
              },
            }}
          >
            {item.label}
          </Typography>
        ))}
      </Stack>
    </Stack>
  );
};

export default AuthFooter;
