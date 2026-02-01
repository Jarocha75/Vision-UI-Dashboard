const DEMO_MODE_KEY = "demo_mode";
const DEMO_TOKEN = "demo_access_token_12345";

export const isDemoMode = (): boolean => {
  // Check localStorage first (user clicked "Try Demo")
  if (localStorage.getItem(DEMO_MODE_KEY) === "true") {
    return true;
  }

  // Check env variable
  if (import.meta.env.VITE_DEMO_MODE === "true") {
    return true;
  }

  // Auto-enable if no API URL is configured
  if (!import.meta.env.VITE_API_BASE_URL) {
    return true;
  }

  return false;
};

export const enableDemoMode = (): void => {
  localStorage.setItem(DEMO_MODE_KEY, "true");
};

export const disableDemoMode = (): void => {
  localStorage.removeItem(DEMO_MODE_KEY);
};

export const getDemoToken = (): string => {
  return DEMO_TOKEN;
};

export const isDemoToken = (token: string | null): boolean => {
  return token === DEMO_TOKEN;
};
