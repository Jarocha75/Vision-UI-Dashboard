import { useGoogleLogin as useGoogleOAuth } from "@react-oauth/google";
import { useState, useRef } from "react";

export const useGoogleLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const resolveRef = useRef<((token: string) => void) | null>(null);
  const rejectRef = useRef<((error: Error) => void) | null>(null);

  const loginWithGoogle = useGoogleOAuth({
    onSuccess: (tokenResponse) => {
      console.log("✅ Google login successful:", tokenResponse);
      setIsLoading(false);
      if (resolveRef.current) {
        resolveRef.current(tokenResponse.access_token);
        resolveRef.current = null;
        rejectRef.current = null;
      }
    },
    onError: (error) => {
      console.error("❌ Google login failed:", error);
      setIsLoading(false);
      if (rejectRef.current) {
        rejectRef.current(new Error("Google login failed or was cancelled"));
        resolveRef.current = null;
        rejectRef.current = null;
      }
    },
    flow: "implicit",
    scope: "email profile",
  });

  const login = async (): Promise<string> => {
    return new Promise((resolve, reject) => {
      setIsLoading(true);
      resolveRef.current = resolve;
      rejectRef.current = reject;
      loginWithGoogle();
    });
  };

  return {
    login,
    isLoading,
  };
};
