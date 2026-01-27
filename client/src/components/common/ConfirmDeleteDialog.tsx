import { cardStyles, spacing, typographyStyles } from "@/styles/commonStyles";
import {
  Button,
  Card,
  CircularProgress,
  Dialog,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";

interface Props {
  open: boolean;
  title?: string;
  message: string;
  confirmText?: string;
  cancelText: string;
  onConfirm: () => void;
  onCancel: () => void;
  isLoading?: boolean;
}

const ConfirmDeleteDialog = ({
  open,
  title = "Potvrdiť zmazanie",
  message,
  confirmText = "Potvrdiť",
  cancelText = "Zrušiť",
  onConfirm,
  onCancel,
  isLoading,
}: Props) => {
  const theme = useTheme();

  return (
    <Dialog
      open={open}
      onClose={isLoading ? undefined : onCancel}
      PaperProps={{ sx: { backgroundColor: "transparent", boxShadow: "none" } }}
    >
      <Card
        sx={{
          ...cardStyles.glassCard(theme),
          p: spacing.cardPadding,
          minWidth: 450,
        }}
      >
        <Typography sx={typographyStyles.cardTitle(theme)}>{title}</Typography>
        <Typography sx={{ ...typographyStyles.bodySecondary(theme), mt: 2 }}>
          {message}
        </Typography>
        <Stack direction="row" spacing={2} justifyContent="flex-end" mt={3}>
          <Button onClick={onCancel} disabled={isLoading}>
            {cancelText}
          </Button>
          <Button
            onClick={onConfirm}
            variant="contained"
            color="error"
            disabled={isLoading}
          >
            {isLoading ? <CircularProgress size={20} /> : confirmText}
          </Button>
        </Stack>
      </Card>
    </Dialog>
  );
};

export default ConfirmDeleteDialog;
