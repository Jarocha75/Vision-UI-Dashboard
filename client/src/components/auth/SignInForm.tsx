import { useAuth } from "@/context/useAuth";
import { loginRequest, type LoginResponse } from "@/services/auth";
import { signInSchema, type SignInFormValues } from "@/validation/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  FormControlLabel,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const SignInForm = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const mutation = useMutation<
    LoginResponse,
    Error,
    { email: string; password: string }
  >({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      loginRequest(email, password),
    onSuccess: (response) => {
      toast.success(t("toast.auth.signInSuccess"));
      login(response.accessToken, response.user, response.refreshToken);
      navigate("/dashboard", { replace: true });
    },
    onError: (error) => {
      toast.error(error.message || t("toast.auth.signInError"));
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: true,
    },
  });

  const onSubmit = (data: SignInFormValues) => {
    mutation.mutate({ email: data.email, password: data.password });
  };

  return (
    <>
      <Box maxWidth={400} width="100%">
        <Box
          mb={3}
          textAlign="center"
          display={{ xs: "none", sm: "block" }}
          mt={{ xs: 0, sm: 2 }}
        >
          <Typography variant="h2" fontWeight={700} mb={2}>
            {t("signInForm.title")}
          </Typography>
          <Typography fontSize={14} color="text.secondary" mb={4}>
            {t("signInForm.subtitle")}
          </Typography>
        </Box>

        <Stack component="form" spacing={3} onSubmit={handleSubmit(onSubmit)}>
          <TextField
            {...register("email")}
            fullWidth
            label={t("signInForm.email")}
            type="email"
            placeholder={t("signInForm.emailPlaceholder")}
            error={!!errors.email}
            helperText={errors.email?.message}
          />

          <TextField
            {...register("password")}
            fullWidth
            label={t("signInForm.password")}
            type="password"
            placeholder={t("signInForm.passwordPlaceholder")}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <FormControlLabel
            control={<Switch {...register("rememberMe")} />}
            label={t("signInForm.rememberMe")}
          />
          <Button
            variant="contained"
            size="large"
            sx={{ mt: 2, py: 1.5 }}
            type="submit"
            disabled={mutation.isPending}
          >
            {mutation.isPending ? t("signInForm.signingIn") : t("signInForm.signIn")}
          </Button>
          <Typography fontSize={14} color="text.secondary" textAlign="center">
            {t("signInForm.noAccount")}{" "}
            <Box
              component={RouterLink}
              to="/auth/signup"
              color="primary.main"
              sx={{
                textDecoration: "none",
                fontWeight: 600,
              }}
            >
              {t("signInForm.signUp")}
            </Box>
          </Typography>
        </Stack>
      </Box>
    </>
  );
};

export default SignInForm;
