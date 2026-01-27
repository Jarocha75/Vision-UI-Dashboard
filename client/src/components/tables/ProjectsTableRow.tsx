import type { Project } from "@/data/projectsTableData";
import {
  TableRow,
  TableCell,
  Stack,
  Avatar,
  Typography,
  LinearProgress,
  Chip,
  IconButton,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useTranslation } from "react-i18next";

interface Props {
  project: Project;
}

const ProjectsTableRow = ({ project }: Props) => {
  const { t } = useTranslation();
  return (
    <TableRow
      hover
      sx={{
        "&:last-child td": {
          borderBottom: 0,
        },
      }}
    >
      <TableCell sx={{ pl: { xs: 2, sm: 3 }, width: { xs: "auto", md: "38%" } }}>
        <Stack direction="row" spacing={{ xs: 1.5, sm: 2 }} alignItems="center">
          <Avatar src={project.logo} sx={{ width: { xs: 28, sm: 32 }, height: { xs: 28, sm: 32 } }} />
          <Typography fontSize={{ xs: 13, sm: 14 }} fontWeight={600}>
            {project.company}
          </Typography>
        </Stack>
      </TableCell>

      <TableCell sx={{ pl: 2, width: { xs: "auto", md: "20%" } }}>
        <Typography
          fontSize={{ xs: 13, sm: 14 }}
          fontWeight={600}
          color={project.budget ? "text.primary" : "text.secondary"}
        >
          {project.budget ? `$${project.budget.toLocaleString()}` : t("tables.notSet")}
        </Typography>
      </TableCell>

      <TableCell sx={{ pl: 2, width: { xs: "auto", md: "15%" } }}>
        <Chip
          label={project.status}
          size="small"
          color={
            project.status === "Working"
              ? "primary"
              : project.status === "Done"
              ? "success"
              : "default"
          }
          sx={{ fontSize: { xs: 11, sm: 12 }, fontWeight: 600 }}
        />
      </TableCell>

      <TableCell sx={{ pl: 2, width: { xs: "auto", md: "17%" } }}>
        <Stack spacing={{ xs: 0.5, sm: 1 }}>
          <Typography fontSize={{ xs: 11, sm: 12 }} fontWeight={600}>
            {project.completion}%
          </Typography>

          <LinearProgress
            variant="determinate"
            value={project.completion}
            sx={{
              height: 4,
              borderRadius: 4,
              backgroundColor: "rgba(255,255,255,0.12)",
              "& .MuiLinearProgress-bar": {
                backgroundColor: "#3A7BFF",
              },
            }}
          />
        </Stack>
      </TableCell>

      <TableCell align="right" sx={{ width: { xs: "auto", md: "10%" }, pr: { xs: 1.5, sm: 2.5 } }}>
        <IconButton size="small">
          <MoreVertIcon fontSize="small" />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export default ProjectsTableRow;
