export interface TableColumn {
  id: string;
  label: string;
  align?: "left" | "right" | "center";
}

export const PROJECTS_TABLE_CONFIG = {
  title: "Projects",
  subTitle: "30 done this month",
  columns: [
    { id: "companies", label: "Companies", align: "left" },
    { id: "budget", label: "Budget", align: "left" },
    { id: "status", label: "Status", align: "left" },
    { id: "completion", label: "Completion", align: "left" },
    { id: "actions", label: "", align: "right" },
  ] as TableColumn[],
} as const;
