import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { TProduct } from "@/features/products/types";

export function LowStockAlerts({ products }: { products: TProduct[] }) {
  const lowStock = [...products]
    .filter((product) => Number(product.quantity) <= Number(product.reorderPoint))
    .sort((a, b) => a.quantity - b.quantity)
    .slice(0, 5);

  return (
    <Card className="col-span-1 lg:col-span-1">
      <CardHeader>
        <CardTitle>Low Stock Alerts</CardTitle>
        <CardDescription>
          Products at or below their reorder point.
        </CardDescription>
      </CardHeader>
      <CardContent>
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
                  <TableCell className="text-right">
                    {product.quantity}
                  </TableCell>
                  <TableCell className="text-right">
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
      </CardContent>
    </Card>
  );
}
