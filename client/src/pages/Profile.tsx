import Footer from "@/components/Footer";
import CarInfoCard from "@/components/profile/CarInfoCard";
import PlatformSetCard from "@/components/profile/PlatformSetCard";
import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileInfoCard from "@/components/profile/ProfileInfoCard";
import ProjectsProfileCard from "@/components/profile/ProjectsProfileCard";
import WelcomeBackCard from "@/components/profile/WelcomeBackCard";
import { useMiniCardsData } from "@/data/miniCardsData";
import { socialMediaData } from "@/data/socialMediaData";
import { Grid } from "@mui/material";

const Profile = () => {
  const miniCardsData = useMiniCardsData();

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
      <Grid size={{ xs: 12 }}>
        <ProfileHeader />
      </Grid>

      <Grid size={{ xs: 12, lg: 3 }}>
        <WelcomeBackCard />
      </Grid>

      <Grid size={{ xs: 12, lg: 6 }}>
        <CarInfoCard miniCards={miniCardsData} />
      </Grid>

      <Grid size={{ xs: 12, lg: 3 }}>
        <ProfileInfoCard socialMedia={socialMediaData} />
      </Grid>

      <Grid size={{ xs: 12, lg: 3 }}>
        <PlatformSetCard />
      </Grid>

      <Grid size={{ xs: 12, lg: 9 }}>
        <ProjectsProfileCard />
      </Grid>

      <Grid size={{ xs: 12 }}>
        <Footer />
      </Grid>
    </Grid>
  );
};

export default Profile;
