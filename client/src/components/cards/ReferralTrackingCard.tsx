import { Card, Typography, useTheme, IconButton, Stack } from "@mui/material";
import { useTranslation } from "react-i18next";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ArcProgress from "../common/ArcProgress";
import { formatNumberShort } from "@/utils/formatNumber";
import {
  cardStyles,
  typographyStyles,
  mergeSx,
} from "@/styles/commonStyles";

const CARD_DATA = {
  invited: { value: 145 },
  bonus: { value: 1465, prefix: "$" },
  score: { value: 9.3 },
};

const ReferralTrackingCard = () => {
  const theme = useTheme();
  const { t } = useTranslation();

  const labelStyle = {
    fontSize: 22,
    color: theme.palette.text.primary,
    fontWeight: 700,
  };

  const valueStyle = {
    fontSize: 42,
    fontWeight: 700,
    color: theme.palette.text.primary,
    lineHeight: 1.1,
  };

  return (
    <Card
      sx={mergeSx(cardStyles.basicCard(theme), {
        position: "relative",
        minHeight: 340,
        p: 3,
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        gap: { xs: 3, md: 0 },
      })}
    >
      <IconButton
        sx={{
          position: "absolute",
          top: 10,
          right: 10,
          color: theme.palette.text.secondary,
          zIndex: 10,
        }}
      >
        <MoreHorizIcon />
      </IconButton>

      <Stack
        flex={{ xs: 0, md: 1 }}
        width={{ xs: "100%", md: "50%" }}
        justifyContent={"flex-start"}
        gap={3}
        pr={{ md: 2 }}
      >
        <Typography sx={typographyStyles.cardTitle(theme)}>
          {t("referralTrackingCard.title")}
        </Typography>

        <Stack
          sx={{
            p: 2,
            borderRadius: "18px",
            background: theme.palette.card.chart,
            backdropFilter: "blur(12px)",
          }}
        >
          <Typography sx={typographyStyles.bodySecondary(theme)}>
            {t("referralTrackingCard.invited")}
          </Typography>
          <Typography sx={labelStyle}>
            {formatNumberShort(CARD_DATA.invited.value)} {t("referralTrackingCard.people")}
          </Typography>
        </Stack>

        <Stack
          sx={{
            p: 2,
            borderRadius: "18px",
            background: theme.palette.card.chart,
            backdropFilter: "blur(12px)",
          }}
        >
          <Typography sx={typographyStyles.bodySecondary(theme)}>
            {t("referralTrackingCard.bonus")}
          </Typography>
          <Typography sx={labelStyle}>
            {CARD_DATA.bonus.prefix}{formatNumberShort(CARD_DATA.bonus.value)}
          </Typography>
        </Stack>
      </Stack>

      <Stack
        flex={{ xs: 0, md: 1 }}
        width={{ xs: "100%", md: "50%" }}
        justifyContent={"center"}
        alignItems={"center"}
        pt={{ xs: 2, md: 0 }}
        sx={{ position: "relative" }}
      >
        <ArcProgress
          value={CARD_DATA.score.value * 10}
          size={{ xs: 160, md: 220 }}
          thickness={12}
          startAngle={200}
          endAngle={420}
          gradientId="referralGradient"
          gradientStart="#00E1FF"
          gradientEnd="#00FF85"
        />

        <Stack
          textAlign={"center"}
          sx={{
            position: "absolute",
            top: "35%",
            transform: "translateY(-20%)",
          }}
        >
          <Typography sx={typographyStyles.bodySecondary(theme)}>
            {t("referralTrackingCard.safety")}
          </Typography>

          <Typography sx={valueStyle}>{CARD_DATA.score.value}</Typography>

          <Typography sx={typographyStyles.bodySecondary(theme)}>
            {t("referralTrackingCard.totalScore")}
          </Typography>
        </Stack>
      </Stack>

      <svg width="0" height="0">
        <defs>
          <linearGradient
            id="referralGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor="#00E1FF" />
            <stop offset="100%" stopColor="#00FF85" />
          </linearGradient>
        </defs>
      </svg>
    </Card>
  );
};

export default ReferralTrackingCard;
