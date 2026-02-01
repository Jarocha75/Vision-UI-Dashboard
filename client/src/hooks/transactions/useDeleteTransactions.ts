import { isDemoMode, mockApi } from "@/demo";
import i18n from "@/i18n";
import APIClient from "@/services/apiClient";
import type { Transaction } from "@/types/transactions";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const apiClient = new APIClient<Transaction>("/transactions");

const useDeleteTransaction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      isDemoMode() ? mockApi.deleteTransaction(id) : apiClient.delete(id),
    onMutate: async (id: string) => {
      await queryClient.cancelQueries({ queryKey: ["transactions"] });

      const previousTransactions = queryClient.getQueryData<Transaction[]>([
        "transactions",
      ]);

      queryClient.setQueryData<Transaction[]>(
        ["transactions"],
        (old) => old?.filter((transaction) => transaction.id !== id) ?? [],
      );

      return { previousTransactions };
    },
    onSuccess: () => {
      toast.success(i18n.t("toast.transaction.deleteSuccess"));
    },
    onError: (_error, _id, context) => {
      if (context?.previousTransactions) {
        queryClient.setQueryData(
          ["transactions"],
          context.previousTransactions,
        );
      }
      toast.error(i18n.t("toast.transaction.deleteError"));
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
    },
  });
};

export default useDeleteTransaction;
