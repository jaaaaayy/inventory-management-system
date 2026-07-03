import { ColumnDef } from "@tanstack/react-table";
import { ActionsCell } from "./components/action-cell";
import { TCategory } from "./types";
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";

export const columns: ColumnDef<TCategory>[] = [
  {
    accessorKey: "name",
    meta: { label: "Name" },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
  },
  {
    accessorKey: "description",
    meta: { label: "Description" },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Description" />
    ),
  },
  {
    id: "actions",
    enableSorting: false,
    enableHiding: false,
    cell: ({ row }) => <ActionsCell id={row.original._id} />,
  },
];
