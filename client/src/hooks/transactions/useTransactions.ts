import type { Transaction } from "@/types/transactions";
import APIClient from "../../services/apiClient";
import { useAuth } from "@/context/useAuth";
import { useQuery } from "@tanstack/react-query";

const apiClient = new APIClient<Transaction>("/transactions");

const useTransactions = () => {
  const { isAuthenticated } = useAuth();

  return useQuery({
    queryKey: ["transactions"],
    queryFn: () => apiClient.getAll(),
    staleTime: 5 * 60 * 1000,
    enabled: isAuthenticated,
  });
};

export default useTransactions;
