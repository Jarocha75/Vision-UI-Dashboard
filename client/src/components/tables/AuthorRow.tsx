import {
  TableRow,
  TableCell,
  Stack,
  Avatar,
  Typography,
  Chip,
  Button,
  useTheme,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { type Author } from "@/data/authorsData";

interface Props {
  author: Author;
}

const AuthorRow = ({ author }: Props) => {
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <TableRow
      sx={{
        "&:last-child td": {
          borderBottom: 0,
        },
      }}
    >
      <TableCell sx={{ py: 1.5, px: 2 }}>
        <Stack direction="row" spacing={1.5} alignItems="center">
          <Avatar src={author.image} sx={{ width: 32, height: 32 }} />

          <Stack spacing={0.25}>
            <Typography
              fontWeight={400}
              fontSize={14}
              color={theme.palette.text.primary}
            >
              {author.fullName}
            </Typography>
            <Typography
              fontWeight={400}
              fontSize={14}
              color={theme.palette.text.secondary}
            >
              {author.email}
            </Typography>
          </Stack>
        </Stack>
      </TableCell>

      <TableCell sx={{ py: 1.5, px: 2 }}>
        <Stack spacing={0.25}>
          <Typography
            fontWeight={400}
            fontSize={14}
            color={theme.palette.text.primary}
          >
            {author.function}
          </Typography>
          <Typography
            fontWeight={400}
            fontSize={14}
            color={theme.palette.text.secondary}
          >
            {author.organization}
          </Typography>
        </Stack>
      </TableCell>

      <TableCell sx={{ py: 1.5, px: 2 }}>
        <Chip
          label={author.status}
          size="small"
          color={author.status === "Online" ? "success" : "default"}
        />
      </TableCell>

      <TableCell sx={{ py: 1.5, px: 2 }}>
        <Typography
          fontWeight={400}
          fontSize={14}
          color={theme.palette.text.primary}
        >
          {author.employed}
        </Typography>
      </TableCell>

      <TableCell align="right" sx={{ py: 1.5, px: 2 }}>
        <Button
          variant="text"
          size="small"
          sx={{
            textTransform: "none",
            color: "text.secondary",
          }}
        >
          {t("tables.edit")}
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default AuthorRow;
