import TableContainer from "@/components/table-container";
import { Link } from "react-router-dom";
import {
  Card,
  CardAction,
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
import { TProduct } from "@/features/products/types";
import { cn } from "@/lib/utils";

export function LowStockAlerts({
  products,
  className,
}: {
  products: TProduct[];
  className?: string;
}) {
  const lowStock = [...products]
    .filter(
      (product) => Number(product.quantity) <= Number(product.reorderPoint)
    )
    .sort((a, b) => a.quantity - b.quantity)
    .slice(0, 5);

  return (
    <Card className={cn(className)}>
      <CardHeader>
        <CardTitle>Low Stock Alerts</CardTitle>
        <CardDescription>
          Products at or below their reorder point.
        </CardDescription>
        <CardAction>
          <Link
            to="/reports"
            className="text-xs text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
          >
            View all
          </Link>
        </CardAction>
      </CardHeader>
      <CardContent>
        <TableContainer>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>SKU</TableHead>
                <TableHead className="text-right">Qty</TableHead>
                <TableHead className="text-right">Reorder Point</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {lowStock.length > 0 ? (
                lowStock.map((product) => (
                  <TableRow key={product._id}>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{product.stockKeepingUnit}</TableCell>
                    <TableCell className="text-right tabular-nums">
                      {product.quantity}
                    </TableCell>
                    <TableCell className="text-right tabular-nums">
                      {product.reorderPoint}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    className="h-24 text-center text-muted-foreground"
                  >
                    No products are at or below their reorder point.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
}
