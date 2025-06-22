import { ColumnDef } from "@tanstack/react-table";
import { TProduct } from "./types";
import { ActionsCell } from "./components/action-cell";

export const columns: ColumnDef<TProduct>[] = [
  {
    header: "Image",
    cell: ({ row }) => {
      const image = row.original.imageUrl;
      const name = row.original.name;
      console.log(`http://localhost:3000/${image}`);

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
  },
  {
    accessorKey: "sellingPrice",
    header: "Selling Price",
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
