import { Box, Typography, useTheme } from "@mui/material";
import {
  cardStyles,
  typographyStyles,
  heights,
  mergeSx,
} from "@/styles/commonStyles";

type MiniCardProps = {
  title: string;
  value: string;
  icon: React.ReactNode;
};

const MiniCard = ({ title, value, icon }: MiniCardProps) => {
  const theme = useTheme();

  return (
    <Box
      sx={mergeSx(cardStyles.miniCard(), {
        width: "100%",
        maxWidth: { sm: 220 },
        height: heights.miniCard.md,
        py: 1.25,
        px: 1.75,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 1.5,
      })}
    >
      <Box sx={{ flex: 1 }}>
        <Typography
          sx={mergeSx(typographyStyles.cardLabel(theme), {
            mb: 0.5,
            textTransform: "none",
          })}
        >
          {title}
        </Typography>
        <Typography fontSize={20} fontWeight={700}>
          {value}
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        {icon}
      </Box>
    </Box>
  );
};

export default MiniCard;
