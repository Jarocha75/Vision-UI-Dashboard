import Footer from "@/components/Footer";
import AuthorsTableCard from "@/components/tables/AuthorsTableCard";
import ProjectsTableCard from "@/components/tables/ProjectsTableCard";
import { Grid } from "@mui/material";

const Table = () => {
  return (
    <Grid
      container
      spacing={3}
      sx={{
        overflow: "hidden",
        width: "100%",
        m: 0,
      }}
    >
      <Grid size={{ xs: 12, lg: 12 }}>
        <AuthorsTableCard />
      </Grid>

      <Grid size={{ xs: 12, lg: 12 }}>
        <ProjectsTableCard />
      </Grid>

      <Grid size={{ xs: 12 }}>
        <Footer />
      </Grid>
    </Grid>
  );
};

export default Table;
