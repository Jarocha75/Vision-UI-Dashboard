import i18n from "@/i18n";
import APIClient from "@/services/apiClient";
import type {
  CreatePaymentMethodPayload,
  PaymentMethod,
} from "@/types/paymentMethod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const apiClient = new APIClient<PaymentMethod>("/payment-method");

const useCreatePaymentMethod = () => {
  const queryClient = useQueryClient();

  return useMutation<PaymentMethod, Error, CreatePaymentMethodPayload>({
    mutationFn: (data) => apiClient.post(data),

    onSuccess: (newCard) => {
      queryClient.setQueryData<PaymentMethod[]>(["payment-method"], (old) =>
        old ? [...old, newCard] : [newCard],
      );
      toast.success(i18n.t("toast.paymentMethod.addSuccess"));
    },

    onError: (error) => {
      console.error("Create payment method error:", error);
      toast.error(i18n.t("toast.paymentMethod.addError"));
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["payment-method"] });
    },
  });
};

export default useCreatePaymentMethod;
