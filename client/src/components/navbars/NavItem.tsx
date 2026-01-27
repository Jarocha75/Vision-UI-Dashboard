import { Stack, Typography, useTheme } from "@mui/material";
import { type LucideIcon } from "lucide-react";
import { NavLink } from "react-router-dom";

interface Props {
  icon: LucideIcon;
  label: string;
  to?: string;
}

const NavItem = ({ icon: Icon, label, to = "/" }: Props) => {
  const theme = useTheme();

  return (
    <Stack
      component={NavLink}
      to={to}
      direction="row"
      alignItems="center"
      spacing={1}
      sx={{
        textDecoration: "none",
        color: theme.palette.text.primary,
        transition: "color 0.2s ease",
        "&.active": {
          color: theme.palette.text.primary,
        },
        "&:hover": {
          color: theme.palette.text.secondary,
        },
      }}
    >
      <Icon size={14} />
      <Typography fontSize={10} fontWeight={700} textTransform={"uppercase"}>
        {label}
      </Typography>
    </Stack>
  );
};

export default NavItem;
