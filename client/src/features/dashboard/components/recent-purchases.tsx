import TableContainer from "@/components/table-container";
import { Link } from "react-router-dom";
import StatusBadge from "@/components/status-badge";
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
import { TPurchaseOrder } from "@/features/purchase-orders/types";
import { cn, formatCurrency } from "@/lib/utils";

export function RecentPurchaseOrders({
  purchaseOrders,
  className,
}: {
  purchaseOrders: TPurchaseOrder[];
  className?: string;
}) {
  const recent = [...purchaseOrders]
    .sort(
      (a, b) =>
        new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime()
    )
    .slice(0, 5);

  return (
    <Card className={cn(className)}>
      <CardHeader>
        <CardTitle>Recent Purchase Orders</CardTitle>
        <CardDescription>
          The 5 most recent purchase orders added to the system.
        </CardDescription>
        <CardAction>
          <Link
            to="/purchase/orders"
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
                <TableHead>Vendor</TableHead>
                <TableHead>Expected</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recent.length > 0 ? (
                recent.map((order) => (
                  <TableRow key={order._id}>
                    <TableCell>
                      {typeof order.vendor === "string"
                        ? order.vendor
                        : order.vendor?.name}
                    </TableCell>
                    <TableCell>
                      {new Date(order.expectedDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={order.status} />
                    </TableCell>
                    <TableCell className="text-right tabular-nums">
                      {formatCurrency(Number(order.totalAmount))}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    className="h-24 text-center text-muted-foreground"
                  >
                    No purchase orders yet.
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
