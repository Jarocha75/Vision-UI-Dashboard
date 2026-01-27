import { Box, Divider, IconButton, Stack, Typography } from "@mui/material";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import GoogleIcon from "@mui/icons-material/Google";
import SignUpForm from "./SignUpForm";
import AppleIcon from "@mui/icons-material/Apple";

const iconStyle = {
  width: 56,
  height: 56,
  borderRadius: 2,
  border: "1px solid rgba(255,255,255,0.2)",
  color: "white",
  transition: "all 0.2s ease",
  "&:hover": {
    borderColor: "rgba(255,255,255,0.5)",
    backgroundColor: "rgba(255,255,255,0.05)",
    transform: "translateY(-2px)",
  },
};

const glassStyle = {
  border: "1px solid rgba(255, 255, 255, 0.2)",
  boxShadow: "0 8px 16px 0 rgba(31, 38, 135, 0.37)",
  backdropFilter: "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",
  borderRadius: "16px",
  p: 2,
  m: 2,
};

interface Props {
  onFacebookLogin: () => void;
  isFacebookLoading?: boolean;
  onGoogleLogin: () => void;
  isGoogleLoading?: boolean;
}

const GlassCard = ({
  onFacebookLogin,
  isFacebookLoading,
  onGoogleLogin,
  isGoogleLoading,
}: Props) => {
  return (
    <Box sx={{ ...glassStyle, maxWidth: 420, width: "100%" }}>
      <Typography
        fontSize={16}
        fontWeight={600}
        color="white"
        textAlign="center"
        mb={2}
      >
        Register with
      </Typography>

      <Stack direction="row" justifyContent="center" spacing={2}>
        <IconButton
          sx={iconStyle}
          onClick={onFacebookLogin}
          disabled={isFacebookLoading}
        >
          <FacebookRoundedIcon />
        </IconButton>
        <IconButton
          sx={iconStyle}
          disabled
          title="Sign in with Apple coming soon"
        >
          <AppleIcon />
        </IconButton>
        <IconButton
          sx={iconStyle}
          onClick={onGoogleLogin}
          disabled={isGoogleLoading}
        >
          <GoogleIcon />
        </IconButton>
      </Stack>

      <Divider
        sx={{
          my: 4,
          color: "rgba(255,255,255,0.4)",
          "&::before, &::after": {
            borderColor: "rgba(255,255,255,0.2)",
          },
        }}
      >
        or
      </Divider>
      <SignUpForm />
    </Box>
  );
};

export default GlassCard;
