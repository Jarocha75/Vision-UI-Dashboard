import SignUpImage from "@/assets/image/SignUp.svg";
import AuthFooter from "@/components/auth/AuthFooter";
import GlassCard from "@/components/auth/GlassCard";
import { useAuth } from "@/context/useAuth";
import { facebookLoginRequest, googleLoginRequest } from "@/services/auth";
import { useFacebookLogin } from "@/hooks/auth/useFacebookLogin";
import { useGoogleLogin } from "@/hooks/auth/useGoogleLogin";
import { Box, Grid, Typography, useTheme } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const theme = useTheme();
  const { login } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { login: fbLogin, isLoading: isFbLoading } = useFacebookLogin();
  const { login: googleLogin, isLoading: isGoogleLoading } = useGoogleLogin();

  const facebookMutation = useMutation({
    mutationFn: facebookLoginRequest,
    onSuccess: ({ accessToken, refreshToken, user }) => {
      toast.success(t("toast.auth.facebookSuccess"));
      login(accessToken, user, refreshToken);
      navigate("/dashboard", { replace: true });
    },
    onError: (error) => {
      toast.error(
        error.message || t("toast.auth.facebookError"),
      );
    },
  });

  const googleMutation = useMutation({
    mutationFn: googleLoginRequest,
    onSuccess: ({ accessToken, refreshToken, user }) => {
      toast.success(t("toast.auth.googleSuccess"));
      login(accessToken, user, refreshToken);
      navigate("/dashboard", { replace: true });
    },
    onError: (error) => {
      toast.error(
        error.message || t("toast.auth.googleError"),
      );
    },
  });

  const handleFacebookLogin = async () => {
    try {
      const fbToken = await fbLogin();
      facebookMutation.mutate(fbToken);
    } catch (error) {
      console.error("Facebook login error:", error);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const googleToken = await googleLogin();
      googleMutation.mutate(googleToken);
    } catch (error) {
      console.error("Google login error:", error);
    }
  };

  return (
    <Grid container minHeight="100dvh">
      <Grid
        size={{ xs: 0, md: 6 }}
        sx={{
          display: { xs: "none", md: "flex" },
          position: "relative",
          backgroundImage: `url(${SignUpImage})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            zIndex: 0,
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.1), rgba(255,255,255,0.15))",
          }}
        />

        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
            px: 6,
            zIndex: 1,
          }}
        >
          <Typography
            color={theme.palette.text.secondary}
            variant="h6"
            textTransform="uppercase"
            letterSpacing={3}
            mb={1}
          >
            Inspired by the future:
          </Typography>
          <Typography
            variant="h4"
            color={theme.palette.text.primary}
            textTransform="uppercase"
            letterSpacing={4}
            fontWeight="bold"
            whiteSpace="nowrap"
            mb={1}
          >
            The Vision UI dashboard
          </Typography>
        </Box>
      </Grid>

      <Grid
        size={{ xs: 12, md: 6 }}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: { xs: "center", md: "flex-start" },
          p: 4,
          pt: { xs: 10, md: 12 },
        }}
      >
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            width: "100%",
            maxWidth: 400,
          }}
        >
          <Box mt={3} mb={1} textAlign="center">
            <Typography variant="h2" fontWeight={700} mb={1}>
              Welcome!
            </Typography>
            <Typography fontSize={14} color="text.secondary" mb={1}>
              Use these awesome forms to login or create new
              <br />
              account in your project for free.
            </Typography>
          </Box>
          <Box
            sx={{
              width: "100%",
              maxWidth: 420,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <GlassCard
              onFacebookLogin={handleFacebookLogin}
              isFacebookLoading={isFbLoading || facebookMutation.isPending}
              onGoogleLogin={handleGoogleLogin}
              isGoogleLoading={isGoogleLoading || googleMutation.isPending}
            />
          </Box>
        </Box>
        <Box sx={{ mt: "auto", display: { xs: "none", md: "flex" } }}>
          <AuthFooter />
        </Box>
      </Grid>
    </Grid>
  );
};

export default SignUp;
