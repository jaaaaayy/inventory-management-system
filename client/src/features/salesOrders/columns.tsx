import { ColumnDef } from "@tanstack/react-table";
import { TSalesOrder } from "./types";
// import { ActionsCell } from "./components/action-cell";

export const columns: ColumnDef<TSalesOrder>[] = [
  // {
  //   header: "Image",
  //   cell: ({ row }) => {
  //     const image = row.original.imageUrl;
  //     const name = row.original.name;
  //     console.log(`http://localhost:3000/${image}`);

  //     return (
  //       <img
  //         src={`http://localhost:3000/${image}`}
  //         alt={name}
  //         className="h-12 object-contain rounded-md"
  //       />
  //     );
  //   },
  // },
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
    // cell: ({ row }) => <ActionsCell id={row.original._id} />,
  },
];
