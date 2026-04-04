import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { TProduct } from "@/features/products/types";

export function LowStockAlerts({ products }: { products: TProduct[] }) {
  // Sort by quantity ascending and grab top 5
  const lowStock = [...products]
    .sort((a, b) => a.quantity - b.quantity)
    .slice(0, 5);

  return (
    <Card className="col-span-1 lg:col-span-1">
      <CardHeader>
        <CardTitle>Low Stock Alerts</CardTitle>
        <CardDescription>Products running low on inventory.</CardDescription>
      </CardHeader>
      <CardContent>
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
      </CardContent>
    </Card>
  );
}
