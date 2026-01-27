import i18n from "@/i18n";
import APIClient from "@/services/apiClient";
import type { PaymentMethod } from "@/types/paymentMethod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const apiClient = new APIClient<PaymentMethod>("/payment-method");

const useDeletePaymentMethod = () => {
  const queryClient = useQueryClient();

  return useMutation<
    void,
    Error,
    string,
    { previousPaymentMethods: PaymentMethod[] | undefined }
  >({
    mutationFn: (id: string) => apiClient.delete(id),

    onMutate: async (id: string) => {
      await queryClient.cancelQueries({ queryKey: ["payment-method"] });

      const previousPaymentMethods = queryClient.getQueryData<PaymentMethod[]>([
        "payment-method",
      ]);

      queryClient.setQueryData<PaymentMethod[]>(
        ["payment-method"],
        (old) => old?.filter((method) => method.id !== id) ?? []
      );

      return { previousPaymentMethods };
    },

    onSuccess: () => {
      toast.success(i18n.t("toast.paymentMethod.deleteSuccess"));
    },

    onError: (_error, _id, context) => {
      if (context?.previousPaymentMethods) {
        queryClient.setQueryData(
          ["payment-method"],
          context.previousPaymentMethods
        );
      }
      toast.error(i18n.t("toast.paymentMethod.deleteError"));
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["payment-method"] });
    },
  });
};

export default useDeletePaymentMethod;
