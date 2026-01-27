import { MenuItem, Select, useTheme } from "@mui/material";
import type { SelectChangeEvent } from "@mui/material";
import { useTranslation } from "react-i18next";

const LanguageSwitcher = () => {
  const { i18n, t } = useTranslation();
  const theme = useTheme();

  const handleChange = (event: SelectChangeEvent<string>) => {
    i18n.changeLanguage(event.target.value);
  };

  return (
    <Select
      value={i18n.language}
      onChange={handleChange}
      size="small"
      sx={{
        minWidth: 100,
        color: "#fff",
        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: "rgba(255, 255, 255, 0.3)",
        },
        "&:hover .MuiOutlinedInput-notchedOutline": {
          borderColor: "rgba(255, 255, 255, 0.5)",
        },
        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
          borderColor: theme.palette.primary.main,
        },
        "& .MuiSelect-icon": {
          color: "rgba(255, 255, 255, 0.7)",
        },
        "& .MuiSelect-select": {
          py: 0.75,
          fontSize: "14px",
        },
      }}
      MenuProps={{
        PaperProps: {
          sx: {
            backgroundColor: "rgba(30, 30, 40, 0.98)",
            backdropFilter: "blur(20px)",
            borderRadius: "12px",
            border: "1px solid rgba(255,255,255,0.1)",
            "& .MuiMenuItem-root": {
              color: theme.palette.text.primary,
              "&:hover": {
                backgroundColor: "rgba(255,255,255,0.08)",
              },
              "&.Mui-selected": {
                backgroundColor: "rgba(58, 123, 255, 0.2)",
                "&:hover": {
                  backgroundColor: "rgba(58, 123, 255, 0.3)",
                },
              },
            },
          },
        },
      }}
    >
      <MenuItem value="en">{t("languages.en")}</MenuItem>
      <MenuItem value="sk">{t("languages.sk")}</MenuItem>
    </Select>
  );
};

export default LanguageSwitcher;
