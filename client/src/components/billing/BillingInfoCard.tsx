import {
  cardStyles,
  mergeSx,
  spacing,
  typographyStyles,
} from "@/styles/commonStyles";
import { Alert, Card, Stack, Typography, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import BillingMiniCard from "./BillingMiniCard";
import BillingInfoSkeleton from "./BillingInfoSkeleton";
import EditBillingDialog from "./EditBillingDialog";
import { type Billing } from "@/data/billingData";
import useBillings from "@/hooks/billings/useBillings";
import { useState } from "react";

interface Props {
  className: string;
}

const BillingInfoCard = ({ className }: Props) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const { data: billings, isLoading, isError } = useBillings();
  const [editDialoglOpen, setEditDialogOpen] = useState(false);
  const [selectedBilling, setSelectedBilling] = useState<Billing | null>(null);

  const handleEditClick = (billing: Billing) => {
    setSelectedBilling(billing);
    setEditDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setEditDialogOpen(false);
    setSelectedBilling(null);
  };

  return (
    <>
      <Card
        className={className}
        sx={mergeSx(cardStyles.glassCard(theme), {
          p: spacing.cardPadding,
          display: "flex",
          flexDirection: "column",
        })}
      >
        <Typography sx={typographyStyles.cardTitle(theme)}>
          {t("billing.billingInformation")}
        </Typography>

        {isLoading && <BillingInfoSkeleton className={className} />}

        {isError && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {t("billing.errorLoadingData")}
          </Alert>
        )}

        {!isLoading && !isError && billings && billings.length === 0 && (
          <Typography
            sx={mergeSx(typographyStyles.bodySecondary(theme), {
              mt: 2,
              textAlign: "center",
            })}
          >
            {t("billing.noData")}
          </Typography>
        )}

        {!isLoading && !isError && billings && billings.length > 0 && (
          <Stack spacing={2} sx={{ mt: 2 }}>
            {billings.map((billing) => (
              <BillingMiniCard
                key={billing.id}
                billing={billing}
                onEditClick={handleEditClick}
              />
            ))}
          </Stack>
        )}
      </Card>

      <EditBillingDialog
        open={editDialoglOpen}
        billing={selectedBilling}
        onClose={handleCloseDialog}
      />
    </>
  );
};

export default BillingInfoCard;
