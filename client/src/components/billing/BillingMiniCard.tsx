import {
  cardStyles,
  mergeSx,
  spacing,
  typographyStyles,
} from "@/styles/commonStyles";
import {
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
import type { Billing } from "@/data/billingData";
import useDeleteBilling from "@/hooks/billings/useDeleteBilling";
import ConfirmDeleteDialog from "../common/ConfirmDeleteDialog";
import { useState } from "react";

interface Props {
  billing: Billing;
  onEditClick?: (billing: Billing) => void;
}

const BillingMiniCard = ({ billing, onEditClick }: Props) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const deleteMutation = useDeleteBilling();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const handleDelete = () => {
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    deleteMutation.mutate(billing.id);
    setDeleteDialogOpen(false);
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
  };

  const handleEdit = () => {
    if (onEditClick) {
      onEditClick(billing);
    }
  };

  return (
    <Card
      sx={mergeSx(cardStyles.glassCard(theme), {
        p: spacing.cardPadding,
      })}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Stack spacing={0.5}>
          <Typography sx={typographyStyles.bodyPrimary(theme)}>
            {billing.fullName}
          </Typography>
          <Typography
            sx={mergeSx(typographyStyles.bodySecondary(theme), {
              fontSize: { xs: 11, md: 12 },
            })}
          >
            {billing.company}
          </Typography>
          <Typography
            sx={mergeSx(typographyStyles.bodySecondary(theme), {
              fontSize: { xs: 11, md: 12 },
            })}
          >
            {billing.email}
          </Typography>
          <Typography
            sx={mergeSx(typographyStyles.bodySecondary(theme), {
              fontSize: { xs: 11, md: 12 },
            })}
          >
            {billing.vatNumber}
          </Typography>
        </Stack>

        <Stack direction="row" spacing={0.5} alignItems="center">
          <IconButton
            size="small"
            onClick={handleDelete}
            disabled={deleteMutation.isPending}
            sx={{
              color: theme.palette.error.main,
              "&:hover": {
                color: theme.palette.error.dark,
                background: "rgba(244, 67, 54, 0.1)",
              },
            }}
          >
            {deleteMutation.isPending ? (
              <CircularProgress size={18} />
            ) : (
              <DeleteIcon sx={{ fontSize: { xs: 16, md: 18 } }} />
            )}
          </IconButton>
          <Typography
            onClick={handleDelete}
            sx={mergeSx(typographyStyles.cardLabel(theme), {
              color: theme.palette.error.main,
              cursor: "pointer",
              "&:hover": {
                color: theme.palette.error.dark,
              },
            })}
          >
            {t("billing.delete")}
          </Typography>

          <IconButton
            size="small"
            onClick={handleEdit}
            sx={{
              color: theme.palette.text.secondary,
              "&:hover": {
                color: theme.palette.primary.main,
                background: "rgba(94, 142, 255, 0.1)",
              },
            }}
          >
            <EditIcon sx={{ fontSize: { xs: 16, md: 18 } }} />
          </IconButton>
          <Typography
            onClick={handleEdit}
            sx={mergeSx(typographyStyles.cardLabel(theme), {
              cursor: "pointer",
              "&:hover": {
                color: theme.palette.primary.main,
              },
            })}
          >
            {t("billing.edit")}
          </Typography>
        </Stack>
      </Stack>
      <ConfirmDeleteDialog
        open={deleteDialogOpen}
        message={t("billing.confirmDelete", { name: billing.fullName })}
        cancelText={t("billing.cancel")}
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
        isLoading={deleteMutation.isPending}
      />
    </Card>
  );
};

export default BillingMiniCard;
