import { api } from "@/services/apiClient";
import { refreshTokenRequest } from "@/services/auth";
import type { AxiosError, InternalAxiosRequestConfig } from "axios";

const TOKEN_KEY = "auth_token";
const REFRESH_TOKEN_KEY = "refresh_token";

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (error: Error) => void;
}> = [];

const processQueue = (error: Error | null, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else if (token) {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

// Helper functions to access localStorage
const getToken = () => localStorage.getItem(TOKEN_KEY);
const getRefreshToken = () => localStorage.getItem(REFRESH_TOKEN_KEY);

// Setup interceptors immediately when module loads
let logoutCallback: (() => void) | null = null;

// Request interceptor - add token to all requests
api.interceptors.request.use(
  (config) => {
    const token = getToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - handle errors and refresh token
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<{ message?: string }>) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    // Handle 401 Unauthorized - token expired or invalid
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // If already refreshing, queue this request
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: (token: string) => {
              originalRequest.headers.Authorization = `Bearer ${token}`;
              resolve(api(originalRequest));
            },
            reject: (err: Error) => {
              reject(err);
            },
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const refreshToken = getRefreshToken();

      if (!refreshToken || refreshToken === "undefined" || refreshToken === "null") {
        isRefreshing = false;
        if (logoutCallback) logoutCallback();
        window.location.href = "/auth/signin";
        return Promise.reject(error);
      }

      try {
        // Try to refresh the token
        const response = await refreshTokenRequest(refreshToken);
        const { accessToken: newToken, refreshToken: newRefreshToken } = response;

        // Update tokens in localStorage
        localStorage.setItem(TOKEN_KEY, newToken);
        localStorage.setItem(REFRESH_TOKEN_KEY, newRefreshToken);

        // Update the authorization header
        originalRequest.headers.Authorization = `Bearer ${newToken}`;

        // Process all queued requests with new token
        processQueue(null, newToken);

        isRefreshing = false;

        // Retry the original request
        return api(originalRequest);
      } catch (refreshError) {
        // Refresh token failed or expired
        processQueue(refreshError as Error, null);
        isRefreshing = false;
        if (logoutCallback) logoutCallback();
        window.location.href = "/auth/signin";
        return Promise.reject(refreshError);
      }
    }

    // Extract error message from response or use default
    const message =
      error.response?.data?.message ||
      error.message ||
      "An unexpected error occurred";

    return Promise.reject(new Error(message));
  }
);

// Function to register logout callback from AuthProvider
export const registerLogoutCallback = (logout: () => void) => {
  logoutCallback = logout;
};
