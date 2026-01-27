import {
  Card,
  Stack,
  Typography,
  List,
  Box,
  useTheme,
  CircularProgress,
} from "@mui/material";
import { Calendar } from "lucide-react";
import { useTranslation } from "react-i18next";
import { TransactionRow } from "./TransactionRow";
import {
  cardStyles,
  typographyStyles,
  spacing,
  mergeSx,
} from "../../../styles/commonStyles";
import useTransactions from "@/hooks/transactions/useTransactions";
import { useMemo, useState } from "react";
import type { Transaction } from "@/types/transactions";
import EditTransactionDialog from "./EditTransactionDialog";

interface Props {
  dateRange?: string;
  className?: string;
}

const getCurrentWeekRange = (): string => {
  const now = new Date();
  const dayOfWeek = now.getDay();
  const monday = new Date(now);
  monday.setDate(now.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1));

  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);

  const formatDate = (date: Date) => date.getDate();
  const formatMonth = (date: Date) =>
    date.toLocaleDateString("en-US", { month: "long" });
  const formatYear = (date: Date) => date.getFullYear();

  if (monday.getMonth() === sunday.getMonth()) {
    return `${formatDate(monday)} - ${formatDate(sunday)} ${formatMonth(sunday)} ${formatYear(sunday)}`;
  }

  return `${formatDate(monday)} ${formatMonth(monday)} - ${formatDate(sunday)} ${formatMonth(sunday)} ${formatYear(sunday)}`;
};

const TransactionsCard = ({
  dateRange = getCurrentWeekRange(),
  className,
}: Props) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const { data: transactions, isLoading, isError } = useTransactions();
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);

  const handleEditClick = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setEditDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setEditDialogOpen(false);
    setSelectedTransaction(null);
  };

  const groupedTransactions = useMemo(() => {
    if (!transactions || transactions.length === 0) return [];

    const sorted = [...transactions].sort(
      (a, b) => new Date(b.ISO).getTime() - new Date(a.ISO).getTime(),
    );

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const newest: Transaction[] = [];
    const yesterdayItems: Transaction[] = [];
    const older: Transaction[] = [];

    sorted.forEach((t) => {
      const date = new Date(t.ISO);
      date.setHours(0, 0, 0, 0);

      if (date.getTime() >= today.getTime()) {
        newest.push(t);
      } else if (date.getTime() >= yesterday.getTime()) {
        yesterdayItems.push(t);
      } else {
        older.push(t);
      }
    });

    const groups = [];
    if (newest.length > 0)
      groups.push({ label: t("billing.newest"), items: newest });
    if (yesterdayItems.length > 0)
      groups.push({ label: t("billing.yesterday"), items: yesterdayItems });
    if (older.length > 0)
      groups.push({ label: t("billing.older"), items: older });

    return groups;
  }, [transactions, t]);

  return (
    <>
      <Card
        className={className}
        sx={mergeSx(cardStyles.basicCard(theme), {
          p: spacing.cardPadding,
          height: 538,
          flexShrink: 0,
        })}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          mb={3}
        >
          <Typography sx={typographyStyles.cardTitle(theme)}>
            {t("billing.yourTransactions")}
          </Typography>
          <Stack direction="row" spacing={1} alignItems="center">
            <Calendar size={16} color="#A0AEC0" />
            <Typography
              sx={{
                ...typographyStyles.bodySecondary(theme),
                fontSize: "0.875rem",
              }}
            >
              {dateRange}
            </Typography>
          </Stack>
        </Stack>

        <Box sx={{ overflowY: "auto", maxHeight: "calc(100% - 60px)" }}>
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
              {t("billing.errorLoadingTransactions")}
            </Typography>
          )}

          {!isLoading && !isError && groupedTransactions.length === 0 && (
            <Typography
              sx={{
                ...typographyStyles.bodySecondary(theme),
                textAlign: "center",
                py: 4,
              }}
            >
              {t("billing.noTransactions")}
            </Typography>
          )}

          {!isLoading &&
            !isError &&
            groupedTransactions.map((group, index) => (
              <Box
                key={group.label}
                sx={{ mb: index < groupedTransactions.length - 1 ? 3 : 0 }}
              >
                <Typography
                  sx={{
                    ...typographyStyles.bodySecondary(theme),
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    letterSpacing: "0.5px",
                    mb: 1,
                    color: "#A0AEC0",
                  }}
                >
                  {group.label}
                </Typography>

                <List sx={{ py: 0 }}>
                  {group.items.map((transaction) => (
                    <TransactionRow
                      key={transaction.id}
                      transaction={transaction}
                      onEditClick={handleEditClick}
                    />
                  ))}
                </List>
              </Box>
            ))}
        </Box>
      </Card>
      <EditTransactionDialog
        open={editDialogOpen}
        transaction={selectedTransaction}
        onClose={handleCloseDialog}
      />
    </>
  );
};

export default TransactionsCard;
