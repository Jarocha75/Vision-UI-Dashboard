import { Card, List, Stack, Typography, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import OrderRow from "../projects/OrderRow";
import { ordersData } from "@/data/ordersData";
import {
  cardStyles,
  typographyStyles,
  mergeSx,
} from "@/styles/commonStyles";

const OrdersOverviewCard = () => {
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <Card
      sx={mergeSx(cardStyles.basicCard(theme), {
        height: "100%",
        p: { xs: 2, md: 3 },
      })}
    >
      <Stack mb={3}>
        <Typography sx={typographyStyles.cardTitle(theme)}>
          {t("ordersOverviewCard.title")}
        </Typography>
        <Typography
          sx={mergeSx(typographyStyles.bodySecondary(theme), {
            mt: 0.5,
            color: "#38E68F",
            fontWeight: 500,
          })}
        >
          {t("ordersOverviewCard.subtitle")}
        </Typography>
      </Stack>

      <List
        sx={{
          width: "100%",
          bgcolor: theme.palette.card.gradientOverlay,
          "& > li:not(:last-child)": {
            borderBottom: "1px solid rgba(255,255,255,0.06)",
          },
        }}
      >
        {ordersData.map((order) => (
          <OrderRow
            key={order.id}
            title={order.title}
            date={order.date}
            icon={order.icon}
            type={order.type}
          />
        ))}
      </List>
    </Card>
  );
};

export default OrdersOverviewCard;
