import { ColumnDef } from "@tanstack/react-table";
import { ActionsCell } from "./components/action-cell";
import { TCustomer } from "./types";

export const columns: ColumnDef<TCustomer>[] = [
  {
    id: "Name",
    header: "Name",
    cell: ({ row }) => (
      <span>
        {row.original.lastName} {row.original.firstName}
      </span>
    ),
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
