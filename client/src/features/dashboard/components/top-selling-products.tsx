import { Link } from "react-router-dom";
import { TrendingUp } from "lucide-react";
import TableContainer from "@/components/table-container";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TSalesOrder } from "@/features/sales-orders/types";
import { getImageUrl } from "@/lib/images";
import { cn, formatCurrency } from "@/lib/utils";

type TopProduct = {
  id: string;
  name: string;
  imageUrl: string;
  qty: number;
  revenue: number;
};

const getTopProducts = (salesOrders: TSalesOrder[]): TopProduct[] => {
  const byProduct = new Map<string, TopProduct>();

  for (const order of salesOrders) {
    if (order.status === "Cancelled") continue;
    for (const item of order.items ?? []) {
      const product = item.product;
      if (!product || typeof product !== "object" || !product._id) continue;

      const entry = byProduct.get(product._id) ?? {
        id: product._id,
        name: product.name,
        imageUrl: product.imageUrl,
        qty: 0,
        revenue: 0,
      };
      entry.qty += Number(item.quantity) || 0;
      entry.revenue += Number(item.totalPrice) || 0;
      byProduct.set(product._id, entry);
    }
  }

  return [...byProduct.values()].sort((a, b) => b.qty - a.qty).slice(0, 5);
};

export function TopSellingProducts({
  salesOrders,
  className,
}: {
  salesOrders: TSalesOrder[];
  className?: string;
}) {
  const topProducts = getTopProducts(salesOrders);

  return (
    <Card className={cn(className)}>
      <CardHeader>
        <CardTitle>Top Selling Products</CardTitle>
        <CardDescription>
          Best sellers by quantity, excluding cancelled orders.
        </CardDescription>
        <CardAction>
          <Link
            to="/products"
            className="text-xs text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
          >
            View all
          </Link>
        </CardAction>
      </CardHeader>
      <CardContent>
        {topProducts.length > 0 ? (
          <TableContainer>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-10">#</TableHead>
                  <TableHead>Product</TableHead>
                  <TableHead className="text-right">Qty Sold</TableHead>
                  <TableHead className="text-right">Revenue</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topProducts.map((product, index) => (
                  <TableRow key={product.id}>
                    <TableCell className="text-muted-foreground">
                      {index + 1}
                    </TableCell>
                    <TableCell>
                      <Link
                        to={`/products/${product.id}`}
                        className="flex items-center gap-2 hover:underline"
                      >
                        <img
                          className="size-8 rounded object-cover"
                          src={getImageUrl(product.imageUrl)}
                          alt={product.name}
                        />
                        <span>{product.name}</span>
                      </Link>
                    </TableCell>
                    <TableCell className="text-right tabular-nums">
                      {product.qty}
                    </TableCell>
                    <TableCell className="text-right tabular-nums">
                      {formatCurrency(product.revenue)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Empty className="h-full min-h-48">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <TrendingUp />
              </EmptyMedia>
              <EmptyTitle>No sales yet</EmptyTitle>
              <EmptyDescription>
                Top sellers will appear here once orders come in.
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        )}
      </CardContent>
    </Card>
  );
}
