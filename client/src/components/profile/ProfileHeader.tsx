import {
  Avatar,
  Box,
  Card,
  IconButton,
  Stack,
  Tab,
  Tabs,
  Typography,
  useTheme,
} from "@mui/material";
import headerLogo from "@/assets/logos/headerLogo.svg";
import { Codepen, Pencil, Users, Wrench } from "lucide-react";
import { useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/context/useAuth";
import { useUserProfile } from "@/hooks/profile/useUserProfile";
import { useUploadAvatar } from "@/hooks/profile/useUploadAvatar";

interface ProfileHeaderProps {
  name?: string;
  email?: string;
  avatar?: string;
  onTabChange?: (tab: number) => void;
  onEditAvatar?: () => void;
}

const ProfileHeader = ({
  name,
  email,
  avatar,
  onTabChange,
  onEditAvatar,
}: ProfileHeaderProps) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const [tab, setTab] = useState(0);
  const { user } = useAuth();
  const { data: profile } = useUserProfile();
  const { mutate: uploadAvatar } = useUploadAvatar();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
    onTabChange?.(newValue);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      uploadAvatar(file);
    }
    e.target.value = "";
  };

  const handleEdtiClick = () => {
    fileInputRef.current?.click();
  };

  const tabSx = {
    minHeight: 32,
    minWidth: "auto",
    px: 1.5,
    py: 0.5,
    gap: 0.75,
    borderRadius: "10px",
    textTransform: "none",
    fontSize: 12,
    fontWeight: 600,
    color: "rgba(255,255,255,0.7)",

    "& .MuiTab-iconWrapper": {
      margin: 0,
    },

    "&.Mui-selected": {
      color: "#fff",
      background: theme.palette.primary.main,
      boxShadow: "0px 4px 12px rgba(0,0,0,0.25)",
    },
  };

  return (
    <Card
      sx={{
        display: "flex",
        alignItems: "center",
        borderRadius: "20px",
        height: { xs: "auto", md: 129 },
        px: { xs: 2, md: 3 },
        py: { xs: 2, md: 0 },
        background: theme.palette.card.overlay,
      }}
    >
      <Stack direction="row" alignItems="center" spacing={2}>
        <Box sx={{ position: "relative" }}>
          <Avatar
            src={avatar || profile?.avatar || user?.avatar || headerLogo}
            alt="Profile Logo"
            variant="rounded"
            sx={{
              width: { xs: 60, md: 80 },
              height: { xs: 60, md: 80 },
              borderRadius: "20px",
            }}
          />
          <IconButton
            size="small"
            onClick={onEditAvatar || handleEdtiClick}
            aria-label={t("profilePage.editProfilePicture")}
            sx={{
              position: "absolute",
              bottom: -4,
              right: -4,
              width: 26,
              height: 26,
              borderRadius: "50%",
              border: "1px solid rgba(255,255,255,0.15)",
              background: theme.palette.card.basic,
              boxShadow: "0px 2px 6px rgba(0,0,0,0.3)",
              "&:hover": {
                background: theme.palette.card.gradientOverlay,
              },
            }}
          >
            <Pencil size={14} color="#fff" />
          </IconButton>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/"
            style={{ display: "none" }}
          />
        </Box>

        <Stack spacing={0.5}>
          <Typography
            sx={{
              fontSize: { xs: 16, md: 18 },
              fontWeight: 700,
              color: theme.palette.text.primary,
            }}
          >
            {name || user?.name || t("profilePage.defaultUser")}
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: 12, md: 14 },
              fontWeight: 400,
              color: theme.palette.text.secondary,
            }}
          >
            {email || user?.email || ""}
          </Typography>
        </Stack>
      </Stack>

      <Box sx={{ ml: "auto", display: { xs: "none", md: "block" } }}>
        <Tabs
          value={tab}
          onChange={handleTabChange}
          TabIndicatorProps={{ style: { display: "none" } }}
          sx={{
            minHeight: 0,
            "& .MuiTabs-flexContainer": {
              gap: 1,
            },
          }}
        >
          {[
            { icon: <Codepen size={14} />, label: t("profilePage.overview") },
            { icon: <Users size={14} />, label: t("profilePage.teams") },
            { icon: <Wrench size={14} />, label: t("profilePage.projects") },
          ].map((tabData, index) => (
            <Tab
              key={index}
              icon={tabData.icon}
              iconPosition="start"
              sx={tabSx}
              label={tabData.label}
            />
          ))}
        </Tabs>
      </Box>
    </Card>
  );
};

export default ProfileHeader;
