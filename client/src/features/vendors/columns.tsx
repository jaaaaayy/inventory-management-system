import { ColumnDef } from "@tanstack/react-table";
import { ActionsCell } from "./components/action-cell";
import { TVendor } from "./types";

export const columns: ColumnDef<TVendor>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "mobileNumber",
    header: "Mobile Number",
  },
  {
    id: "actions",
    cell: ({ row }) => <ActionsCell id={row.original._id} />,
  },
];
