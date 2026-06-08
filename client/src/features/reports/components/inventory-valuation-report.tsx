import Error from "@/components/error";
import Loading from "@/components/loading";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useFetchProductList } from "@/features/products/services/queries";
import { TProduct } from "@/features/products/types";
import { formatCurrency } from "@/lib/utils";
import { exportToCsv } from "@/lib/csv";
import { Download } from "lucide-react";

const InventoryValuationReport = () => {
  const { isLoading, isPending, isError, error, data } = useFetchProductList();

  const products: TProduct[] = data?.products ?? [];
  const rows = products.map((product) => ({
    product,
    value: Number(product.costPrice) * Number(product.quantity),
  }));
  const totalValue = rows.reduce((acc, row) => acc + row.value, 0);

  const handleExport = () => {
    exportToCsv(
      "inventory-valuation.csv",
      [
        { header: "Name", value: (r: (typeof rows)[number]) => r.product.name },
        { header: "SKU", value: (r) => r.product.stockKeepingUnit },
        { header: "Quantity", value: (r) => r.product.quantity },
        { header: "Cost Price", value: (r) => Number(r.product.costPrice).toFixed(2) },
        { header: "Value", value: (r) => r.value.toFixed(2) },
      ],
      rows
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Inventory Valuation</CardTitle>
        <CardDescription>
          Current stock value (cost price × quantity) per product.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="text-sm">
            <p className="text-muted-foreground">Total Inventory Value</p>
            <p className="text-xl font-semibold">{formatCurrency(totalValue)}</p>
          </div>
          <Button
            variant="outline"
            onClick={handleExport}
            disabled={rows.length === 0}
          >
            <Download />
            Export CSV
          </Button>
        </div>

        {isError && error ? (
          <Error message={error.message} />
        ) : isLoading || isPending ? (
          <Loading feature="inventory valuation" />
        ) : rows.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>SKU</TableHead>
                <TableHead className="text-right">Quantity</TableHead>
                <TableHead className="text-right">Cost Price</TableHead>
                <TableHead className="text-right">Value</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.product._id}>
                  <TableCell>{row.product.name}</TableCell>
                  <TableCell>{row.product.stockKeepingUnit}</TableCell>
                  <TableCell className="text-right">
                    {row.product.quantity}
                  </TableCell>
                  <TableCell className="text-right">
                    {formatCurrency(Number(row.product.costPrice))}
                  </TableCell>
                  <TableCell className="text-right">
                    {formatCurrency(row.value)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <p className="text-sm text-muted-foreground">No products yet.</p>
        )}
      </CardContent>
    </Card>
  );
};

export default InventoryValuationReport;
