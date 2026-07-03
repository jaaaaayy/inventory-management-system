import { ColumnDef } from "@tanstack/react-table";
import { TProduct } from "./types";
import { ActionsCell } from "./components/action-cell";
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";
import { getImageUrl } from "@/lib/images";
import { formatCurrency } from "@/lib/utils";

export const columns: ColumnDef<TProduct>[] = [
  {
    id: "image",
    header: "Image",
    enableSorting: false,
    enableHiding: false,
    cell: ({ row }) => {
      const image = row.original.imageUrl;
      const name = row.original.name;

      return (
        <img
          src={getImageUrl(image)}
          alt={name}
          className="size-12 object-cover rounded"
        />
      );
    },
  },
  {
    accessorKey: "name",
    meta: { label: "Name" },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
  },
  {
    accessorKey: "stockKeepingUnit",
    meta: { label: "SKU" },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="SKU" />
    ),
  },
  {
    accessorKey: "costPrice",
    meta: { label: "Cost Price" },
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Cost Price"
        className="justify-end"
      />
    ),
    cell: ({ row }) => (
      <div className="text-right tabular-nums">
        {formatCurrency(parseFloat(row.getValue("costPrice")))}
      </div>
    ),
  },
  {
    accessorKey: "sellingPrice",
    meta: { label: "Selling Price" },
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Selling Price"
        className="justify-end"
      />
    ),
    cell: ({ row }) => (
      <div className="text-right tabular-nums">
        {formatCurrency(parseFloat(row.getValue("sellingPrice")))}
      </div>
    ),
  },
  {
    accessorKey: "unit",
    meta: { label: "Unit" },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Unit" />
    ),
  },
  {
    accessorKey: "quantity",
    meta: { label: "Quantity" },
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Quantity"
        className="justify-end"
      />
    ),
    cell: ({ row }) => (
      <div className="text-right tabular-nums">{row.original.quantity}</div>
    ),
  },
  {
    id: "actions",
    enableSorting: false,
    enableHiding: false,
    cell: ({ row }) => (
      <ActionsCell
        id={row.original._id}
        name={row.original.name}
        quantity={row.original.quantity}
      />
    ),
  },
];
