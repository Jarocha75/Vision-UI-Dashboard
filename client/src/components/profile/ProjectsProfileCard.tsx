import { Card, Stack, Typography, useTheme, Box } from "@mui/material";
import ProjectsItem from "./ProjectsItem";
import { useProjectsData, useCardContent } from "@/data/projectsData";

const ProjectsProfileCard = () => {
  const theme = useTheme();
  const projectsData = useProjectsData();
  const cardContent = useCardContent();

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        borderRadius: "20px",
        height: { xs: "auto", sm: 320, lg: 485 },
        background: theme.palette.card.overlay,
        backdropFilter: "blur(120px)",
      }}
    >
      <Stack justifyContent="flex-start" spacing={1.5} p={2.5}>
        <Typography
          sx={{
            fontWeight: 700,
            fontSize: 18,
            color: theme.palette.text.primary,
          }}
        >
          {cardContent.title}
        </Typography>
        <Typography
          sx={{
            fontWeight: 400,
            fontSize: 14,
            color: theme.palette.text.secondary,
          }}
        >
          {cardContent.description}
        </Typography>
        <Box
          sx={{
            pt: 1,
            overflowX: { xs: "auto", lg: "visible" },
            overflowY: "hidden",
            "&::-webkit-scrollbar": {
              height: 6,
            },
            "&::-webkit-scrollbar-thumb": {
              background: theme.palette.divider,
              borderRadius: 3,
            },
          }}
        >
          <Stack
            direction="row"
            spacing={1.5}
            sx={{
              width: { xs: "max-content", lg: "100%" },
              minWidth: { xs: "100%", lg: "auto" },
            }}
          >
            {projectsData.map((project) => (
              <ProjectsItem key={project.id} {...project} />
            ))}
          </Stack>
        </Box>
      </Stack>
    </Card>
  );
};

export default ProjectsProfileCard;
