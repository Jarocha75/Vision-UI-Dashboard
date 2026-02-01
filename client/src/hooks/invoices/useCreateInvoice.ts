import { isDemoMode, mockApi } from "@/demo";
import i18n from "@/i18n";
import APIClient from "@/services/apiClient";
import type { Invoice } from "@/types/invoices";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const apiClient = new APIClient<Invoice>("/invoices");

const useCreateInvoice = () => {
  const queryClient = useQueryClient();

  return useMutation<
    Invoice,
    Error,
    Omit<Invoice, "id">,
    { previousInvoices: Invoice[] | undefined }
  >({
    mutationFn: (data) =>
      isDemoMode() ? mockApi.createInvoice(data) : apiClient.post(data),
    onMutate: async (data) => {
      await queryClient.cancelQueries({ queryKey: ["invoices"] });

      const previousInvoices = queryClient.getQueryData<Invoice[]>([
        "invoices",
      ]);

      queryClient.setQueryData<Invoice[]>(["invoices"], (old) => [
        ...(old ?? []),
        { ...data, id: Date.now() },
      ]);

      return { previousInvoices };
    },
    onSuccess: () => {
      toast.success(i18n.t("toast.invoice.createSuccess"));
    },
    onError: (_error, _variables, context) => {
      if (context?.previousInvoices) {
        queryClient.setQueryData(["invoices"], context.previousInvoices);
      }
      toast.error(i18n.t("toast.invoice.createError"));
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["invoices"] });
    },
  });
};

export default useCreateInvoice;
