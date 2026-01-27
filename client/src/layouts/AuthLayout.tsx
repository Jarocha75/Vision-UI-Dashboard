import AuthNavbar from "@/components/navbars/AuthNavbar";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <Box minHeight="100dvh" position="relative">
      <Box position="absolute" top={0} left={0} right={0} px={2} zIndex={10}>
        <Box sx={{ maxWidth: 987, mx: "auto" }}>
          <AuthNavbar />
        </Box>
      </Box>

      {/* Content */}

      <Outlet />
    </Box>
  );
};

export default AuthLayout;
