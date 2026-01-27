import { Card, Typography, useTheme, Box } from "@mui/material";
import { useTranslation } from "react-i18next";
import SalesOverviewChart from "../common/SalesOverviewChart";
import {
  cardStyles,
  typographyStyles,
  mergeSx,
} from "@/styles/commonStyles";

const SalesOverviewCard = () => {
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <Card
      sx={mergeSx(cardStyles.basicCard(theme), {
        minHeight: 445,
        p: 3,
        display: "flex",
        flexDirection: "column",
      })}
    >
      <Typography sx={typographyStyles.cardTitle(theme)}>
        {t("salesOverviewCard.title")}
      </Typography>

      <Typography
        sx={mergeSx(typographyStyles.bodySecondary(theme), {
          mt: 0.5,
          color: "#38E68F",
          fontWeight: 500,
        })}
      >
        {t("salesOverviewCard.subtitle")}
      </Typography>

      <Box mt={3} minHeight={320}>
        <SalesOverviewChart />
      </Box>
    </Card>
  );
};

export default SalesOverviewCard;
