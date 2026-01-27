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

const PROFILE_CONTENT = {
  title: "Profile Settings",
  subTitle: "Manage you public profile information",
  picture: "Profile Picture",
  personal: "Personal Information",
};

interface Props {
  className?: string;
}

const ProfileSettingsSkeleton = ({ className }: Props) => {
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
          {/* Header */}
          <Stack spacing={1}>
            <Typography sx={typographyStyles.cardTitle(theme)}>
              {PROFILE_CONTENT.title}
            </Typography>
            <Typography sx={typographyStyles.bodySecondary(theme)}>
              {PROFILE_CONTENT.subTitle}
            </Typography>
          </Stack>

          <Divider sx={{ borderColor: "rgba(255,255,255,0.08)" }} />

          {/* Profile Picture Section */}
          <Stack spacing={2.5}>
            <Typography
              sx={mergeSx(typographyStyles.bodyPrimary(theme), {
                fontWeight: 600,
                fontSize: 16,
              })}
            >
              {PROFILE_CONTENT.picture}
            </Typography>

            <Stack direction="row" alignItems="center" spacing={3}>
              <Skeleton variant="circular" width={100} height={100} />
              <Skeleton
                variant="rounded"
                width={140}
                height={42}
                sx={{ borderRadius: "12px" }}
              />
            </Stack>
          </Stack>

          <Divider sx={{ borderColor: "rgba(255,255,255,0.08)" }} />

          {/* Personal Information */}
          <Stack spacing={2.5}>
            <Typography
              sx={mergeSx(typographyStyles.bodyPrimary(theme), {
                fontWeight: 600,
                fontSize: 16,
              })}
            >
              {PROFILE_CONTENT.personal}
            </Typography>

            <Skeleton
              variant="rounded"
              height={56}
              sx={{ borderRadius: "12px" }}
            />
            <Skeleton
              variant="rounded"
              height={100}
              sx={{ borderRadius: "12px" }}
            />
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <Skeleton
                variant="rounded"
                height={56}
                sx={{ borderRadius: "12px", flex: 1 }}
              />
              <Skeleton
                variant="rounded"
                height={56}
                sx={{ borderRadius: "12px", flex: 1 }}
              />
            </Stack>
          </Stack>

          <Divider sx={{ borderColor: "rgba(255,255,255,0.08)" }} />

          {/* Social Links */}
          <Stack spacing={2.5}>
            <Typography
              sx={mergeSx(typographyStyles.bodyPrimary(theme), {
                fontWeight: 600,
                fontSize: 16,
              })}
            >
              Social Links
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

          {/* Action Buttons */}
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            sx={{ mt: 2 }}
          >
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

export default ProfileSettingsSkeleton;
