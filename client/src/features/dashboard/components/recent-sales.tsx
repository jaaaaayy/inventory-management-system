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
import { TSalesOrder } from "@/features/sales-orders/types";
import { cn, formatCurrency } from "@/lib/utils";

export function RecentSalesOrders({
  salesOrders,
  className,
}: {
  salesOrders: TSalesOrder[];
  className?: string;
}) {
  const recent = [...salesOrders]
    .sort(
      (a, b) =>
        new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime()
    )
    .slice(0, 5);

  return (
    <Card className={cn(className)}>
      <CardHeader>
        <CardTitle>Recent Sales Orders</CardTitle>
        <CardDescription>
          The 5 most recent sales orders added to the system.
        </CardDescription>
        <CardAction>
          <Link
            to="/sales/orders"
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
                <TableHead>Customer</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recent.length > 0 ? (
                recent.map((order) => (
                  <TableRow key={order._id}>
                    <TableCell>
                      {typeof order.customer === "string"
                        ? order.customer
                        : `${order.customer?.firstName || ""} ${
                            order.customer?.lastName || ""
                          }`}
                    </TableCell>
                    <TableCell>
                      {new Date(order.orderDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={order.status} />
                    </TableCell>
                    <TableCell className="text-right tabular-nums">
                      {formatCurrency(parseFloat(order.totalAmount))}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    className="h-24 text-center text-muted-foreground"
                  >
                    No sales orders yet.
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
