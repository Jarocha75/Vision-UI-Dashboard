import atlassianLogo from "@/assets/logos/atlassian.svg";
import chakraLogo from "@/assets/logos/chakra.svg";
import jiraLogo from "@/assets/logos/jira.svg";
import slackLogo from "@/assets/logos/slack.svg";
import spotifyLogo from "@/assets/logos/spotify.svg";

export interface Project {
  company: string;
  logo: string;
  budget: number | null;
  status: "Working" | "Canceled" | "Done";
  completion: number;
}

export const projectsTable: Project[] = [
  {
    company: "Chakra Soft UI Version",
    logo: atlassianLogo,
    budget: 14000,
    status: "Working",
    completion: 60,
  },
  {
    company: "Add Progress Track",
    logo: chakraLogo,
    budget: 3000,
    status: "Canceled",
    completion: 10,
  },
  {
    company: "Fix Platform Errors",
    logo: slackLogo,
    budget: null,
    status: "Done",
    completion: 100,
  },
  {
    company: "Launch our Mobile App",
    logo: spotifyLogo,
    budget: 32000,
    status: "Done",
    completion: 100,
  },
  {
    company: "Add the New Pricing Page",
    logo: jiraLogo,
    budget: 400,
    status: "Working",
    completion: 25,
  },
];
