import { ColumnDef } from "@tanstack/react-table";
import { TSalesItem, TSalesOrder } from "./types";
import { ActionsCell } from "./components/action-cell";

export const columns: ColumnDef<TSalesOrder>[] = [
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
  },
  {
    accessorKey: "salesItems",
    header: "Items",
    cell: ({ row }) => row.getValue<TSalesItem[]>("salesItems").length,
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
    cell: ({ row }) => <ActionsCell id={row.original._id} />,
  },
];
