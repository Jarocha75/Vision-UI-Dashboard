import i18n from "@/i18n";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import APIClient from "@/services/apiClient";
import toast from "react-hot-toast";
import type { Invoice } from "@/types/invoices";

const apiClient = new APIClient<Invoice>("/invoices");

const useDeleteInvoice = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => apiClient.delete(id),
    onMutate: async (id: number) => {
      await queryClient.cancelQueries({ queryKey: ["invoices"] });

      const previousInvoices = queryClient.getQueryData<Invoice[]>([
        "invoices",
      ]);

      queryClient.setQueryData<Invoice[]>(
        ["invoices"],
        (old) => old?.filter((invoice) => invoice.id !== id) ?? [],
      );

      return { previousInvoices };
    },
    onSuccess: () => {
      toast.success(i18n.t("toast.invoice.deleteSuccess"));
    },
    onError: (_error, _id, context) => {
      if (context?.previousInvoices) {
        queryClient.setQueryData(["invoices"], context.previousInvoices);
      }
      toast.error(i18n.t("toast.invoice.deleteError"));
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["invoices"] });
    },
  });
};

export default useDeleteInvoice;
