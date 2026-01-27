import { AxiosError } from "axios";

export interface ApiError {
  message: string;
  statusCode?: number;
  errors?: Record<string, string[]>;
}

export const handleApiError = (error: unknown): string => {
  if (error instanceof AxiosError) {
    const apiError = error.response?.data as ApiError | undefined;

    // If backend returns structured error with validation errors
    if (apiError?.errors) {
      const firstError = Object.values(apiError.errors)[0];
      return firstError?.[0] || "Validation error occurred";
    }

    // If backend returns simple message
    if (apiError?.message) {
      return apiError.message;
    }

    // Network errors
    if (error.message === "Network Error") {
      return "Unable to connect to server. Please check your connection.";
    }

    // HTTP status specific messages
    switch (error.response?.status) {
      case 400:
        return "Invalid request. Please check your input.";
      case 401:
        return "Unauthorized. Please log in again.";
      case 403:
        return "You don't have permission to perform this action.";
      case 404:
        return "Resource not found.";
      case 500:
        return "Server error. Please try again later.";
      default:
        return "An unexpected error occurred.";
    }
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "An unexpected error occurred";
};
