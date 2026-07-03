import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { TSalesOrder } from "@/features/sales-orders/types";
import { TPurchaseOrder } from "@/features/purchase-orders/types";
import { TProduct } from "@/features/products/types";

const ActivityTile = ({
  label,
  count,
  to,
}: {
  label: string;
  count: number;
  to: string;
}) => (
  <Link
    to={to}
    className="flex items-center justify-between gap-3 p-4 transition-colors hover:bg-muted/50 lg:border-l lg:first:border-l-0"
  >
    <div className="space-y-1">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="text-2xl font-semibold tabular-nums">{count}</p>
    </div>
    <ChevronRight className="size-4 shrink-0 text-muted-foreground" />
  </Link>
);

export function ActivityStrip({
  salesOrders,
  purchaseOrders,
  products,
}: {
  salesOrders: TSalesOrder[];
  purchaseOrders: TPurchaseOrder[];
  products: TProduct[];
}) {
  const toShip = salesOrders.filter(
    (order) => order.status === "Pending"
  ).length;
  const toDeliver = salesOrders.filter(
    (order) => order.status === "Shipped"
  ).length;
  const toReceive = purchaseOrders.filter(
    (order) =>
      order.status === "Pending" || order.status === "Partially Received"
  ).length;
  const lowStock = products.filter(
    (product) => Number(product.quantity) <= Number(product.reorderPoint)
  ).length;

  return (
    <Card size="sm" className="py-0">
      <CardContent className="grid grid-cols-2 px-0 lg:grid-cols-4">
        <ActivityTile label="To Ship" count={toShip} to="/sales/orders" />
        <ActivityTile label="To Deliver" count={toDeliver} to="/sales/orders" />
        <ActivityTile
          label="To Receive"
          count={toReceive}
          to="/purchase/orders"
        />
        <ActivityTile label="Low Stock Items" count={lowStock} to="/reports" />
      </CardContent>
    </Card>
  );
}
