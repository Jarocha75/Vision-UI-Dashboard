import APIClient from "../../services/apiClient";
import { useAuth } from "@/context/useAuth";
import type { Invoice } from "@/types/invoices";
import { useQuery } from "@tanstack/react-query";

const apiClient = new APIClient<Invoice>("/invoices");

const useInvoices = () => {
  const { isAuthenticated } = useAuth();

  return useQuery({
    queryKey: ["invoices"],
    queryFn: () => apiClient.getAll(),
    staleTime: 5 * 60 * 1000,
    enabled: isAuthenticated,
  });
};

export default useInvoices;
