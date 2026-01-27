import { Box, Card, Stack, Typography, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import ActiveUsersChart from "../common/ActiveUsersChart";
import { Rocket, ShoppingCart, WalletMinimal, Wrench } from "lucide-react";
import StatProgress from "../common/StatProgress";
import { formatNumberShort } from "@/utils/formatNumber";
import {
  cardStyles,
  typographyStyles,
  mergeSx,
} from "@/styles/commonStyles";

const STATS_DATA = {
  users: { value: 1245, max: 2000 },
  clicks: { value: 2_420_430, max: 5_000_000 },
  sales: { value: 2400, max: 5000 },
  items: { value: 320, max: 1000 },
};

const ActiveUsersCard = () => {
  const theme = useTheme();
  const { t } = useTranslation();

  const labelStyle = {
    fontSize: 14,
    color: theme.palette.text.secondary,
    fontWeight: 500,
  };

  const valueStyle = {
    fontSize: 16,
    color: theme.palette.text.primary,
    fontWeight: 700,
  };

  return (
    <Card
      sx={mergeSx(cardStyles.basicCard(theme), {
        minHeight: 445,
        display: "flex",
        p: { xs: 2, md: 3 },
        flexDirection: "column",
      })}
    >
      <Box
        sx={{
          height: 230,
          background: theme.palette.card.chart,
          borderRadius: "20px",
          mb: 2,
        }}
      >
        <ActiveUsersChart />
      </Box>

      <Stack direction="column" spacing={3} mt={1}>
        <Stack spacing={0.5}>
          <Typography sx={typographyStyles.cardTitle(theme)}>
            {t("activeUsersCard.title")}
          </Typography>
          <Typography
            sx={mergeSx(typographyStyles.bodySecondary(theme), {
              mt: 0.5,
              color: "#38E68F",
              fontWeight: 500,
            })}
          >
            {t("activeUsersCard.subtitle")}
          </Typography>
        </Stack>

        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent={"space-between"}
          spacing={{ xs: 2, sm: 4 }}
          flexWrap="wrap"
        >
          <Stack
            justifyContent="flex-start"
            sx={{
              width: { xs: "100%", sm: "auto" },
            }}
          >
            <Stack direction={"row"} spacing={1} alignItems="center">
              <WalletMinimal size={25} color={theme.palette.text.primary} />
              <Typography sx={labelStyle}>{t("activeUsersCard.users")}</Typography>
            </Stack>

            <Stack spacing={1} alignItems="flex-start">
              <Typography sx={valueStyle}>
                {formatNumberShort(STATS_DATA.users.value)}
              </Typography>
              <StatProgress value={STATS_DATA.users.value} max={STATS_DATA.users.max} />
            </Stack>
          </Stack>

          <Stack
            spacing={1}
            sx={{
              width: { xs: "100%", sm: "auto" },
            }}
          >
            <Stack direction={"row"} spacing={1}>
              <Rocket size={25} color={theme.palette.text.primary} />
              <Typography sx={labelStyle}>{t("activeUsersCard.clicks")}</Typography>
            </Stack>

            <Stack spacing={1} alignItems="flex-start">
              <Typography sx={{ ...valueStyle, fontSize: 18 }}>
                {formatNumberShort(STATS_DATA.clicks.value)}
              </Typography>
              <StatProgress value={STATS_DATA.clicks.value} max={STATS_DATA.clicks.max} />
            </Stack>
          </Stack>

          <Stack
            spacing={1}
            sx={{
              width: { xs: "100%", sm: "auto" },
            }}
          >
            <Stack direction={"row"} spacing={1}>
              <ShoppingCart size={25} color={theme.palette.text.primary} />
              <Typography sx={labelStyle}>{t("activeUsersCard.sales")}</Typography>
            </Stack>

            <Stack spacing={1} alignItems="flex-start">
              <Typography sx={{ ...valueStyle, fontSize: 18 }}>
                {formatNumberShort(STATS_DATA.sales.value)}
              </Typography>
              <StatProgress value={STATS_DATA.sales.value} max={STATS_DATA.sales.max} />
            </Stack>
          </Stack>

          <Stack
            spacing={1}
            sx={{
              width: { xs: "100%", sm: "auto" },
            }}
          >
            <Stack direction={"row"} spacing={1}>
              <Wrench size={25} color={theme.palette.text.primary} />
              <Typography sx={labelStyle}>{t("activeUsersCard.items")}</Typography>
            </Stack>

            <Stack spacing={1} alignItems="flex-start">
              <Typography sx={{ ...valueStyle, fontSize: 18 }}>
                {STATS_DATA.items.value.toLocaleString()}
              </Typography>
              <StatProgress value={STATS_DATA.items.value} max={STATS_DATA.items.max} />
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Card>
  );
};

export default ActiveUsersCard;
