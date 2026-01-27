import { Box, Card, Stack, Typography, useTheme } from "@mui/material";
import MiniCardBalance from "./MiniCardBalance";
import Domain from "@/assets/icons/domain.png";
import {
  cardStyles,
  typographyStyles,
  spacing,
  heights,
  colorUtils,
  mergeSx,
} from "@/styles/commonStyles";

interface Props {
  title?: string;
  payment?: string;
  day?: string;
  time?: string;
  amount?: string;
  type?: "income" | "expense";
  className: string;
}

const CreditBalanceCard = ({
  title = "Newest",
  payment = "Bill & Taxes",
  day = "Today",
  time = "16:36",
  amount = "-$154.50",
  type,
  className,
}: Props) => {
  const theme = useTheme();

  const amountColor = type
    ? type === "expense"
      ? theme.palette.error.main
      : theme.palette.success.main
    : colorUtils.getAmountColor(amount, theme);

  return (
    <Card
      className={className}
      sx={mergeSx(cardStyles.glassCard(theme), {
        p: spacing.cardPadding,
        height: heights.smallCard,
        minHeight: { xs: 160, lg: 239 },
      })}
    >
      <Box>
        <MiniCardBalance />
      </Box>
      <Stack spacing={{ xs: 1, md: 1.5 }}>
        <Typography
          sx={mergeSx(typographyStyles.cardLabel(theme), {
            mt: { xs: 1.5, md: 2 },
          })}
        >
          {title}
        </Typography>
        <Stack
          direction="row"
          spacing={spacing.responsiveGap}
          mt={{ xs: 2, md: 3 }}
          alignItems="center"
          justifyContent="space-between"
        >
          <Stack
            direction="row"
            spacing={spacing.responsiveGap}
            alignItems="center"
            flex={1}
          >
            <Box
              component="img"
              src={Domain}
              alt="domain"
              sx={{
                width: { xs: 20, md: 24 },
                height: { xs: 20, md: 24 },
                flexShrink: 0,
              }}
            />
            <Stack spacing={0.25}>
              <Typography sx={typographyStyles.bodyPrimary(theme)}>
                {payment}
              </Typography>
              <Typography sx={typographyStyles.bodySecondary(theme)}>
                {day} {time}
              </Typography>
            </Stack>
          </Stack>
          <Typography
            sx={mergeSx(typographyStyles.smallValue(theme), {
              color: amountColor,
              textAlign: "right",
              flexShrink: 0,
              ml: 2,
            })}
          >
            {amount}
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
};

export default CreditBalanceCard;
