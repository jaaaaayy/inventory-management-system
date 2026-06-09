import { ColumnDef } from "@tanstack/react-table";
import { TPurchaseItem, TPurchaseOrder } from "./types";
import { ActionsCell } from "./components/action-cell";
import PurchaseOrderStatusBadge from "./components/status-badge";

export const columns: ColumnDef<TPurchaseOrder>[] = [
  {
    accessorKey: "orderNumber",
    header: "Order #",
  },
  {
    accessorKey: "vendor",
    header: "Vendor",
  },
  {
    accessorKey: "orderDate",
    header: "Order Date",
    cell: ({ getValue }) => (
      <p>{new Date(getValue<string>()).toLocaleDateString()}</p>
    ),
  },
  {
    accessorKey: "expectedDate",
    header: "Expected Date",
    cell: ({ getValue }) => (
      <p>{new Date(getValue<string>()).toLocaleDateString()}</p>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <PurchaseOrderStatusBadge status={row.getValue<string>("status")} />
    ),
  },
  {
    accessorKey: "items",
    header: "Items",
    cell: ({ row }) => {
      const items = row.getValue<TPurchaseItem[]>("items");
      return items.length;
    },
  },
  {
    accessorKey: "totalAmount",
    header: "Total Amount",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("totalAmount"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "PHP",
      }).format(amount);

      return <p>{formatted}</p>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <ActionsCell id={row.original._id} status={row.original.status} />
    ),
  },
];
