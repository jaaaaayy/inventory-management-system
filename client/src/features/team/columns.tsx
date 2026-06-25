import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { MemberActions } from "./components/member-actions";
import { TMember } from "./types";

export const columns: ColumnDef<TMember>[] = [
  {
    id: "name",
    accessorFn: (row) => `${row.user?.lastName ?? ""} ${row.user?.firstName ?? ""}`,
    header: "Name",
    cell: ({ row }) => (
      <span>
        {row.original.user?.lastName} {row.original.user?.firstName}
      </span>
    ),
  },
  {
    id: "email",
    accessorFn: (row) => row.user?.email ?? "",
    header: "Email",
  },
  {
    id: "position",
    header: "Position",
    cell: ({ row }) => (
      <Badge variant="secondary">{row.original.position?.name ?? "—"}</Badge>
    ),
  },
  {
    id: "status",
    header: "Status",
    cell: ({ row }) => (
      <Badge variant={row.original.status === "Active" ? "default" : "outline"}>
        {row.original.status}
      </Badge>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => <MemberActions member={row.original} />,
  },
];
