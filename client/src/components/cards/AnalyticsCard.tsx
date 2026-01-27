import { Card, Stack, Typography, useTheme } from "@mui/material";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import GroupIcon from "@mui/icons-material/Group";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import {
  cardStyles,
  containerStyles,
  typographyStyles,
  colorUtils,
  mergeSx,
} from "@/styles/commonStyles";

interface Props {
  title: string;
  value: string;
  change: string;
  icon: "money" | "users" | "clients" | "sales";
}

const iconMap = {
  money: <MonetizationOnIcon sx={{ fontSize: 22, color: "white" }} />,
  users: <GroupIcon sx={{ fontSize: 22, color: "white" }} />,
  clients: <PersonAddIcon sx={{ fontSize: 22, color: "white" }} />,
  sales: <ShoppingCartIcon sx={{ fontSize: 22, color: "white" }} />,
};

const AnalyticsCard = ({ title, value, change, icon }: Props) => {
  const theme = useTheme();

  return (
    <Card
      sx={mergeSx(cardStyles.gradientCard(theme), {
        px: 3,
        py: 2,
        color: "white",
        height: 80,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      })}
    >
      <Stack>
        <Typography sx={typographyStyles.cardLabel(theme)}>{title}</Typography>

        <Stack direction="row" alignItems="baseline" gap={1}>
          <Typography sx={typographyStyles.valueDisplay(theme)}>
            {value}
          </Typography>

          <Typography
            sx={mergeSx(typographyStyles.bodyPrimary(theme), {
              color: colorUtils.getChangeColor(change),
              fontWeight: 600,
            })}
          >
            {change}
          </Typography>
        </Stack>
      </Stack>

      <Stack sx={containerStyles.iconContainer(theme)}>
        {iconMap[icon]}
      </Stack>
    </Card>
  );
};

export default AnalyticsCard;
