import {
  Box,
  Card,
  IconButton,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ChartBalance from "@/assets/charts/Chart03.svg";
import {
  cardStyles,
  typographyStyles,
  mergeSx,
} from "@/styles/commonStyles";

interface Props {
  title?: string;
  amount?: string;
}

const MiniCardBalance = ({
  title = "Credit Balance",
  amount = "$25.215",
}: Props) => {
  const theme = useTheme();

  return (
    <Card
      sx={mergeSx(cardStyles.glassCard(theme), {
        color: theme.palette.card.basic,
        height: { xs: 103, lg: 103 },
        p: 2,
      })}
    >
      <Stack height="100%" spacing={1}>
        <Stack direction="row" justifyContent="space-between">
          <Typography
            sx={mergeSx(typographyStyles.cardLabel(theme), {
              textTransform: "none",
            })}
          >
            {title}
          </Typography>

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
        </Stack>

        <Stack direction="row" justifyContent="space-between">
          <Typography sx={typographyStyles.valueDisplay(theme)}>
            {amount}
          </Typography>
          <Box
            component="img"
            position="relative"
            src={ChartBalance}
            alt="chart"
          />
        </Stack>
      </Stack>
    </Card>
  );
};

export default MiniCardBalance;
