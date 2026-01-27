import IconDone from "@/assets/icons/iconDone.png";
import ProjectsTableRow from "@/components/tables/ProjectsTableRow";
import { projectsTable, type Project } from "@/data/projectsTableData";
import {
  Box,
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
import TableHeaderCell from "./TableHeaderCell";

const ProjectsTableCard = () => {
  const theme = useTheme();
  const { t } = useTranslation();

  const columns = [
    { id: "companies", label: t("tables.companies"), align: "left" as const },
    { id: "budget", label: t("tables.budget"), align: "left" as const },
    { id: "status", label: t("tables.status"), align: "left" as const },
    { id: "completion", label: t("tables.completion"), align: "left" as const },
  ];

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        borderRadius: { xs: "12px", sm: "20px" },
        height: { xs: "auto", sm: 320, lg: 453 },
        background: theme.palette.card.overlay,
        backdropFilter: "blur(120px)",
      }}
    >
      <Stack sx={{ px: { xs: 1.5, sm: 2.5 }, pt: { xs: 2, sm: 2.5 }, pb: 1.5 }}>
        <Typography
          sx={{
            fontWeight: 700,
            fontSize: { xs: 16, sm: 18 },
            color: theme.palette.text.primary,
          }}
        >
          {t("tables.projects")}
        </Typography>
        <Stack direction="row" spacing={0.75} alignItems="center">
          <Box
            component="img"
            src={IconDone}
            alt="done"
            sx={{ width: { xs: 14, sm: 16 }, height: { xs: 14, sm: 16 } }}
          />
          <Typography
            fontSize={{ xs: 12, sm: 14 }}
            fontWeight={700}
            color={theme.palette.text.secondary}
          >
            {t("tables.projectsSubtitle")}
          </Typography>
        </Stack>
      </Stack>

      <TableContainer sx={{ overflowX: { xs: "auto", md: "visible" } }}>
        <Table sx={{ width: "100%", tableLayout: { xs: "auto", md: "fixed" }, minWidth: { xs: 600, md: "auto" } }}>
          <TableHead sx={{ display: { xs: "none", sm: "table-header-group" } }}>
            <TableRow>
              {columns.map((column, index) => (
                <TableHeaderCell
                  key={column.id}
                  label={column.label}
                  align={column.align}
                  sx={
                    index === 0
                      ? { pl: { xs: 2, sm: 3 }, width: "38%" }
                      : index === 1
                      ? { pl: 2, width: "20%" }
                      : index === 2
                      ? { pl: 2, width: "15%" }
                      : index === 3
                      ? { pl: 2, width: "17%" }
                      : { width: "10%", pr: { xs: 1.5, sm: 2.5 } }
                  }
                />
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {projectsTable.map((project: Project) => (
              <ProjectsTableRow key={project.company} project={project} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
};

export default ProjectsTableCard;
