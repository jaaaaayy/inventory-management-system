import { ColumnDef } from "@tanstack/react-table";
import { TSalesItem, TSalesOrder } from "./types";
import { ActionsCell } from "./components/action-cell";
import SalesOrderStatusBadge from "./components/status-badge";
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";
import { formatCurrency } from "@/lib/utils";

export const columns: ColumnDef<TSalesOrder>[] = [
  {
    accessorKey: "orderNumber",
    meta: { label: "Order #" },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Order #" />
    ),
  },
  {
    accessorKey: "customer",
    meta: { label: "Customer" },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Customer" />
    ),
  },
  {
    accessorKey: "orderDate",
    meta: { label: "Order Date" },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Order Date" />
    ),
    cell: ({ getValue }) => (
      <p>{new Date(getValue<string>()).toLocaleDateString()}</p>
    ),
  },
  {
    accessorKey: "deliveryDate",
    meta: { label: "Delivery Date" },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Delivery Date" />
    ),
    cell: ({ getValue }) => (
      <p>{new Date(getValue<string>()).toLocaleDateString()}</p>
    ),
  },
  {
    accessorKey: "status",
    meta: { label: "Status" },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => (
      <SalesOrderStatusBadge status={row.getValue<string>("status")} />
    ),
  },
  {
    accessorKey: "items",
    meta: { label: "Items" },
    enableSorting: false,
    header: "Items",
    cell: ({ row }) => {
      const items = row.getValue<TSalesItem[]>("items");
      return items.length;
    },
  },
  {
    accessorKey: "totalAmount",
    meta: { label: "Total Amount" },
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Total Amount"
        className="justify-end"
      />
    ),
    cell: ({ row }) => (
      <div className="text-right tabular-nums">
        {formatCurrency(parseFloat(row.getValue("totalAmount")))}
      </div>
    ),
  },
  {
    id: "actions",
    enableSorting: false,
    enableHiding: false,
    cell: ({ row }) => (
      <ActionsCell id={row.original._id} status={row.original.status} />
    ),
  },
];
