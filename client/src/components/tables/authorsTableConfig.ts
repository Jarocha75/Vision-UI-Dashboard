export interface TableColumn {
  id: string;
  label: string;
  align?: "left" | "right" | "center";
}

export const AUTHORS_TABLE_CONFIG = {
  title: "Authors Table",
  columns: [
    { id: "author", label: "Author", align: "left" },
    { id: "function", label: "Function", align: "left" },
    { id: "status", label: "Status", align: "left" },
    { id: "employed", label: "Employed", align: "left" },
    { id: "action", label: "Action", align: "right" },
  ] as TableColumn[],
} as const;
