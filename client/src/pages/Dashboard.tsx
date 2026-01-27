import { Grid } from "@mui/material";
import { useTranslation } from "react-i18next";
import AnalyticsCard from "@/components/cards/AnalyticsCard";
import WelcomeCard from "@/components/cards/WelcomeCard";
import SatisfactionRateCard from "@/components/cards/SatisfactionRateCard";
import ReferralTrackingCard from "@/components/cards/ReferralTrackingCard";
import SalesOverviewCard from "@/components/cards/SalesOverviewCard";
import ActiveUsersCard from "@/components/cards/ActiveUsersCard";
import ProjectsCard from "@/components/cards/ProjectsCard";
import OrdersOverviewCard from "@/components/cards/OrdersOverviewCard";
import Footer from "@/components/Footer";

const Dashboard = () => {
  const { t } = useTranslation();

  return (
    <Grid
      container
      spacing={3}
      sx={{
        overflow: "hidden",
      }}
    >
      <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
        <AnalyticsCard
          title={t("analyticsCard.todaysMoney")}
          value="$53,000"
          change="+55%"
          icon="money"
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
        <AnalyticsCard
          title={t("analyticsCard.todaysUsers")}
          value="2,300"
          change="+3%"
          icon="users"
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
        <AnalyticsCard
          title={t("analyticsCard.newClients")}
          value="+3,462"
          change="-2%"
          icon="clients"
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
        <AnalyticsCard
          title={t("analyticsCard.totalSales")}
          value="$103,430"
          change="+5%"
          icon="sales"
        />
      </Grid>

      <Grid size={{ xs: 12, lg: 5 }}>
        <WelcomeCard />
      </Grid>

      <Grid size={{ xs: 12, lg: 3 }}>
        <SatisfactionRateCard />
      </Grid>

      <Grid size={{ xs: 12, lg: 4 }}>
        <ReferralTrackingCard />
      </Grid>

      <Grid size={{ xs: 12, lg: 7 }}>
        <SalesOverviewCard />
      </Grid>

      <Grid size={{ xs: 12, lg: 5 }}>
        <ActiveUsersCard />
      </Grid>

      <Grid size={{ xs: 12, lg: 8 }}>
        <ProjectsCard />
      </Grid>

      <Grid size={{ xs: 12, lg: 4 }}>
        <OrdersOverviewCard />
      </Grid>

      <Grid size={{ xs: 12 }}>
        <Footer />
      </Grid>
    </Grid>
  );
};

export default Dashboard;
