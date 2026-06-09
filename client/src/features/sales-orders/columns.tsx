import { ColumnDef } from "@tanstack/react-table";
import { TSalesItem, TSalesOrder } from "./types";
import { ActionsCell } from "./components/action-cell";
import SalesOrderStatusBadge from "./components/status-badge";

export const columns: ColumnDef<TSalesOrder>[] = [
  {
    accessorKey: "orderNumber",
    header: "Order #",
  },
  {
    accessorKey: "customer",
    header: "Customer",
  },
  {
    accessorKey: "orderDate",
    header: "Order Date",
    cell: ({ getValue }) => (
      <p>{new Date(getValue<string>()).toLocaleDateString()}</p>
    ),
  },
  {
    accessorKey: "deliveryDate",
    header: "Delivery Date",
    cell: ({ getValue }) => (
      <p>{new Date(getValue<string>()).toLocaleDateString()}</p>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <SalesOrderStatusBadge status={row.getValue<string>("status")} />
    ),
  },
  {
    accessorKey: "items",
    header: "Items",
    cell: ({ row }) => {
      const items = row.getValue<TSalesItem[]>("items");
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
