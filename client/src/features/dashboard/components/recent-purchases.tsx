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
import { TPurchaseOrder } from "@/features/purchase-orders/types";
import { formatCurrency } from "@/lib/utils";

export function RecentPurchaseOrders({
  purchaseOrders,
}: {
  purchaseOrders: TPurchaseOrder[];
}) {
  const recent = [...purchaseOrders]
    .sort(
      (a, b) =>
        new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime()
    )
    .slice(0, 5);

  return (
    <Card className="col-span-1 lg:col-span-2">
      <CardHeader>
        <CardTitle>Recent Purchase Orders</CardTitle>
        <CardDescription>
          The 5 most recent purchase orders added to the system.
        </CardDescription>
      </CardHeader>
      <CardContent>
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
                  <TableCell className="capitalize">{order.status}</TableCell>
                  <TableCell className="text-right">
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
      </CardContent>
    </Card>
  );
}
