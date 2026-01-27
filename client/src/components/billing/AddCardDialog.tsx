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
import { addCardSchema, type AddCardFormData } from "@/validation/addCard";

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: AddCardFormData) => void;
  isLoading?: boolean;
}

const AddCardDialog = ({ open, onClose, onSubmit, isLoading = false }: Props) => {
  const theme = useTheme();
  const { t } = useTranslation();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<AddCardFormData>({
    resolver: zodResolver(addCardSchema),
    defaultValues: {
      cardholderName: "",
      cardNumber: "",
      expiryDate: "",
      cvv: "",
      type: "visa",
    },
    mode: "onChange",
  });

  useEffect(() => {
    if (!open) {
      reset();
    }
  }, [open, reset]);

  const handleFormSubmit = (data: AddCardFormData) => {
    onSubmit(data);
  };

  const handleClose = () => {
    if (!isLoading) {
      onClose();
      reset();
    }
  };

  const formatCardNumber = (value: string) => {
    const digits = value.replace(/\s/g, "");
    const groups = digits.match(/.{1,4}/g);
    return groups ? groups.join(" ") : digits;
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
        {t("dialogs.addCard.title")}
      </DialogTitle>

      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <DialogContent>
          <Stack spacing={3} sx={{ mt: 1 }}>
            <Controller
              name="cardholderName"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label={t("dialogs.addCard.cardholderName")}
                  fullWidth
                  error={!!errors.cardholderName}
                  helperText={errors.cardholderName?.message}
                  disabled={isLoading}
                  autoFocus
                />
              )}
            />

            <Controller
              name="cardNumber"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label={t("dialogs.addCard.cardNumber")}
                  fullWidth
                  error={!!errors.cardNumber}
                  helperText={errors.cardNumber?.message}
                  disabled={isLoading}
                  placeholder="1234 5678 9012 3456"
                  onChange={(e) => {
                    const formatted = formatCardNumber(e.target.value);
                    if (formatted.replace(/\s/g, "").length <= 16) {
                      field.onChange(formatted);
                    }
                  }}
                  inputProps={{ maxLength: 19 }}
                />
              )}
            />

            <Stack direction="row" spacing={2}>
              <Controller
                name="expiryDate"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label={t("dialogs.addCard.expiryDate")}
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
                name="cvv"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label={t("dialogs.addCard.cvv")}
                    fullWidth
                    error={!!errors.cvv}
                    helperText={errors.cvv?.message}
                    disabled={isLoading}
                    placeholder="123"
                    type="password"
                    inputProps={{ maxLength: 4 }}
                  />
                )}
              />
            </Stack>

            <Controller
              name="type"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth>
                  <InputLabel>{t("dialogs.addCard.cardType")}</InputLabel>
                  <Select
                    {...field}
                    label={t("dialogs.addCard.cardType")}
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
            {t("dialogs.addCard.cancel")}
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={isLoading || !isValid}
            sx={{
              bgcolor: theme.palette.primary.main,
              "&:hover": {
                bgcolor: theme.palette.primary.dark,
              },
            }}
          >
            {isLoading
              ? t("dialogs.addCard.adding")
              : t("dialogs.addCard.addCard")}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AddCardDialog;
