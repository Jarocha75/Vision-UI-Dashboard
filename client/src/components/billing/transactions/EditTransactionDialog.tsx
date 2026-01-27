import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  useTheme,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Transaction } from "@/types/transactions";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  transactionSchema,
  type TransactionFormData,
} from "@/validation/editTransaction";
import useUpdateTransaction from "@/hooks/transactions/useUpdateTransaction";
import toast from "react-hot-toast";

interface Props {
  open: boolean;
  transaction: Transaction | null;
  onClose: () => void;
}

const EditTransactionDialog = ({ open, transaction, onClose }: Props) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const updateMutation = useUpdateTransaction();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<TransactionFormData>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      name: "",
      amount: 0,
      type: "deposit",
      description: "",
      category: "",
    },
  });

  useEffect(() => {
    if (transaction) {
      reset({
        name: transaction.name,
        amount: transaction.amount,
        type: transaction.type,
        description: transaction.description ?? "",
        category: transaction.category ?? "",
      });
    }
  }, [transaction, reset]);

  const onSubmit = (data: TransactionFormData) => {
    if (!transaction) return;

    updateMutation.mutate(
      { id: transaction.id, data },
      {
        onSuccess: () => {
          onClose();
          reset();
        },
        onError: (error) => {
          toast.error(error.message || t("toast.transaction.updateError"));
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
          bgcolor: theme.palette.mode === "dark" ? "#1a1f37" : theme.palette.background.paper,
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
        {t("dialogs.editTransaction.title")}
      </DialogTitle>

      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Stack spacing={3} sx={{ mt: 1 }}>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label={t("dialogs.editTransaction.name")}
                  fullWidth
                  error={!!errors.name}
                  helperText={errors.name?.message}
                  disabled={updateMutation.isPending}
                  autoFocus
                />
              )}
            />

            <Controller
              name="amount"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label={t("dialogs.editTransaction.amount")}
                  type="number"
                  fullWidth
                  error={!!errors.amount}
                  helperText={errors.amount?.message}
                  disabled={updateMutation.isPending}
                  inputProps={{ step: "0.01", min: "0" }}
                />
              )}
            />

            <Controller
              name="type"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth error={!!errors.type}>
                  <InputLabel>{t("dialogs.editTransaction.transactionType")}</InputLabel>
                  <Select
                    {...field}
                    label={t("dialogs.editTransaction.transactionType")}
                    disabled={updateMutation.isPending}
                    MenuProps={{
                      PaperProps: {
                        sx: {
                          bgcolor: theme.palette.mode === "dark" ? "#1a1f37" : theme.palette.background.paper,
                          backgroundImage: "none",
                        },
                      },
                    }}
                  >
                    <MenuItem value="deposit">{t("dialogs.editTransaction.deposit")}</MenuItem>
                    <MenuItem value="charge">{t("dialogs.editTransaction.withdrawal")}</MenuItem>
                    <MenuItem value="pending">{t("dialogs.editTransaction.pending")}</MenuItem>
                  </Select>
                  {errors.type && (
                    <FormHelperText>{errors.type.message}</FormHelperText>
                  )}
                </FormControl>
              )}
            />

            <Controller
              name="category"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label={t("dialogs.editTransaction.category")}
                  fullWidth
                  error={!!errors.category}
                  helperText={errors.category?.message}
                  disabled={updateMutation.isPending}
                />
              )}
            />

            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label={t("dialogs.editTransaction.description")}
                  fullWidth
                  multiline
                  rows={3}
                  error={!!errors.description}
                  helperText={errors.description?.message}
                  disabled={updateMutation.isPending}
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
            {t("dialogs.editTransaction.cancel")}
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
            {updateMutation.isPending ? t("dialogs.editTransaction.saving") : t("dialogs.editTransaction.saveChanges")}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default EditTransactionDialog;
