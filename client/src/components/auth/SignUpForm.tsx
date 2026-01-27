import { signUpRequest } from "@/services/auth";
import { signUpSchema, type SignUpFormValues } from "@/validation/auth";
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
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/useAuth";

const SignUpForm = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const mutation = useMutation({
    mutationFn: signUpRequest,
    onSuccess: ({ accessToken, refreshToken, user }) => {
      login(accessToken, user, refreshToken);
      navigate("/profile", { replace: true });
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = (data: SignUpFormValues) => {
    mutation.mutate({
      name: data.name,
      email: data.email,
      password: data.password,
    });
  };

  return (
    <>
      {mutation.isError && (
        <Typography color="error" mb={2}>
          {mutation.error.message}
        </Typography>
      )}

      <Stack component="form" spacing={3} onSubmit={handleSubmit(onSubmit)}>
        <TextField
          {...register("name")}
          fullWidth
          label="Name"
          type="text"
          placeholder="Your name"
          error={!!errors.name}
          helperText={errors.name?.message}
        />

        <TextField
          {...register("email")}
          fullWidth
          label="Email"
          type="email"
          placeholder="Your email address"
          error={!!errors.email}
          helperText={errors.email?.message}
        />

        <TextField
          {...register("password")}
          fullWidth
          label="Password"
          type="password"
          placeholder="Your password"
          error={!!errors.password}
          helperText={errors.password?.message}
        />
        <TextField
          {...register("confirmPassword")}
          fullWidth
          label="Confirm Password"
          type="password"
          placeholder="Confirm your password"
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword?.message}
        />

        <FormControlLabel
          control={<Switch {...register} />}
          label="Remember me"
        />
        <Button
          variant="contained"
          size="large"
          sx={{ mt: 2, py: 1.5 }}
          type="submit"
          disabled={mutation.isPending}
        >
          {mutation.isPending ? "Signing Up..." : "Sign Up"}
        </Button>
        <Typography fontSize={14} color="text.secondary" textAlign="center">
          Already have an account?{" "}
          <Box
            component={RouterLink}
            to="/auth/signin"
            color="primary.main"
            sx={{
              textDecoration: "none",
              fontWeight: 600,
            }}
          >
            Sign In
          </Box>
        </Typography>
      </Stack>
    </>
  );
};

export default SignUpForm;
