import {
  Box,
  Button,
  Card,
  CircularProgress,
  IconButton,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTranslation } from "react-i18next";
import { cardStyles, typographyStyles, mergeSx } from "@/styles/commonStyles";
import {
  usePaymentMethods,
  useCreatePaymentMethod,
  useUpdatePaymentMethod,
  useDeletePaymentMethod,
} from "@/hooks/payment-methods";
import type { CreatePaymentMethodPayload, PaymentMethod } from "@/types/paymentMethod";
import { useState } from "react";
import AddCardDialog from "./AddCardDialog";
import EditCardDialog from "./EditCardDialog";
import ConfirmDeleteDialog from "@/components/common/ConfirmDeleteDialog";

interface Props {
  className: string;
}

const PaymentMethodCard = ({ className }: Props) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const { data: paymentMethods, isLoading, isError } = usePaymentMethods();
  const createPaymentMethod = useCreatePaymentMethod();
  const updatePaymentMethod = useUpdatePaymentMethod();
  const deletePaymentMethod = useDeletePaymentMethod();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingCard, setEditingCard] = useState<PaymentMethod | null>(null);
  const [deletingCard, setDeletingCard] = useState<PaymentMethod | null>(null);

  const handleAddCard = (data: CreatePaymentMethodPayload) => {
    createPaymentMethod.mutate(data, {
      onSuccess: () => setIsAddModalOpen(false),
    });
  };

  const handleEditCard = (data: Partial<PaymentMethod>) => {
    if (!editingCard) return;
    updatePaymentMethod.mutate(
      { id: editingCard.id, data },
      { onSuccess: () => setEditingCard(null) }
    );
  };

  const handleDeleteCard = () => {
    if (!deletingCard) return;
    deletePaymentMethod.mutate(deletingCard.id, {
      onSuccess: () => setDeletingCard(null),
    });
  };

  const getCardIcon = (type: "mastercard" | "visa") => {
    if (type === "mastercard") {
      return (
        <Box
          sx={{
            width: 32,
            height: 32,
            borderRadius: "4px",
            background: "linear-gradient(135deg, #EB001B 0%, #F79E1B 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              width: 16,
              height: 16,
              borderRadius: "50%",
              background: "#EB001B",
              position: "absolute",
              left: 6,
            }}
          />
          <Box
            sx={{
              width: 16,
              height: 16,
              borderRadius: "50%",
              background: "#F79E1B",
              position: "absolute",
              right: 6,
            }}
          />
        </Box>
      );
    }

    return (
      <Box
        sx={{
          width: 32,
          height: 32,
          borderRadius: "4px",
          background: "linear-gradient(135deg, #1A1F71 0%, #0066B2 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
          fontWeight: 700,
          fontSize: 12,
          fontStyle: "italic",
        }}
      >
        VISA
      </Box>
    );
  };

  return (
    <Card
      className={className}
      sx={mergeSx(cardStyles.glassCard(theme), {
        p: { xs: 2, md: 2.5 },
        minHeight: { xs: "auto", md: 172 },
      })}
    >
      <Stack spacing={{ xs: 2, md: 2.5 }}>
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: { xs: "flex-start", sm: "center" },
            justifyContent: "space-between",
            gap: { xs: 1, sm: 0 },
          }}
        >
          <Typography sx={typographyStyles.cardTitle(theme)}>
            {t("billing.paymentMethod")}
          </Typography>
          <Button
            variant="contained"
            size="small"
            onClick={() => setIsAddModalOpen(true)}
            sx={{
              background: "linear-gradient(135deg, #5E8EFF 0%, #3d5afe 100%)",
              borderRadius: "8px",
              textTransform: "uppercase",
              fontSize: { xs: 10, md: 11 },
              fontWeight: 700,
              px: { xs: 2, md: 2.5 },
              py: { xs: 0.75, md: 1 },
              boxShadow: "0 4px 12px rgba(94, 142, 255, 0.3)",
              "&:hover": {
                background: "linear-gradient(135deg, #4a7fee 0%, #2d4fcc 100%)",
                boxShadow: "0 6px 16px rgba(94, 142, 255, 0.4)",
              },
            }}
          >
            {t("billing.addNewCard")}
          </Button>
        </Box>

        {/* Payment Methods */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)" },
            gap: { xs: 1.5, md: 2 },
          }}
        >
          {isLoading && (
            <Box sx={{ display: "flex", justifyContent: "center", py: 2 }}>
              <CircularProgress size={24} />
            </Box>
          )}

          {isError && (
            <Typography sx={{ color: theme.palette.error.main }}>
              {t("billing.errorLoadingData")}
            </Typography>
          )}

          {!isLoading && !isError && paymentMethods?.length === 0 && (
            <Typography sx={{ color: theme.palette.text.secondary }}>
              {t("billing.noData")}
            </Typography>
          )}

          {paymentMethods?.map((method) => (
            <Box
              key={method.id}
              sx={{
                border: "1px solid rgba(255, 255, 255, 0.12)",
                borderRadius: "16px",
                p: { xs: 1.5, md: 2 },
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                background: "rgba(255, 255, 255, 0.02)",
                backdropFilter: "blur(10px)",
                transition: "all 0.2s ease-in-out",
                "&:hover": {
                  background: "rgba(255, 255, 255, 0.05)",
                  borderColor: "rgba(255, 255, 255, 0.2)",
                },
              }}
            >
              <Stack direction="row" alignItems="center" spacing={1.5}>
                {getCardIcon(method.type)}
                <Typography
                  sx={mergeSx(typographyStyles.bodyPrimary(theme), {
                    fontWeight: 500,
                    fontSize: { xs: 12, md: 14 },
                    letterSpacing: "0.5px",
                  })}
                >
                  {method.cardNumber}
                </Typography>
              </Stack>

              <Stack direction="row" spacing={0.5}>
                <IconButton
                  size="small"
                  onClick={() => setEditingCard(method)}
                  sx={{
                    color: theme.palette.text.secondary,
                    "&:hover": {
                      color: theme.palette.text.primary,
                      background: "rgba(255, 255, 255, 0.1)",
                    },
                  }}
                >
                  <EditIcon sx={{ fontSize: { xs: 16, md: 18 } }} />
                </IconButton>
                <IconButton
                  size="small"
                  onClick={() => setDeletingCard(method)}
                  sx={{
                    color: theme.palette.text.secondary,
                    "&:hover": {
                      color: theme.palette.error.main,
                      background: "rgba(255, 255, 255, 0.1)",
                    },
                  }}
                >
                  <DeleteIcon sx={{ fontSize: { xs: 16, md: 18 } }} />
                </IconButton>
              </Stack>
            </Box>
          ))}
        </Box>
      </Stack>

      <AddCardDialog
        open={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddCard}
        isLoading={createPaymentMethod.isPending}
      />

      <EditCardDialog
        open={!!editingCard}
        card={editingCard}
        onClose={() => setEditingCard(null)}
        onSubmit={handleEditCard}
        isLoading={updatePaymentMethod.isPending}
      />

      <ConfirmDeleteDialog
        open={!!deletingCard}
        title={t("dialogs.confirmDelete.title")}
        message={t("billing.confirmDeleteCard", {
          cardNumber: deletingCard?.cardNumber,
        })}
        confirmText={t("dialogs.confirmDelete.confirm")}
        cancelText={t("dialogs.confirmDelete.cancel")}
        onConfirm={handleDeleteCard}
        onCancel={() => setDeletingCard(null)}
        isLoading={deletePaymentMethod.isPending}
      />
    </Card>
  );
};

export default PaymentMethodCard;
