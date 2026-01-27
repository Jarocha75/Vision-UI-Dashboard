import { Box, ListItem, Stack, Typography, useTheme } from "@mui/material";
import { type LucideIcon } from "lucide-react";

export type OrderType = "design" | "payment" | "order" | "system";

interface Props {
  title: string;
  date: string;
  icon: LucideIcon;
  type?: OrderType;
}

const IconStyle: Record<OrderType, { color: string; bg: string }> = {
  design: {
    color: "#3A7BFF",
    bg: "rgba(58,123,255,0.15)",
  },
  order: {
    color: "#00E1FF",
    bg: "rgba(0,225,255,0.15)",
  },
  payment: {
    color: "#00FF85",
    bg: "rgba(0,255,133,0.15)",
  },
  system: {
    color: "#FFB547",
    bg: "rgba(255,181,71,0.15)",
  },
};

const OrderRow = ({ title, date, icon: Icon, type = "design" }: Props) => {
  const theme = useTheme();
  const styles = IconStyle[type];

  return (
    <ListItem
      disableGutters
      sx={{
        py: 1.5,
        transition: "all .2s ease",
        "&:hover": {
          background: "rgba(255,255,255,0.03)",
          borderRadius: "12px",
        },
      }}
    >
      <Stack direction="row" spacing={2} alignItems="center">
        <Box
          sx={{
            mt: "4px",
            width: 32,
            height: 32,
            borderRadius: "8px",
            backgroundColor: styles.bg,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: styles.color,
          }}
        >
          <Icon size={16} />
        </Box>
        <Stack>
          <Typography fontSize={14} fontWeight={600}>
            {title}
          </Typography>
          <Typography fontSize={12} color={theme.palette.text.secondary}>
            {date}
          </Typography>
        </Stack>
      </Stack>
    </ListItem>
  );
};

export default OrderRow;
