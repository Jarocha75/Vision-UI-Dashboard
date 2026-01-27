import { Box, Card, Stack, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import ImageWelcome from "@/assets/image/ImageWelcome02.png";
import { useUserProfile } from "@/hooks/profile/useUserProfile";

interface Props {
  userName?: string;
  title?: string;
  actionText?: string;
  backgroundImage?: string;
  onActionClick?: () => void;
}

const WelcomeBackCard = ({
  title,
  actionText,
  backgroundImage = ImageWelcome,
  onActionClick,
}: Props) => {
  const { t } = useTranslation();
  const { data: profile } = useUserProfile();
  const name = profile?.name || profile?.displayName || t("profilePage.defaultUser");
  const displayTitle = title || t("profilePage.welcomeBack");
  const displayActionText = actionText || t("profilePage.turnOnYourCar");

  return (
    <Card
      sx={{
        position: "relative",
        overflow: "hidden",
        borderRadius: "28px",
        height: { xs: 280, lg: 377 },
        background: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Stack
        sx={{
          height: "100%",
          justifyContent: "space-between",
          p: { xs: 2.5, lg: 3 },
        }}
      >
        <Box>
          <Typography
            sx={{
              fontSize: { xs: 24, lg: 30 },
              fontWeight: 700,
              mb: 1,
              color: "white",
            }}
          >
            {displayTitle}
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: 13, lg: 14 },
              fontWeight: 400,
              color: "white",
            }}
          >
            {t("profilePage.niceToSeeYou", { name })}
          </Typography>
        </Box>

        <Box
          onClick={onActionClick}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            cursor: "pointer",
            opacity: 0.85,
            "&:hover": { opacity: 1 },
          }}
        >
          <Typography sx={{ fontSize: 12, fontWeight: 400, color: "white" }}>
            {displayActionText}
          </Typography>

          <Box
            sx={{
              width: 18,
              height: 18,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.15)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg
              width="10"
              height="10"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </Box>
        </Box>
      </Stack>
    </Card>
  );
};

export default WelcomeBackCard;
