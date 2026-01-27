import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
  useTheme,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Billing } from "@/data/billingData";
import useUpdateBilling from "@/hooks/billings/useUpdateBilling";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { billingSchema, type BillingFormData } from "@/validation/editBilling";

interface Props {
  open: boolean;
  billing: Billing | null;
  onClose: () => void;
}

const EditBillingDialog = ({ open, billing, onClose }: Props) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const updateMutation = useUpdateBilling();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<BillingFormData>({
    resolver: zodResolver(billingSchema),
    defaultValues: {
      fullName: "",
      company: "",
      email: "",
      vatNumber: "",
    },
  });

  // Naplniť formulár dátami pri otvorení
  useEffect(() => {
    if (billing) {
      reset({
        fullName: billing.fullName,
        company: billing.company,
        email: billing.email,
        vatNumber: billing.vatNumber,
      });
    }
  }, [billing, reset]);

  const onSubmit = (data: BillingFormData) => {
    if (!billing) return;

    updateMutation.mutate(
      {
        id: billing.id,
        data,
      },
      {
        onSuccess: () => {
          toast.success(t("toast.billing.updateSuccess"));
          onClose();
          reset();
        },
        onError: (error) => {
          toast.error(error.message || t("toast.billing.updateError"));
        },
      },
    );
  };

  const handleClose = () => {
    if (!updateMutation.isPending) {
      onClose();
      reset();
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          bgcolor: theme.palette.background.paper,
          backgroundImage: "none",
        },
      }}
    >
      <DialogTitle
        sx={{
          color: theme.palette.text.primary,
          fontWeight: 600,
        }}
      >
        {t("dialogs.editBilling.title")}
      </DialogTitle>

      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Stack spacing={3} sx={{ mt: 1 }}>
            <Controller
              name="fullName"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label={t("dialogs.editBilling.fullName")}
                  fullWidth
                  error={!!errors.fullName}
                  helperText={errors.fullName?.message}
                  disabled={updateMutation.isPending}
                  autoFocus
                />
              )}
            />

            <Controller
              name="company"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label={t("dialogs.editBilling.company")}
                  fullWidth
                  error={!!errors.company}
                  helperText={errors.company?.message}
                  disabled={updateMutation.isPending}
                />
              )}
            />

            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label={t("dialogs.editBilling.email")}
                  type="email"
                  fullWidth
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  disabled={updateMutation.isPending}
                />
              )}
            />

            <Controller
              name="vatNumber"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label={t("dialogs.editBilling.vatNumber")}
                  fullWidth
                  error={!!errors.vatNumber}
                  helperText={errors.vatNumber?.message}
                  disabled={updateMutation.isPending}
                  placeholder={t("dialogs.editBilling.vatPlaceholder")}
                />
              )}
            />
          </Stack>
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button
            onClick={handleClose}
            disabled={updateMutation.isPending}
            sx={{ color: theme.palette.text.secondary }}
          >
            {t("dialogs.editBilling.cancel")}
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={updateMutation.isPending || !isDirty}
            sx={{
              bgcolor: theme.palette.primary.main,
              "&:hover": {
                bgcolor: theme.palette.primary.dark,
              },
            }}
          >
            {updateMutation.isPending ? t("dialogs.editBilling.saving") : t("dialogs.editBilling.saveChanges")}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default EditBillingDialog;
