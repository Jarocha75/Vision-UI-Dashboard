import { useAuth } from "@/context/useAuth";
import { isDemoMode, mockApi } from "@/demo";
import APIClient from "@/services/apiClient";
import type { Transaction } from "@/types/transactions";
import { useQuery } from "@tanstack/react-query";

const apiClient = new APIClient<Transaction>("/transactions");

const useTransactions = () => {
  const { isAuthenticated } = useAuth();

  return useQuery({
    queryKey: ["transactions"],
    queryFn: () =>
      isDemoMode() ? mockApi.getTransactions() : apiClient.getAll(),
    staleTime: 5 * 60 * 1000,
    enabled: isAuthenticated,
  });
};

export default useTransactions;
