import {
  alpha,
  AppBar,
  Button,
  Drawer,
  IconButton,
  Stack,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { CircleUser, Codesandbox, KeyRound, UserPen } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import NavItem from "./NavItem";

const Navbar = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  const [menuMobileOpen, setMenuMobileOpen] = useState(false);

  return (
    <>
      <AppBar
        position="static"
        elevation={0}
        sx={{
          background: theme.palette.card.gradientOverlay,
          backdropFilter: "blur(10px)",
          borderRadius: "16px",
          border: `2px solid ${theme.palette.divider}`,
          boxShadow: "0px 4px 20px rgba(0,0,0,0.3)",
          mt: 2,
        }}
      >
        <Toolbar
          disableGutters
          sx={{
            display: "grid",
            gridTemplateColumns: "auto 1fr auto",
            alignItems: "center",
            minHeight: 64,
            px: 3,
          }}
        >
          {/* LEFT */}
          <Typography
            fontSize={14}
            fontWeight={400}
            letterSpacing={2}
            textTransform={"uppercase"}
          >
            {t("authNavbar.brandName")}
          </Typography>

          {/* CENTER */}
          <Stack
            direction="row"
            justifyContent="center"
            spacing={4}
            sx={{ display: { xs: "none", md: "flex" } }}
          >
            <NavItem icon={Codesandbox} label={t("authNavbar.dashboard")} to="/" />
            <NavItem icon={UserPen} label={t("authNavbar.profile")} to="/profile" />
            <NavItem icon={CircleUser} label={t("authNavbar.signUp")} to="/auth/signup" />
            <NavItem icon={KeyRound} label={t("authNavbar.signIn")} to="/auth/signin" />
          </Stack>

          {/* RIGHT */}
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            justifyContent="flex-end"
          >
            <Button
              variant="contained"
              size="small"
              sx={{ display: { xs: "none", md: "inline-flex" } }}
            >
              {t("authNavbar.freeDownload")}
            </Button>

            <IconButton
              sx={{ display: { xs: "flex", md: "none" }, color: "#fff" }}
              onClick={() => setMenuMobileOpen(!menuMobileOpen)}
            >
              <MenuIcon />
            </IconButton>
          </Stack>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="right"
        open={menuMobileOpen}
        onClose={() => setMenuMobileOpen(false)}
        slotProps={{
          paper: {
            sx: {
              width: 250,
              background: "theme.palette.card.gradient",
              borderRight: `1px solid ${alpha("#fff", 0.1)}`,
              px: 2,
            },
          },
        }}
      >
        <Stack spacing={2} mt={4}>
          <NavItem icon={Codesandbox} label={t("authNavbar.dashboard")} to="/" />
          <NavItem icon={UserPen} label={t("authNavbar.profile")} to="/profile" />
          <NavItem icon={CircleUser} label={t("authNavbar.signUp")} to="/auth/signup" />
          <NavItem icon={KeyRound} label={t("authNavbar.signIn")} to="/auth/signin" />

          <Button variant="contained" fullWidth sx={{ mt: 2 }}>
            {t("authNavbar.freeDownload")}
          </Button>
        </Stack>
      </Drawer>
    </>
  );
};

export default Navbar;
