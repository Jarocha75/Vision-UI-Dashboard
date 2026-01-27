import {
  Box,
  Button,
  Card,
  CircularProgress,
  Divider,
  IconButton,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTranslation } from "react-i18next";
import {
  cardStyles,
  typographyStyles,
  containerStyles,
  mergeSx,
} from "@/styles/commonStyles";
import useInvoices from "@/hooks/invoices/useInvoices";
import useDeleteInvoice from "@/hooks/invoices/useDeleteInvoice";
import { useNavigate } from "react-router-dom";
import { generateInvoicePdf } from "@/utils/generateInvoicePdf";
import type { Invoice } from "@/types/invoices";

interface Props {
  className?: string;
}

const InvoicesCard = ({ className }: Props) => {
  const theme = useTheme();
  const { t } = useTranslation();
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
    <Card
      className={className}
      sx={mergeSx(cardStyles.glassCard(theme), {
        p: { xs: 2, md: 2.5 },
        minHeight: { xs: 400, lg: 386 },
      })}
    >
      <Stack spacing={{ xs: 1.5, md: 2 }}>
        {/* Header */}
        <Box sx={containerStyles.flexBetween()}>
          <Typography sx={typographyStyles.cardTitle(theme)}>
            {t("billing.invoices")}
          </Typography>
          <Button
            variant="contained"
            size="small"
            onClick={() => navigate("/invoices")}
            sx={{
              background: "linear-gradient(135deg, #5E8EFF 0%, #3d5afe 100%)",
              borderRadius: "8px",
              textTransform: "uppercase",
              fontSize: { xs: 10, md: 11 },
              fontWeight: 700,
              px: { xs: 2, md: 2.5 },
              py: { xs: 0.75, md: 1 },
              boxShadow: "0 4px 12px rgba(94, 142, 255, 0.3)",
              "&:hover": {
                background: "linear-gradient(135deg, #4a7fee 0%, #2d4fcc 100%)",
                boxShadow: "0 6px 16px rgba(94, 142, 255, 0.4)",
              },
            }}
          >
            {t("billing.viewAll")}
          </Button>
        </Box>

        {isLoading && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              py: 4,
            }}
          >
            <CircularProgress size={32} />
          </Box>
        )}

        {isError && (
          <Typography
            sx={{
              ...typographyStyles.bodySecondary(theme),
              textAlign: "center",
              py: 4,
              color: "#F5365C",
            }}
          >
            {t("billing.errorLoadingInvoices")}
          </Typography>
        )}

        {!isLoading && !isError && (!invoices || invoices.length === 0) && (
          <Typography
            sx={{
              ...typographyStyles.bodySecondary(theme),
              textAlign: "center",
              py: 4,
            }}
          >
            {t("billing.noInvoices")}
          </Typography>
        )}

        {!isLoading && !isError && invoices && invoices.length > 0 && (
          <Box
            sx={{
              maxHeight: 386,
              overflowY: "auto",
              pr: 1,
              scrollbarWidth: "thin",
              "&::-webkit-scrollbar": {
                width: 6,
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "rgba(255,255,255,0.2)",
                borderRadius: 8,
              },
              "&::-webkit-scrollbar-track": {
                backgroundColor: "transparent",
              },
            }}
          >
            <Stack spacing={0}>
              {invoices.map((invoice, index) => (
                <Box key={invoice.id}>
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    spacing={2}
                    sx={{
                      py: { xs: 1.5, md: 1.75 },
                    }}
                  >
                    <Stack spacing={0.5} flex={1}>
                      <Typography
                        sx={mergeSx(typographyStyles.bodyPrimary(theme), {
                          fontWeight: 500,
                        })}
                      >
                        {invoice.clientName}
                      </Typography>
                      <Typography
                        sx={mergeSx(typographyStyles.bodySecondary(theme), {
                          fontSize: { xs: 11, md: 13 },
                        })}
                      >
                        {invoice.invoiceNumber} •{" "}
                        {formatDate(invoice.createdAt)}
                      </Typography>
                    </Stack>

                    <Stack
                      direction="row"
                      alignItems="center"
                      spacing={{ xs: 1.5, md: 2 }}
                      sx={{ flexShrink: 0 }}
                    >
                      <Box
                        sx={{
                          px: 1,
                          py: 0.25,
                          borderRadius: "4px",
                          backgroundColor: `${getStatusColor(invoice.status)}20`,
                        }}
                      >
                        <Typography
                          sx={{
                            fontSize: { xs: 10, md: 11 },
                            fontWeight: 600,
                            textTransform: "uppercase",
                            color: getStatusColor(invoice.status),
                          }}
                        >
                          {invoice.status}
                        </Typography>
                      </Box>
                      <Typography
                        sx={mergeSx(typographyStyles.smallValue(theme), {
                          fontSize: { xs: 14, md: 15 },
                        })}
                      >
                        {invoice.amount}
                      </Typography>
                      <Box
                        onClick={() => handleViewPdf(invoice)}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 0.5,
                          color: theme.palette.text.secondary,
                          cursor: "pointer",
                          "&:hover": {
                            color: theme.palette.text.primary,
                          },
                        }}
                      >
                        <PictureAsPdfIcon
                          sx={{ fontSize: { xs: 16, md: 18 } }}
                        />
                        <Typography
                          sx={{
                            fontSize: { xs: 11, md: 12 },
                            fontWeight: 500,
                            textTransform: "uppercase",
                          }}
                        >
                          {t("billing.pdf")}
                        </Typography>
                      </Box>
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
                        <DeleteIcon sx={{ fontSize: { xs: 16, md: 18 } }} />
                      </IconButton>
                    </Stack>
                  </Stack>

                  {index < invoices.length - 1 && (
                    <Divider
                      sx={{
                        borderColor: "rgba(255, 255, 255, 0.08)",
                        opacity: 0.6,
                      }}
                    />
                  )}
                </Box>
              ))}
            </Stack>
          </Box>
        )}
      </Stack>
    </Card>
  );
};

export default InvoicesCard;
