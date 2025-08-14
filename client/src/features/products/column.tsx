import { ColumnDef } from "@tanstack/react-table";
import { TProduct } from "./types";
import { ActionsCell } from "./components/action-cell";

export const columns: ColumnDef<TProduct>[] = [
  {
    header: "Image",
    cell: ({ row }) => {
      const image = row.original.imageUrl;
      const name = row.original.name;

      return (
        <img
          src={`http://localhost:3000/${image}`}
          alt={name}
          className="h-12 object-contain rounded-md"
        />
      );
    },
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "stockKeepingUnit",
    header: "Stock Keeping Unit",
  },
  {
    accessorKey: "costPrice",
    header: "Cost Price",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("costPrice"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "PHP",
      }).format(amount);

      return <p>{formatted}</p>;
    },
  },
  {
    accessorKey: "sellingPrice",
    header: "Selling Price",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("sellingPrice"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "PHP",
      }).format(amount);

      return <p>{formatted}</p>;
    },
  },
  {
    accessorKey: "unit",
    header: "Unit",
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
  },
  {
    id: "actions",
    cell: ({ row }) => <ActionsCell id={row.original._id} />,
  },
];
