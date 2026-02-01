import { isDemoMode, mockApi } from "@/demo";
import i18n from "@/i18n";
import APIClient from "@/services/apiClient";
import type { Transaction } from "@/types/transactions";
import type { TransactionFormData } from "@/validation/editTransaction";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const apiClient = new APIClient<Transaction>("/transactions");

interface UpdateTransactionPayload {
  id: string;
  data: TransactionFormData;
}

const useUpdateTransaction = () => {
  const queryClient = useQueryClient();

  return useMutation<
    Transaction,
    Error,
    UpdateTransactionPayload,
    { previousTransactions: Transaction[] | undefined }
  >({
    mutationFn: ({ id, data }: UpdateTransactionPayload) =>
      isDemoMode() ? mockApi.updateTransaction(id, data) : apiClient.put(id, data),
    onMutate: async ({ id, data }) => {
      await queryClient.cancelQueries({ queryKey: ["transactions"] });

      const previousTransactions = queryClient.getQueryData<Transaction[]>([
        "transactions",
      ]);

      queryClient.setQueryData<Transaction[]>(
        ["transactions"],
        (old) =>
          old?.map((transaction) =>
            transaction.id === id ? { ...transaction, ...data } : transaction,
          ) ?? [],
      );

      return { previousTransactions };
    },
    onSuccess: () => {
      toast.success(i18n.t("toast.transaction.updateSuccess"));
    },
    onError: (_error, _variables, context) => {
      if (context?.previousTransactions) {
        queryClient.setQueryData(
          ["transactions"],
          context.previousTransactions,
        );
      }
      toast.error(i18n.t("toast.transaction.updateError"));
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
    },
  });
};

export default useUpdateTransaction;
