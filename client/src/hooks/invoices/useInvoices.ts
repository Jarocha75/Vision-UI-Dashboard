import { useAuth } from "@/context/useAuth";
import { isDemoMode, mockApi } from "@/demo";
import APIClient from "@/services/apiClient";
import type { Invoice } from "@/types/invoices";
import { useQuery } from "@tanstack/react-query";

const apiClient = new APIClient<Invoice>("/invoices");

const useInvoices = () => {
  const { isAuthenticated } = useAuth();

  return useQuery({
    queryKey: ["invoices"],
    queryFn: () => (isDemoMode() ? mockApi.getInvoices() : apiClient.getAll()),
    staleTime: 5 * 60 * 1000,
    enabled: isAuthenticated,
  });
};

export default useInvoices;
