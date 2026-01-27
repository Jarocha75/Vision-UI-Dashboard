import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import type { Project } from "@/data/projectsData";

const ProjectsItem = ({ id, title, description, image, avatars }: Project) => {
  const theme = useTheme();

  return (
    <Stack spacing={1}>
      <Box
        component="img"
        src={image}
        sx={{
          width: "100%",
          height: 191,
          objectFit: "cover",
          borderRadius: 1,
        }}
      />

      <Typography
        sx={{
          fontWeight: 400,
          fontSize: 10,
          color: theme.palette.text.secondary,
          mt: 0.5,
        }}
      >
        Project #{id}
      </Typography>
      <Typography
        sx={{
          fontWeight: 700,
          fontSize: 18,
          color: theme.palette.text.primary,
        }}
      >
        {title}
      </Typography>
      <Typography
        sx={{
          fontWeight: 400,
          fontSize: 14,
          color: theme.palette.text.secondary,
        }}
      >
        {description}
      </Typography>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mt={3}
      >
        <Button variant="outlined" size="small">
          VIEW ALL
        </Button>

        <AvatarGroup
          max={4}
          sx={{ "& .MuiAvatar-root": { width: 20, height: 20, fontSize: 12 } }}
        >
          {avatars.map((avatar, index) => (
            <Avatar key={index} src={avatar} />
          ))}
        </AvatarGroup>
      </Stack>
    </Stack>
  );
};

export default ProjectsItem;
