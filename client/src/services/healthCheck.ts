import { api } from "@/services/apiClient";

export const healthCheck = async (): Promise<boolean> => {
  try {
    const { data } = await api.get("/health");
    return data.status === "ok";
  } catch (error) {
    console.error("Backend health check failed:", error);
    return false;
  }
};
