import AssignmentIcon from "@mui/icons-material/Assignment";
import BuildIcon from "@mui/icons-material/Build";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import HouseIcon from "@mui/icons-material/House";
import LoginIcon from "@mui/icons-material/Login";
import PersonIcon from "@mui/icons-material/Person";
import TableChartIcon from "@mui/icons-material/TableChart";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Box,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import theme from "../theme";
import { useSidebarState } from "@/hooks/useSidebarState";

interface Props {
  onLinkClick: () => void;
}

interface SidebarProps extends Props {
  isInDrawer?: boolean;
}

const Sidebar = ({ onLinkClick, isInDrawer = false }: SidebarProps) => {
  const location = useLocation();
  const { isCollapsed, toggleSidebar } = useSidebarState();
  const { t } = useTranslation();

  const shouldBeCollapsed = !isInDrawer && isCollapsed;

  const mainItems = [
    { text: t("sidebar.dashboard"), icon: <HouseIcon />, path: "/dashboard" },
    { text: t("sidebar.tables"), icon: <TableChartIcon />, path: "/tables" },
    { text: t("sidebar.billing"), icon: <CreditCardIcon />, path: "/billing" },
    { text: t("sidebar.settings"), icon: <BuildIcon />, path: "/settings" },
  ];

  const accountItems = [
    { text: t("sidebar.profile"), icon: <PersonIcon />, path: "/profile" },
    { text: t("sidebar.signIn"), icon: <LoginIcon />, path: "/auth/signin" },
    { text: t("sidebar.signUp"), icon: <AssignmentIcon />, path: "/auth/signup" },
  ];

  return (
    <Box
      sx={{
        width: shouldBeCollapsed ? 80 : 250,
        height: "100vh",
        position: isInDrawer ? "relative" : "fixed",
        background: theme.palette.card.gradientOverlay,
        backdropFilter: "blur(12px)",
        borderRight: "1px solid rgba(255,255,255,0.08)",
        color: "white",
        p: shouldBeCollapsed ? "20px 8px" : "20px 14px",
        transition: "all 0.3s ease",
        overflow: "hidden",
      }}
    >
      {!isInDrawer && (
        <Box
          sx={{
            display: "flex",
            justifyContent: shouldBeCollapsed ? "center" : "flex-end",
            mb: 2,
            mt: 2,
          }}
        >
          <Tooltip
            title={shouldBeCollapsed ? t("sidebar.expandSidebar") : t("sidebar.collapseSidebar")}
          >
            <IconButton
              onClick={toggleSidebar}
              sx={{
                color: "white",
                opacity: 0.7,
                "&:hover": { opacity: 1 },
              }}
            >
              <MenuIcon />
            </IconButton>
          </Tooltip>
        </Box>
      )}

      {!shouldBeCollapsed && (
        <Typography
          fontWeight={700}
          textAlign="center"
          fontSize="12px"
          sx={{
            letterSpacing: 2,
            textTransform: "uppercase",
            mb: 4,
            mt: 2,
            pb: 2,
            position: "relative",
            background:
              "linear-gradient(to right, white 70%, rgba(255,255,255,0))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            "&::after": {
              content: '""',
              position: "absolute",
              left: "10%",
              bottom: 0,
              width: "80%",
              height: "1px",
              background:
                "linear-gradient(to right, rgba(255,255,255,0.4), rgba(255,255,255,0))",
            },
          }}
        >
          Vision UI Free
        </Typography>
      )}

      <List sx={{ flexGrow: 1 }}>
        {mainItems.map((item) => (
          <Tooltip
            key={item.text}
            title={shouldBeCollapsed ? item.text : ""}
            placement="right"
          >
            <ListItemButton
              selected={location.pathname === item.path}
              onClick={() => {
                onLinkClick?.();
              }}
              component={Link}
              to={item.path}
              sx={{
                mb: 1,
                borderRadius: "12px",
                justifyContent: shouldBeCollapsed ? "center" : "flex-start",
                "&.Mui-selected": {
                  background: "rgba(255, 255, 255, 0.15)",
                  "&:hover": { background: "rgba(255, 255, 255, 0.25)" },
                },
                "&:hover": {
                  background: "rgba(255, 255, 255, 0.1)",
                },
              }}
            >
              <ListItemIcon
                sx={{
                  color: theme.palette.icon.blue,
                  minWidth: shouldBeCollapsed ? "unset" : "38px",
                  justifyContent: "center",
                }}
              >
                {item.icon}
              </ListItemIcon>
              {!shouldBeCollapsed && (
                <ListItemText
                  primary={item.text}
                  slotProps={{ primary: { fontWeight: 500, color: "white" } }}
                />
              )}
            </ListItemButton>
          </Tooltip>
        ))}

        {!shouldBeCollapsed && (
          <Typography
            sx={{
              fontSize: "11px",
              fontWeight: 700,
              opacity: 0.6,
              mt: 3,
              mb: 1,
              ml: 1,
              textTransform: "uppercase",
              letterSpacing: "1px",
            }}
          >
            {t("sidebar.accountPages")}
          </Typography>
        )}

        {accountItems.map((item) => (
          <Tooltip
            key={item.text}
            title={shouldBeCollapsed ? item.text : ""}
            placement="right"
          >
            <ListItemButton
              selected={location.pathname === item.path}
              onClick={() => {
                onLinkClick?.();
              }}
              component={Link}
              to={item.path}
              sx={{
                mb: 1,
                borderRadius: "12px",
                justifyContent: shouldBeCollapsed ? "center" : "flex-start",
                "&.Mui-selected": {
                  background: "rgba(255, 255, 255, 0.15)",
                  "&:hover": { background: "rgba(255, 255, 255, 0.20)" },
                },
                "&:hover": {
                  background: "rgba(255, 255, 255, 0.1)",
                },
              }}
            >
              <ListItemIcon
                sx={{
                  color: theme.palette.icon.blue,
                  minWidth: shouldBeCollapsed ? "unset" : "38px",
                  justifyContent: "center",
                }}
              >
                {item.icon}
              </ListItemIcon>

              {!shouldBeCollapsed && (
                <ListItemText
                  primary={item.text}
                  slotProps={{
                    primary: { sx: { fontWeight: 500, color: "white" } },
                  }}
                />
              )}
            </ListItemButton>
          </Tooltip>
        ))}
      </List>
    </Box>
  );
};

export default Sidebar;
