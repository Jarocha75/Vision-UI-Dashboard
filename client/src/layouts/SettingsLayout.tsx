import SettingsSidebar from "@/pages/settings/SettingsSidebar";
import { Box, Drawer, IconButton, AppBar, Toolbar, Typography, useTheme } from "@mui/material";
import { Outlet, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import backgroundImage from "@/assets/background/backgroundImage.png";
import { Menu, Home } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SettingsLayout = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const getPageTitle = () => {
    const path = location.pathname;
    if (path.includes("/account")) return t("settingsPage.settingsAccount");
    if (path.includes("/profile")) return t("settingsPage.settingsProfile");
    if (path.includes("/notifications")) return t("settingsPage.settingsNotifications");
    if (path.includes("/privacy")) return t("settingsPage.settingsPrivacy");
    if (path.includes("/preferences")) return t("settingsPage.settingsPreferences");
    return t("settingsPage.title");
  };

  return (
    <Box
      minHeight="100vh"
      display="flex"
      sx={{
        position: "relative",
        "&::before": {
          content: '""',
          position: "fixed",
          top: 0,
          left: "-331px",
          width: "2526px",
          height: "1980.43px",
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          filter: "blur(272px)",
          opacity: 1,
          zIndex: -1,
        },
      }}
    >
      {/* Desktop Sidebar */}
      <Box
        sx={{
          width: 250,
          display: { xs: "none", md: "block" },
          flexShrink: 0,
        }}
      >
        <SettingsSidebar />
      </Box>

      {/* Mobile Drawer */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        slotProps={{
          paper: {
            sx: {
              width: 250,
              background: theme.palette.card.gradientOverlay,
              backdropFilter: "blur(12px)",
              borderRight: "1px solid rgba(255,255,255,0.08)",
            },
          },
        }}
      >
        <SettingsSidebar onLinkClick={() => setDrawerOpen(false)} isInDrawer />
      </Drawer>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          minHeight: "100vh",
          px: { xs: 2, sm: 3 },
          pt: 2,
          overflowX: "hidden",
        }}
      >
        {/* Top Navigation Bar */}
        <AppBar
          position="sticky"
          elevation={0}
          sx={{
            background: theme.palette.navbar.gradient,
            backdropFilter: "blur(10px)",
            borderRadius: "16px",
            boxShadow: "0px 4px 20px rgba(0,0,0,0.3)",
            mb: 3,
          }}
        >
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box display="flex" alignItems="center" gap={2}>
              <IconButton
                sx={{
                  display: { xs: "flex", md: "none" },
                  color: "#fff",
                }}
                onClick={() => setDrawerOpen(true)}
              >
                <Menu />
              </IconButton>

              <Typography
                variant="h5"
                fontWeight={600}
                color="#fff"
                sx={{ display: { xs: "none", sm: "flex" } }}
              >
                {getPageTitle()}
              </Typography>
            </Box>

            {/* Home Icon - Back to Dashboard */}
            <IconButton
              onClick={() => navigate("/dashboard")}
              sx={{
                color: "#fff",
                opacity: 0.8,
                "&:hover": {
                  opacity: 1,
                  background: "rgba(255, 255, 255, 0.1)",
                },
              }}
            >
              <Home size={22} />
            </IconButton>
          </Toolbar>
        </AppBar>

        <Box mt={3}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default SettingsLayout;
