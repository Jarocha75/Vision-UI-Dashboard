import i18n from "@/i18n";
import APIClient from "@/services/apiClient";
import type { PaymentMethod } from "@/types/paymentMethod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const apiClient = new APIClient<PaymentMethod>("/payment-method");

interface UpdatePaymentMethodPayload {
  id: string;
  data: Partial<Omit<PaymentMethod, "id">>;
}

const useUpdatePaymentMethod = () => {
  const queryClient = useQueryClient();

  return useMutation<
    PaymentMethod,
    Error,
    UpdatePaymentMethodPayload,
    { previousPaymentMethods: PaymentMethod[] | undefined }
  >({
    mutationFn: ({ id, data }) => apiClient.put(id, data),

    onMutate: async ({ id, data }) => {
      await queryClient.cancelQueries({ queryKey: ["payment-method"] });

      const previousPaymentMethods = queryClient.getQueryData<PaymentMethod[]>([
        "payment-method",
      ]);

      queryClient.setQueryData<PaymentMethod[]>(
        ["payment-method"],
        (old) =>
          old?.map((method) =>
            method.id === id ? { ...method, ...data } : method
          ) ?? []
      );

      return { previousPaymentMethods };
    },

    onSuccess: () => {
      toast.success(i18n.t("toast.paymentMethod.updateSuccess"));
    },

    onError: (_error, _variables, context) => {
      if (context?.previousPaymentMethods) {
        queryClient.setQueryData(
          ["payment-method"],
          context.previousPaymentMethods
        );
      }
      toast.error(i18n.t("toast.paymentMethod.updateError"));
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["payment-method"] });
    },
  });
};

export default useUpdatePaymentMethod;
