import { Card, Stack, Typography, useTheme } from "@mui/material";
import { Smile } from "lucide-react";
import ArcProgress from "../common/ArcProgress";
import {
  cardStyles,
  typographyStyles,
  borderRadius,
  mergeSx,
} from "@/styles/commonStyles";
import { useTranslation } from "react-i18next";

const CARD_CONTENT = {
  value: 95,
  minValue: 0,
  maxValue: 100,
};

const SatisfactionRateCard = () => {
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <Card
      sx={mergeSx(cardStyles.basicCard(theme), {
        height: 340,
        p: 3,
        display: "flex",
        flexDirection: "column",
      })}
    >
      <Stack>
        <Typography sx={typographyStyles.cardTitle(theme)}>
          {t("satisfactionRateCard.satisfactionRate")}
        </Typography>
        <Typography sx={{ fontSize: 12, color: "#A0AEC0", mt: 0.5 }}>
          {t("satisfactionRateCard.fromAllProjects")}
        </Typography>
      </Stack>

      <Stack mt={3} alignItems={"center"} gap={2}>
        <Stack sx={{ position: "relative" }}>
          <ArcProgress
            value={CARD_CONTENT.value}
            size={180}
            thickness={10}
            startAngle={270}
            endAngle={450}
            clip="top"
            gradientId="satisfactionGradient"
            gradientStart="#3A7BFF"
            gradientEnd="#00E1FF"
          />

          <Stack
            sx={{
              position: "absolute",
              top: "70%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 10,
            }}
          >
            <Smile size={40} />
          </Stack>
        </Stack>

        <Stack
          direction="row"
          justifyContent={"space-between"}
          alignItems={"center"}
          sx={{
            background: theme.palette.card.overlay,
            borderRadius: borderRadius.large,
            py: 1.2,
            px: 2,
            width: "90%",
          }}
        >
          <Typography sx={{ fontSize: 12, color: "#A0AEC0" }}>
            {CARD_CONTENT.minValue}%
          </Typography>

          <Stack alignItems={"center"}>
            <Typography color="white" fontSize={26} fontWeight={700}>
              {CARD_CONTENT.value}%
            </Typography>
            <Typography sx={{ fontSize: 12, color: "#A0AEC0" }}>
              {t("satisfactionRateCard.basedOnLikes")}
            </Typography>
          </Stack>

          <Typography sx={{ fontSize: 12, color: "#A0AEC0" }}>
            {CARD_CONTENT.maxValue}%
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
};

export default SatisfactionRateCard;
