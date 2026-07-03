import TableContainer from "@/components/table-container";
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
import { exportToCsv } from "@/lib/csv";
import { Download, PackageCheck } from "lucide-react";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

const LowStockReport = () => {
  const { isLoading, isPending, isError, error, data } = useFetchProductList();

  const products: TProduct[] = data?.products ?? [];
  const lowStock = products
    .filter((product) => Number(product.quantity) <= Number(product.reorderPoint))
    .sort((a, b) => a.quantity - b.quantity);

  const handleExport = () => {
    exportToCsv(
      "low-stock-report.csv",
      [
        { header: "Name", value: (p: TProduct) => p.name },
        { header: "SKU", value: (p) => p.stockKeepingUnit },
        { header: "Quantity", value: (p) => p.quantity },
        { header: "Reorder Point", value: (p) => p.reorderPoint },
      ],
      lowStock
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Low Stock</CardTitle>
        <CardDescription>
          Products at or below their reorder point.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            {lowStock.length} product{lowStock.length === 1 ? "" : "s"} need
            restocking
          </p>
          <Button
            variant="outline"
            onClick={handleExport}
            disabled={lowStock.length === 0}
          >
            <Download />
            Export CSV
          </Button>
        </div>

        {isError && error ? (
          <Error message={error.message} />
        ) : isLoading || isPending ? (
          <Loading feature="low stock report" />
        ) : lowStock.length > 0 ? (
          <TableContainer>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>SKU</TableHead>
                <TableHead className="text-right">Quantity</TableHead>
                <TableHead className="text-right">Reorder Point</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {lowStock.map((product) => (
                <TableRow key={product._id}>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.stockKeepingUnit}</TableCell>
                  <TableCell className="text-right">
                    {product.quantity}
                  </TableCell>
                  <TableCell className="text-right">
                    {product.reorderPoint}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          </TableContainer>
        ) : (
          <Empty className="rounded-md border">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <PackageCheck />
              </EmptyMedia>
              <EmptyTitle>Stock levels look healthy</EmptyTitle>
              <EmptyDescription>
                No products are at or below their reorder point.
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        )}
      </CardContent>
    </Card>
  );
};

export default LowStockReport;
