import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import TableChartIcon from "@mui/icons-material/TableChart";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import SettingsIcon from "@mui/icons-material/Settings";
import { type SvgIconComponent } from "@mui/icons-material";

export interface SearchablePage {
  title: string;
  path: string;
  icon: SvgIconComponent;
  keywords: string[];
}

export const searchablePages: SearchablePage[] = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: DashboardIcon,
    keywords: ["home", "hlavná", "prehľad", "overview", "analytics"],
  },
  {
    title: "Profile",
    path: "/profile",
    icon: PersonIcon,
    keywords: ["profil", "user", "používateľ", "account", "účet"],
  },
  {
    title: "Tables",
    path: "/tables",
    icon: TableChartIcon,
    keywords: ["tabuľky", "authors", "autori", "projects", "projekty", "data"],
  },
  {
    title: "Billing",
    path: "/billing",
    icon: CreditCardIcon,
    keywords: [
      "fakturácia",
      "platby",
      "payments",
      "invoices",
      "faktúry",
      "credit card",
    ],
  },
  {
    title: "Settings - Account",
    path: "/settings/account",
    icon: SettingsIcon,
    keywords: ["nastavenia", "účet", "account", "email", "heslo", "password"],
  },
  {
    title: "Settings - Profile",
    path: "/settings/profile",
    icon: SettingsIcon,
    keywords: ["nastavenia", "profil", "bio", "avatar", "meno"],
  },
  {
    title: "Settings - Notifications",
    path: "/settings/notifications",
    icon: SettingsIcon,
    keywords: ["nastavenia", "notifikácie", "upozornenia", "alerts"],
  },
  {
    title: "Settings - Privacy",
    path: "/settings/privacy",
    icon: SettingsIcon,
    keywords: ["nastavenia", "súkromie", "privacy", "security", "bezpečnosť"],
  },
  {
    title: "Settings - Preferences",
    path: "/settings/preferences",
    icon: SettingsIcon,
    keywords: [
      "nastavenia",
      "preferencie",
      "theme",
      "téma",
      "language",
      "jazyk",
    ],
  },
];

export interface SearchResult {
  type: "page" | "author" | "project" | "billing" | "invoice" | "transaction";
  title: string;
  subtitle?: string;
  path: string;
  icon?: SvgIconComponent;
  image?: string;
}
