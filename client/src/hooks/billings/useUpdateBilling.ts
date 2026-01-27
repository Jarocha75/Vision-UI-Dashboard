import i18n from "@/i18n";
import type { Billing } from "@/data/billingData";
import APIClient from "@/services/apiClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const apiClient = new APIClient<Billing>("/billings");

interface UpdateBillingPayload {
  id: string;
  data: Partial<Billing>;
}

const useUpdateBilling = () => {
  const queryClient = useQueryClient();

  return useMutation<
    Billing,
    Error,
    UpdateBillingPayload,
    { previousBillings: Billing[] | undefined }
  >({
    mutationFn: ({ id, data }: UpdateBillingPayload) => apiClient.put(id, data),
    onMutate: async ({ id, data }) => {
      await queryClient.cancelQueries({ queryKey: ["billings"] });

      const previousBillings = queryClient.getQueryData<Billing[]>([
        "billings",
      ]);

      queryClient.setQueryData<Billing[]>(
        ["billings"],
        (old) =>
          old?.map((billing) =>
            billing.id === id ? { ...billing, ...data } : billing
          ) ?? []
      );

      return { previousBillings };
    },
    onSuccess: () => {
      toast.success(i18n.t("toast.billing.updateSuccess"));
    },
    onError: (_error, _variables, context) => {
      if (context?.previousBillings) {
        queryClient.setQueryData(["billings"], context.previousBillings);
      }
      toast.error(i18n.t("toast.billing.updateError"));
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["billings"] });
    },
  });
};

export default useUpdateBilling;
