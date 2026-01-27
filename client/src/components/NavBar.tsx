import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import PersonIcon from "@mui/icons-material/Person";
import SearchIcon from "@mui/icons-material/Search";
import SettingsIcon from "@mui/icons-material/Settings";
import {
  AppBar,
  Box,
  Button,
  Drawer,
  IconButton,
  InputBase,
  Toolbar,
  Typography,
  alpha,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import LanguageSwitcher from "./LanguageSwitcher";
import Sidebar from "./Sidebar";
import { useAuth } from "@/context/useAuth";

const Navbar = () => {
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [menuMobileOpen, setMenuMobileOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");

  const getPageTitle = () => {
    const path = location.pathname;
    if (path === "/" || path === "/dashboard") return t("pages.dashboard");
    if (path === "/profile") return t("breadcrumbs.dashboardProfile");
    if (path === "/tables") return t("breadcrumbs.dashboardTables");
    if (path === "/billing") return t("breadcrumbs.dashboardBilling");
    if (path === "/rtl") return t("breadcrumbs.dashboardRtl");
    return t("pages.dashboard");
  };

  const handleSignInClick = () => {
    navigate("/auth/signin");
  };

  const handleLogout = () => {
    logout();
    navigate("/auth/signin");
  };

  const handleSearch = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
    }
  };

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          background: theme.palette.navbar.gradient,
          backdropFilter: "blur(10px)",
          borderRadius: "16px",
          boxShadow: "0px 4px 20px rgba(0,0,0,0.3)",
          mt: 2,
        }}
      >
        <Toolbar
          sx={{ display: "flex", justifyContent: "space-between", px: 2 }}
        >
          <Box display="flex" alignItems="center" gap={2}>
            <IconButton
              sx={{
                display: { xs: "flex", md: "none" },
                color: "#fff",
              }}
              onClick={() => setMenuMobileOpen(!menuMobileOpen)}
            >
              <MenuIcon />
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

          <Box display="flex" alignItems="center" gap={3}>
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                alignItems: "center",
                background: theme.palette.navbar.gradient,
                border: "0.5px solid rgba(226, 232, 240, 0.3)",
                padding: "6px 12px",
                borderRadius: "10px",
                width: "200",
              }}
            >
              <SearchIcon sx={{ color: "white", fontSize: 18, mr: 1 }} />
              <InputBase
                placeholder={t("navbar.search")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleSearch}
                sx={{ color: "white", fontSize: "14px", width: "100%" }}
              />
            </Box>

            {isAuthenticated && user ? (
              <Box
                display="flex"
                alignItems="center"
                gap={1.5}
                sx={{
                  cursor: "pointer",
                  "&:hover": { opacity: 0.8 },
                }}
              >
                <PersonIcon sx={{ color: "#fff", opacity: 0.85 }} />
                <Typography
                  variant="body2"
                  sx={{
                    color: "#fff",
                    fontWeight: 500,
                    display: { xs: "none", md: "block" },
                  }}
                >
                  {user.name || user.email}
                </Typography>
                <Button
                  onClick={handleLogout}
                  variant="outlined"
                  size="small"
                  sx={{
                    color: "#fff",
                    borderColor: "rgba(255, 255, 255, 0.3)",
                    "&:hover": {
                      borderColor: "#fff",
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                    },
                    display: { xs: "none", md: "block" },
                  }}
                >
                  {t("navbar.signOut")}
                </Button>
              </Box>
            ) : (
              <Box
                display="flex"
                alignItems="center"
                sx={{
                  cursor: "pointer",
                  "&:hover": { opacity: 0.7 },
                }}
                onClick={handleSignInClick}
              >
                <PersonIcon sx={{ color: "#fff", opacity: 0.85 }} />
                <Typography
                  variant="body1"
                  sx={{
                    color: "#fff",
                    ml: 1,
                    fontWeight: 500,
                    display: { xs: "none", md: "block" },
                    opacity: 0.9,
                  }}
                >
                  {t("navbar.signIn")}
                </Typography>
              </Box>
            )}

            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <LanguageSwitcher />
            </Box>

            <IconButton
              sx={{
                color: "white",
                opacity: 0.8,
                display: { xs: "none", md: "flex" },
              }}
              onClick={() => navigate("/settings")}
            >
              <SettingsIcon />
            </IconButton>

            <IconButton
              sx={{
                color: "white",
                opacity: 0.8,
                display: { xs: "none", md: "flex" },
              }}
              onClick={() => navigate("/settings/notifications")}
            >
              <NotificationsIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="left"
        open={menuMobileOpen}
        onClose={() => setMenuMobileOpen(false)}
        slotProps={{
          paper: {
            sx: {
              width: 250,
              background: "theme.palette.card.gradient",
              borderRight: `1px solid ${alpha("#fff", 0.1)}`,
              p: 0,
            },
          },
        }}
      >
        <Sidebar onLinkClick={() => setMenuMobileOpen(false)} isInDrawer />
      </Drawer>
    </>
  );
};

export default Navbar;
