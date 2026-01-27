import {
  cardStyles,
  mergeSx,
  spacing,
  typographyStyles,
} from "@/styles/commonStyles";
import {
  Box,
  Card,
  Divider,
  Skeleton,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";

const ACCOUNT_CONTENT = {
  title: "Account Settings",
  subTitle: "Manage your account information and security",
  infoAccount: "Account Information",
  profileInfo: "Profile Details",
};

interface Props {
  className?: string;
}

const AccountSettingsSkeleton = ({ className }: Props) => {
  const theme = useTheme();

  return (
    <Box className={className}>
      <Card
        sx={mergeSx(cardStyles.glassCard(theme), {
          p: spacing.cardPadding,
          maxWidth: 800,
          mx: "auto",
        })}
      >
        <Stack spacing={3}>
          <Stack spacing={1}>
            <Typography sx={typographyStyles.cardTitle(theme)}>
              {ACCOUNT_CONTENT.title}
            </Typography>
            <Typography sx={typographyStyles.bodySecondary(theme)}>
              {ACCOUNT_CONTENT.subTitle}
            </Typography>
          </Stack>

          <Divider sx={{ borderColor: "rgba(255,255,255,0.08)" }} />

          <Stack spacing={2.5}>
            <Typography
              sx={mergeSx(typographyStyles.bodyPrimary(theme), {
                fontWeight: 600,
                fontSize: 16,
              })}
            >
              {ACCOUNT_CONTENT.infoAccount}
            </Typography>

            <Skeleton
              variant="rounded"
              height={56}
              sx={{ borderRadius: "12px" }}
            />
            <Skeleton
              variant="rounded"
              height={56}
              sx={{ borderRadius: "12px" }}
            />
          </Stack>

          <Divider sx={{ borderColor: "rgba(255,255,255,0.08)" }} />

          <Stack spacing={2.5}>
            <Typography
              sx={mergeSx(typographyStyles.bodyPrimary(theme), {
                fontWeight: 600,
                fontSize: 16,
              })}
            >
              {ACCOUNT_CONTENT.profileInfo}
            </Typography>

            <Skeleton
              variant="rounded"
              height={56}
              sx={{ borderRadius: "12px" }}
            />
            <Skeleton
              variant="rounded"
              height={56}
              sx={{ borderRadius: "12px" }}
            />
            <Skeleton
              variant="rounded"
              height={56}
              sx={{ borderRadius: "12px" }}
            />
          </Stack>

          <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ mt: 3 }}>
            <Skeleton
              variant="rounded"
              height={42}
              sx={{ borderRadius: "12px", flex: 1 }}
            />
            <Skeleton
              variant="rounded"
              height={42}
              sx={{ borderRadius: "12px", flex: 1 }}
            />
          </Stack>
        </Stack>
      </Card>
    </Box>
  );
};

export default AccountSettingsSkeleton;
