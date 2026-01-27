import {
  Box,
  Button,
  Card,
  CircularProgress,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useTheme,
} from "@mui/material";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import {
  cardStyles,
  typographyStyles,
  mergeSx,
} from "@/styles/commonStyles";
import useInvoices from "@/hooks/invoices/useInvoices";
import useDeleteInvoice from "@/hooks/invoices/useDeleteInvoice";
import Footer from "@/components/Footer";
import { generateInvoicePdf } from "@/utils/generateInvoicePdf";
import type { Invoice } from "@/types/invoices";

const Invoices = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { data: invoices, isLoading, isError } = useInvoices();
  const deleteInvoice = useDeleteInvoice();

  const handleDelete = (id: number) => {
    deleteInvoice.mutate(id);
  };

  const handleViewPdf = (invoice: Invoice) => {
    generateInvoicePdf(invoice);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "#2dce89";
      case "sent":
        return "#5E8EFF";
      case "draft":
        return "#A0AEC0";
      case "cancelled":
        return "#F5365C";
      default:
        return "#A0AEC0";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("sk-SK");
  };

  return (
    <>
      <Box sx={{ p: { xs: 2, md: 3 } }}>
        <Stack spacing={3}>
          {/* Header */}
          <Stack direction="row" alignItems="center" spacing={2}>
            <IconButton
              onClick={() => navigate("/billing")}
              sx={{
                color: theme.palette.text.secondary,
                "&:hover": {
                  color: theme.palette.text.primary,
                },
              }}
            >
              <ArrowBackIcon />
            </IconButton>
            <Typography
              sx={{
                fontSize: { xs: 20, md: 24 },
                fontWeight: 700,
                color: theme.palette.text.primary,
              }}
            >
              Všetky faktúry
            </Typography>
          </Stack>

          {/* Main Card */}
          <Card
            sx={mergeSx(cardStyles.glassCard(theme), {
              p: { xs: 2, md: 3 },
            })}
          >
            {isLoading && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  py: 6,
                }}
              >
                <CircularProgress size={40} />
              </Box>
            )}

            {isError && (
              <Typography
                sx={{
                  ...typographyStyles.bodySecondary(theme),
                  textAlign: "center",
                  py: 6,
                  color: "#F5365C",
                }}
              >
                Nepodarilo sa načítať faktúry
              </Typography>
            )}

            {!isLoading && !isError && (!invoices || invoices.length === 0) && (
              <Typography
                sx={{
                  ...typographyStyles.bodySecondary(theme),
                  textAlign: "center",
                  py: 6,
                }}
              >
                Žiadne faktúry
              </Typography>
            )}

            {!isLoading && !isError && invoices && invoices.length > 0 && (
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ color: theme.palette.text.secondary, fontWeight: 600, borderColor: "rgba(255, 255, 255, 0.08)" }}>
                        Číslo faktúry
                      </TableCell>
                      <TableCell sx={{ color: theme.palette.text.secondary, fontWeight: 600, borderColor: "rgba(255, 255, 255, 0.08)" }}>
                        Klient
                      </TableCell>
                      <TableCell sx={{ color: theme.palette.text.secondary, fontWeight: 600, borderColor: "rgba(255, 255, 255, 0.08)" }}>
                        Dátum
                      </TableCell>
                      <TableCell sx={{ color: theme.palette.text.secondary, fontWeight: 600, borderColor: "rgba(255, 255, 255, 0.08)" }}>
                        Stav
                      </TableCell>
                      <TableCell sx={{ color: theme.palette.text.secondary, fontWeight: 600, borderColor: "rgba(255, 255, 255, 0.08)" }}>
                        Suma
                      </TableCell>
                      <TableCell sx={{ color: theme.palette.text.secondary, fontWeight: 600, borderColor: "rgba(255, 255, 255, 0.08)" }} align="right">
                        Akcie
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {invoices.map((invoice) => (
                      <TableRow
                        key={invoice.id}
                        sx={{
                          "&:hover": {
                            backgroundColor: "rgba(255, 255, 255, 0.02)",
                          },
                        }}
                      >
                        <TableCell sx={{ color: theme.palette.text.primary, borderColor: "rgba(255, 255, 255, 0.08)" }}>
                          {invoice.invoiceNumber}
                        </TableCell>
                        <TableCell sx={{ borderColor: "rgba(255, 255, 255, 0.08)" }}>
                          <Stack spacing={0.25}>
                            <Typography sx={{ color: theme.palette.text.primary, fontWeight: 500 }}>
                              {invoice.clientName}
                            </Typography>
                            {invoice.clientEmail && (
                              <Typography sx={{ color: theme.palette.text.secondary, fontSize: 12 }}>
                                {invoice.clientEmail}
                              </Typography>
                            )}
                          </Stack>
                        </TableCell>
                        <TableCell sx={{ color: theme.palette.text.secondary, borderColor: "rgba(255, 255, 255, 0.08)" }}>
                          {formatDate(invoice.createdAt)}
                        </TableCell>
                        <TableCell sx={{ borderColor: "rgba(255, 255, 255, 0.08)" }}>
                          <Box
                            sx={{
                              display: "inline-block",
                              px: 1.5,
                              py: 0.5,
                              borderRadius: "6px",
                              backgroundColor: `${getStatusColor(invoice.status)}20`,
                            }}
                          >
                            <Typography
                              sx={{
                                fontSize: 11,
                                fontWeight: 600,
                                textTransform: "uppercase",
                                color: getStatusColor(invoice.status),
                              }}
                            >
                              {invoice.status}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell sx={{ color: theme.palette.text.primary, fontWeight: 600, borderColor: "rgba(255, 255, 255, 0.08)" }}>
                          {invoice.amount}
                        </TableCell>
                        <TableCell sx={{ borderColor: "rgba(255, 255, 255, 0.08)" }} align="right">
                          <Stack direction="row" spacing={1} justifyContent="flex-end">
                            <Button
                              size="small"
                              startIcon={<PictureAsPdfIcon />}
                              onClick={() => handleViewPdf(invoice)}
                              sx={{
                                color: theme.palette.text.secondary,
                                textTransform: "uppercase",
                                fontSize: 11,
                                fontWeight: 600,
                                "&:hover": {
                                  color: theme.palette.text.primary,
                                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                                },
                              }}
                            >
                              PDF
                            </Button>
                            <IconButton
                              size="small"
                              onClick={() => handleDelete(invoice.id)}
                              sx={{
                                color: theme.palette.text.secondary,
                                "&:hover": {
                                  color: "#F5365C",
                                },
                              }}
                            >
                              <DeleteIcon sx={{ fontSize: 18 }} />
                            </IconButton>
                          </Stack>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </Card>
        </Stack>
      </Box>
      <Footer />
    </>
  );
};

export default Invoices;
