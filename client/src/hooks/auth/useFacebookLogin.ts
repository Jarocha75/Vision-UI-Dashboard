import { useEffect, useState } from "react";

interface FacebookSDK {
  init: (params: {
    appId: string;
    cookie: boolean;
    xfbml: boolean;
    version: string;
  }) => void;
  login: (
    callback: (response: FacebookLoginResponse) => void,
    options: { scope: string }
  ) => void;
  getLoginStatus: (callback: (response: FacebookLoginResponse) => void) => void;
}

interface FacebookLoginResponse {
  authResponse?: {
    accessToken: string;
    userID: string;
    expiresIn: number;
  };
  status: "connected" | "not_authorized" | "unknown";
}

declare global {
  interface Window {
    FB?: FacebookSDK;
    fbAsyncInit?: () => void;
  }
}

export const useFacebookLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSDKLoaded, setIsSDKLoaded] = useState(false);

  useEffect(() => {
    // Load Facebook SDK
    if (window.FB) {
      setIsSDKLoaded(true);
      return;
    }

    const appId = import.meta.env.VITE_FACEBOOK_APP_ID;
    if (!appId) {
      console.warn("Facebook App ID not configured");
      return;
    }

    // Load the SDK asynchronously
    window.fbAsyncInit = function () {
      window.FB?.init({
        appId: appId,
        cookie: true,
        xfbml: true,
        version: "v18.0",
      });
      setIsSDKLoaded(true);
    };

    // Load SDK script
    const script = document.createElement("script");
    script.id = "facebook-jssdk";
    script.src = "https://connect.facebook.net/en_US/sdk.js";
    script.async = true;
    script.defer = true;
    script.crossOrigin = "anonymous";

    const firstScript = document.getElementsByTagName("script")[0];
    firstScript.parentNode?.insertBefore(script, firstScript);

    return () => {
      // Cleanup
      const sdkScript = document.getElementById("facebook-jssdk");
      if (sdkScript) {
        sdkScript.remove();
      }
    };
  }, []);

  const login = async (): Promise<string> => {
    return new Promise((resolve, reject) => {
      if (!isSDKLoaded || !window.FB) {
        reject(new Error("Facebook SDK not loaded"));
        return;
      }

      setIsLoading(true);

      window.FB.login(
        (response: FacebookLoginResponse) => {
          setIsLoading(false);

          if (response.authResponse) {
            resolve(response.authResponse.accessToken);
          } else {
            reject(new Error("Facebook login failed or was cancelled"));
          }
        },
        { scope: "public_profile,email" }
      );
    });
  };

  return {
    login,
    isLoading,
    isSDKLoaded,
  };
};
