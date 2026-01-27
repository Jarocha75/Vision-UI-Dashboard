import SigninImage from "@/assets/image/Signin.png";
import AuthFooter from "@/components/auth/AuthFooter";
import SignInForm from "@/components/auth/SignInForm";
import { Box, Grid } from "@mui/material";

const SignIn = () => {
  return (
    <Grid container minHeight="100dvh">
      <Grid
        size={{ xs: 0, md: 6 }}
        sx={{
          display: { xs: "none", md: "flex" },
          position: "relative",
          backgroundImage: `url(${SigninImage})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.25))",
          }}
        />
      </Grid>

      <Grid
        size={{ xs: 12, md: 6 }}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          p: 4,
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
          <SignInForm />
        </Box>
        <Box sx={{ display: { xs: "none", md: "flex" } }}>
          <AuthFooter />
        </Box>
      </Grid>
    </Grid>
  );
};

export default SignIn;
