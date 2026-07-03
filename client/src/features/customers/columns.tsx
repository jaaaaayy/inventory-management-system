import { ColumnDef } from "@tanstack/react-table";
import { ActionsCell } from "./components/action-cell";
import { TCustomer } from "./types";
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";

export const columns: ColumnDef<TCustomer>[] = [
  {
    id: "name",
    accessorFn: (row) => `${row.lastName} ${row.firstName}`,
    meta: { label: "Name" },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => (
      <span>
        {row.original.lastName} {row.original.firstName}
      </span>
    ),
  },
  {
    accessorKey: "email",
    meta: { label: "Email" },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
  },
  {
    accessorKey: "mobileNumber",
    meta: { label: "Mobile Number" },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Mobile Number" />
    ),
  },
  {
    id: "actions",
    enableSorting: false,
    enableHiding: false,
    cell: ({ row }) => <ActionsCell id={row.original._id} />,
  },
];
