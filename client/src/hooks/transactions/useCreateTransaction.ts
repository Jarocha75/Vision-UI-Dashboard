import { isDemoMode, mockApi } from "@/demo";
import i18n from "@/i18n";
import APIClient from "@/services/apiClient";
import type { Transaction } from "@/types/transactions";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const apiClient = new APIClient<Transaction>("/transactions");

const useCreateTransaction = () => {
  const queryClient = useQueryClient();

  return useMutation<
    Transaction,
    Error,
    Omit<Transaction, "id">,
    { previousTransactions: Transaction[] | undefined }
  >({
    mutationFn: (data) =>
      isDemoMode() ? mockApi.createTransaction(data) : apiClient.post(data),
    onMutate: async (data) => {
      await queryClient.cancelQueries({ queryKey: ["transactions"] });

      const previousTransactions = queryClient.getQueryData<Transaction[]>([
        "transactions",
      ]);

      queryClient.setQueryData<Transaction[]>(["transactions"], (old) => [
        ...(old ?? []),
        { ...data, id: "temp-" + Date.now() },
      ]);

      return { previousTransactions };
    },
    onSuccess: () => {
      toast.success(i18n.t("toast.transaction.createSuccess"));
    },
    onError: (_error, _variables, context) => {
      if (context?.previousTransactions) {
        queryClient.setQueryData(
          ["transactions"],
          context.previousTransactions,
        );
      }
      toast.error(i18n.t("toast.transaction.createError"));
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
    },
  });
};

export default useCreateTransaction;
