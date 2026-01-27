import { Card, Stack, Typography, useTheme, Box } from "@mui/material";
import { CreditCard as CreditCardIcon } from "lucide-react";
import backgroundImage from "@/assets/background/Background.png";
import {
  borderRadius,
  heights,
  spacing,
  typographyStyles,
} from "@/styles/commonStyles";

interface Props {
  title?: string;
  cardNumber?: string;
  validThru?: string;
  cvv?: string;
  cardType?: "visa" | "mastercard";
  className?: string;
}

const CreditCard = ({
  title = "Vision UI",
  cardNumber = "7812 2139 0823 XXX",
  validThru = "05/24",
  cvv = "09X",
  cardType = "mastercard",
  className,
}: Props) => {
  const theme = useTheme();

  const CardLogo = () => {
    if (cardType === "visa") {
      return (
        <Box
          sx={{
            fontWeight: 900,
            fontSize: { xs: 20, lg: 28 },
            fontStyle: "italic",
            color: theme.palette.text.primary,
            letterSpacing: 1,
          }}
        >
          VISA
        </Box>
      );
    }
    return (
      <Stack direction="row" spacing={-0.5}>
        <Box
          sx={{
            width: { xs: 24, lg: 32 },
            height: { xs: 24, lg: 32 },
            borderRadius: "50%",
            bgcolor: "rgb(235, 0, 27)",
            opacity: 0.9,
          }}
        />
        <Box
          sx={{
            width: { xs: 24, lg: 32 },
            height: { xs: 24, lg: 32 },
            borderRadius: "50%",
            bgcolor: "rgb(255, 95, 0)",
            opacity: 0.9,
          }}
        />
      </Stack>
    );
  };

  return (
    <Card
      className={className}
      sx={{
        position: "relative",
        overflow: "hidden",
        borderRadius: borderRadius.large,
        height: heights.smallCard,
        background: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: 239,
      }}
    >
      <Stack
        sx={{
          height: "100%",
          justifyContent: "space-between",
          p: spacing.cardPadding,
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography sx={typographyStyles.cardTitle(theme)}>
            {title}
          </Typography>
          <CardLogo />
        </Stack>

        <Stack spacing={{ xs: 1, lg: 2 }}>
          <Box
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: 0.5,
            }}
          >
            <CreditCardIcon size={20} color={theme.palette.text.primary} />
          </Box>
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: { xs: 18, lg: 24 },
              color: theme.palette.text.primary,
              letterSpacing: { xs: 1, lg: 2 },
            }}
          >
            {cardNumber}
          </Typography>
        </Stack>

        <Stack direction="row" spacing={{ xs: 3, lg: 4 }}>
          <Stack>
            <Typography
              sx={{
                textTransform: "uppercase",
                fontSize: { xs: 10, lg: 12 },
                opacity: 0.7,
              }}
            >
              Valid thru
            </Typography>
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: { xs: 12, lg: 14 },
                color: theme.palette.text.primary,
              }}
            >
              {validThru}
            </Typography>
          </Stack>
          <Stack>
            <Typography
              sx={{
                textTransform: "uppercase",
                fontSize: { xs: 10, lg: 12 },
                opacity: 0.7,
              }}
            >
              CVV
            </Typography>
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: { xs: 12, lg: 14 },
                color: theme.palette.text.primary,
              }}
            >
              {cvv}
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </Card>
  );
};

export default CreditCard;
