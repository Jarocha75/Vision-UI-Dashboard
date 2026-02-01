import { useAuth } from "@/context/useAuth";
import type { Billing } from "@/data/billingData";
import { isDemoMode, mockApi } from "@/demo";
import APIClient from "@/services/apiClient";
import { useQuery } from "@tanstack/react-query";

const apiClient = new APIClient<Billing>("/billings");

const useBillings = () => {
  const { isAuthenticated } = useAuth();

  return useQuery({
    queryKey: ["billings"],
    queryFn: () => (isDemoMode() ? mockApi.getBillings() : apiClient.getAll()),
    staleTime: 24 * 60 * 60 * 1000,
    enabled: isAuthenticated,
  });
};

export default useBillings;
