import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { MemberActions } from "./components/member-actions";
import { TMember } from "./types";
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";

export const columns: ColumnDef<TMember>[] = [
  {
    id: "name",
    accessorFn: (row) =>
      `${row.user?.lastName ?? ""} ${row.user?.firstName ?? ""}`,
    meta: { label: "Name" },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => (
      <span>
        {row.original.user?.lastName} {row.original.user?.firstName}
      </span>
    ),
  },
  {
    id: "email",
    accessorFn: (row) => row.user?.email ?? "",
    meta: { label: "Email" },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
  },
  {
    id: "position",
    accessorFn: (row) => row.position?.name ?? "",
    meta: { label: "Position" },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Position" />
    ),
    cell: ({ row }) => (
      <Badge variant="secondary">{row.original.position?.name ?? "—"}</Badge>
    ),
  },
  {
    id: "status",
    accessorFn: (row) => row.status,
    meta: { label: "Status" },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => (
      <Badge
        variant={row.original.status === "Active" ? "default" : "outline"}
      >
        {row.original.status}
      </Badge>
    ),
  },
  {
    id: "actions",
    enableSorting: false,
    enableHiding: false,
    cell: ({ row }) => <MemberActions member={row.original} />,
  },
];
