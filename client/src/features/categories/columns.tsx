import { ColumnDef } from "@tanstack/react-table";
import { ActionsCell } from "./components/action-cell";
import { TCategory } from "./types";

export const columns: ColumnDef<TCategory>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    id: "actions",
    cell: ({ row }) => <ActionsCell id={row.original._id} />,
  },
];
