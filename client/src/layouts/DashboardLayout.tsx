import { Box } from "@mui/material";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/NavBar";
import { Outlet } from "react-router-dom";
import backgroundImage from "@/assets/background/backgroundImage.png";
import { useSidebarState } from "@/hooks/useSidebarState";

const SIDEBAR_WIDTH = 250;
const SIDEBAR_COLLAPSED_WIDTH = 80;

const DashboardLayout = () => {
  const { isCollapsed } = useSidebarState();
  const currentSidebarWidth = isCollapsed ? SIDEBAR_COLLAPSED_WIDTH : SIDEBAR_WIDTH;

  return (
    <Box
      display="flex"
      minHeight="100vh"
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
      <Box
        sx={{
          width: currentSidebarWidth,
          display: { xs: "none", md: "block" },
          flexShrink: 0,
          transition: "width 0.3s ease",
        }}
      >
        <Sidebar onLinkClick={() => {}} />
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          minHeight: "100vh",
          px: { xs: 2, sm: 3 },
          pt: 2,
          transition: "margin 0.3s ease",
          overflowX: "hidden",
        }}
      >
        <Navbar />
        <Box mt={3}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardLayout;
