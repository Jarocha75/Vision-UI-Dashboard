import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  useTheme,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import type { PaymentMethod } from "@/types/paymentMethod";
import {
  editCardSchema,
  type EditCardFormData,
} from "@/validation/editPaymentCard";

interface Props {
  open: boolean;
  card: PaymentMethod | null;
  onClose: () => void;
  onSubmit: (data: EditCardFormData) => void;
  isLoading?: boolean;
}

const EditCardDialog = ({
  open,
  card,
  onClose,
  onSubmit,
  isLoading = false,
}: Props) => {
  const theme = useTheme();
  const { t } = useTranslation();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid, isDirty },
  } = useForm<EditCardFormData>({
    resolver: zodResolver(editCardSchema),
    defaultValues: {
      cardholderName: "",
      expiryDate: "",
      type: "visa",
    },
    mode: "onChange",
  });

  useEffect(() => {
    if (card) {
      reset({
        cardholderName: card.cardholderName ?? "",
        expiryDate: card.expiryDate ?? "",
        type: card.type,
      });
    }
  }, [card, reset]);

  const handleFormSubmit = (data: EditCardFormData) => {
    onSubmit(data);
  };

  const handleClose = () => {
    if (!isLoading) {
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
      disableRestoreFocus
      PaperProps={{
        sx: {
          bgcolor:
            theme.palette.mode === "dark"
              ? "#1a1f37"
              : theme.palette.background.paper,
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
        {t("dialogs.editCard.title")}
      </DialogTitle>

      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <DialogContent>
          <Stack spacing={3} sx={{ mt: 1 }}>
            <TextField
              label={t("dialogs.editCard.cardNumber")}
              value={card?.cardNumber ?? ""}
              fullWidth
              disabled
              sx={{ "& .MuiInputBase-input.Mui-disabled": { opacity: 0.7 } }}
            />

            <Controller
              name="cardholderName"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label={t("dialogs.editCard.cardholderName")}
                  fullWidth
                  error={!!errors.cardholderName}
                  helperText={errors.cardholderName?.message}
                  disabled={isLoading}
                  autoFocus
                />
              )}
            />

            <Controller
              name="expiryDate"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label={t("dialogs.editCard.expiryDate")}
                  fullWidth
                  error={!!errors.expiryDate}
                  helperText={errors.expiryDate?.message}
                  disabled={isLoading}
                  placeholder="MM/YY"
                  onChange={(e) => {
                    let value = e.target.value.replace(/[^\d]/g, "");
                    if (value.length >= 2) {
                      value = value.slice(0, 2) + "/" + value.slice(2, 4);
                    }
                    field.onChange(value);
                  }}
                  inputProps={{ maxLength: 5 }}
                />
              )}
            />

            <Controller
              name="type"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth>
                  <InputLabel>{t("dialogs.editCard.cardType")}</InputLabel>
                  <Select
                    {...field}
                    label={t("dialogs.editCard.cardType")}
                    disabled={isLoading}
                    MenuProps={{
                      PaperProps: {
                        sx: {
                          bgcolor:
                            theme.palette.mode === "dark"
                              ? "#1a1f37"
                              : theme.palette.background.paper,
                          backgroundImage: "none",
                        },
                      },
                    }}
                  >
                    <MenuItem value="visa">Visa</MenuItem>
                    <MenuItem value="mastercard">Mastercard</MenuItem>
                  </Select>
                </FormControl>
              )}
            />
          </Stack>
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button
            onClick={handleClose}
            disabled={isLoading}
            sx={{ color: theme.palette.text.secondary }}
          >
            {t("dialogs.editCard.cancel")}
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={isLoading || !isValid || !isDirty}
            sx={{
              bgcolor: theme.palette.primary.main,
              "&:hover": {
                bgcolor: theme.palette.primary.dark,
              },
            }}
          >
            {isLoading
              ? t("dialogs.editCard.saving")
              : t("dialogs.editCard.saveChanges")}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default EditCardDialog;
