import { ColumnDef } from "@tanstack/react-table";
import { Category } from "./types";

export const columns: ColumnDef<Category>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
];
