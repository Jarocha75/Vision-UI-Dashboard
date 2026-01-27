import { authorsData, type Author } from "@/data/authorsData";
import {
  Card,
  Stack,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useTheme,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import AuthorRow from "./AuthorRow";
import TableHeaderCell from "./TableHeaderCell";

const AuthorsTableCard = () => {
  const theme = useTheme();
  const { t } = useTranslation();

  const columns = [
    { id: "author", label: t("tables.author"), align: "left" as const },
    { id: "function", label: t("tables.function"), align: "left" as const },
    { id: "status", label: t("tables.status"), align: "left" as const },
    { id: "employed", label: t("tables.employed"), align: "left" as const },
    { id: "action", label: t("tables.action"), align: "right" as const },
  ];

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        borderRadius: "20px",
        height: { xs: "auto", sm: 320, lg: 520 },
        background: theme.palette.card.overlay,
        backdropFilter: "blur(120px)",
      }}
    >
      <Stack sx={{ px: 2.5, pt: 2.5, pb: 1.5 }}>
        <Typography
          sx={{
            fontWeight: 700,
            fontSize: 18,
            color: theme.palette.text.primary,
          }}
        >
          {t("tables.authorsTable")}
        </Typography>
      </Stack>

      <TableContainer>
        <Table sx={{ width: "100%" }}>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableHeaderCell
                  key={column.id}
                  label={column.label}
                  align={column.align}
                />
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {authorsData.map((author: Author) => (
              <AuthorRow key={author.email} author={author} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
};

export default AuthorsTableCard;
