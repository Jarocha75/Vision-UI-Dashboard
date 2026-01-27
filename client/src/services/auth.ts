import { api } from "@/services/apiClient";
import { type User } from "@/context/authContext";

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

export const loginRequest = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  const { data } = await api.post<LoginResponse>("/auth/login", {
    email,
    password,
  });

  return data;
};

export const getMe = async (): Promise<User> => {
  const { data } = await api.get<User>("/auth/me");
  return data;
};

export interface SignUpPayload {
  name?: string;
  email: string;
  password: string;
}

export const signUpRequest = async (
  payload: SignUpPayload
): Promise<LoginResponse> => {
  const { data } = await api.post<LoginResponse>("/auth/register", payload);

  return data;
};

export const facebookLoginRequest = async (
  facebookToken?: string
): Promise<LoginResponse> => {
  const { data } = await api.post<LoginResponse>("/auth/facebook", {
    token: facebookToken,
  });

  return data;
};

export const googleLoginRequest = async (
  googleToken?: string
): Promise<LoginResponse> => {
  const { data } = await api.post<LoginResponse>("/auth/google", {
    token: googleToken,
  });

  return data;
};

export const appleLoginRequest = async (
  appleToken?: string
): Promise<LoginResponse> => {
  const { data } = await api.post<LoginResponse>("/auth/apple", {
    token: appleToken,
  });

  return data;
};

export const refreshTokenRequest = async (
  refreshToken: string
): Promise<LoginResponse> => {
  const { data } = await api.post<LoginResponse>("/auth/refresh", {
    refreshToken,
  });

  return data;
};
