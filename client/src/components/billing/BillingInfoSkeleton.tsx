import {
  cardStyles,
  mergeSx,
  spacing,
  typographyStyles,
} from "@/styles/commonStyles";
import { Card, Skeleton, Stack, Typography, useTheme } from "@mui/material";

const BILLING_CONTENT = {
  title: "Billing Information",
};

interface Props {
  className?: string;
  count?: number;
}

const BillingMiniCardSkeleton = () => {
  const theme = useTheme();

  return (
    <Card
      sx={mergeSx(cardStyles.glassCard(theme), {
        p: spacing.cardPadding,
      })}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Stack spacing={0.5} sx={{ flex: 1 }}>
          <Skeleton variant="text" width="60%" height={20} />
          <Skeleton variant="text" width="40%" height={16} />
          <Skeleton variant="text" width="50%" height={16} />
          <Skeleton variant="text" width="35%" height={16} />
        </Stack>

        <Stack direction="row" spacing={0.5} alignItems="center">
          <Skeleton variant="circular" width={24} height={24} />
          <Skeleton variant="text" width={40} height={16} />
          <Skeleton variant="circular" width={24} height={24} />
          <Skeleton variant="text" width={30} height={16} />
        </Stack>
      </Stack>
    </Card>
  );
};

const BillingInfoSkeleton = ({ className, count = 3 }: Props) => {
  const theme = useTheme();

  return (
    <Card
      className={className}
      sx={mergeSx(cardStyles.glassCard(theme), {
        p: spacing.cardPadding,
        display: "flex",
        flexDirection: "column",
      })}
    >
      <Typography sx={typographyStyles.cardTitle(theme)}>
        {BILLING_CONTENT.title}
      </Typography>

      <Stack spacing={2} sx={{ mt: 2 }}>
        {Array.from({ length: count }).map((_, index) => (
          <BillingMiniCardSkeleton key={index} />
        ))}
      </Stack>
    </Card>
  );
};

export default BillingInfoSkeleton;
