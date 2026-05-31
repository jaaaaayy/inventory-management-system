import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { TProduct } from "@/features/products/types";

const LOW_STOCK_THRESHOLD = 10;

export function LowStockAlerts({ products }: { products: TProduct[] }) {
  const lowStock = [...products]
    .filter((product) => Number(product.quantity) <= LOW_STOCK_THRESHOLD)
    .sort((a, b) => a.quantity - b.quantity)
    .slice(0, 5);

  return (
    <Card className="col-span-1 lg:col-span-1">
      <CardHeader>
        <CardTitle>Low Stock Alerts</CardTitle>
        <CardDescription>
          Products with {LOW_STOCK_THRESHOLD} or fewer items in stock.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {lowStock.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>SKU</TableHead>
                <TableHead className="text-right">Qty</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {lowStock.map((product) => (
                <TableRow key={product._id}>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.stockKeepingUnit}</TableCell>
                  <TableCell className="text-right">{product.quantity}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <p className="text-sm text-muted-foreground">
            No products are below the low-stock threshold.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
