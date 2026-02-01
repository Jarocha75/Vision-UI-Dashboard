import { useAuth } from "@/context/useAuth";
import { isDemoMode, mockApi } from "@/demo";
import APIClient from "@/services/apiClient";
import type { PaymentMethod } from "@/types/paymentMethod";
import { useQuery } from "@tanstack/react-query";

const apiClient = new APIClient<PaymentMethod>("/payment-method");

const usePaymentMethods = () => {
  const { isAuthenticated } = useAuth();

  return useQuery({
    queryKey: ["payment-method"],
    queryFn: () =>
      isDemoMode() ? mockApi.getPaymentMethods() : apiClient.getAll(),
    staleTime: 5 * 60 * 1000,
    enabled: isAuthenticated,
  });
};

export default usePaymentMethods;
