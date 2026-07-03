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
import { useFetchSalesOrderList } from "@/features/sales-orders/services/queries";
import { TSalesOrder } from "@/features/sales-orders/types";
import { formatCurrency } from "@/lib/utils";
import { exportToCsv } from "@/lib/csv";
import { Download, ShoppingCart } from "lucide-react";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { useState } from "react";
import { defaultFromDate, defaultToDate } from "../types";
import DateRange from "./date-range";

const getCustomerName = (customer: TSalesOrder["customer"]) =>
  typeof customer === "string"
    ? customer
    : `${customer.firstName} ${customer.lastName}`;

const SalesReport = () => {
  const [from, setFrom] = useState(defaultFromDate());
  const [to, setTo] = useState(defaultToDate());

  const { isLoading, isPending, isError, error, data } =
    useFetchSalesOrderList();

  const orders: TSalesOrder[] = data?.salesOrders ?? [];
  const filtered = orders.filter((order) => {
    if (order.status === "Cancelled") {
      return false;
    }
    const orderDate = new Date(order.orderDate).toISOString().slice(0, 10);
    return orderDate >= from && orderDate <= to;
  });

  const totalRevenue = filtered.reduce(
    (acc, order) => acc + parseFloat(order.totalAmount || "0"),
    0
  );

  const handleExport = () => {
    exportToCsv(
      `sales-report_${from}_to_${to}.csv`,
      [
        { header: "Order Date", value: (o) => new Date(o.orderDate).toLocaleDateString() },
        { header: "Customer", value: (o) => getCustomerName(o.customer) },
        { header: "Status", value: (o) => o.status },
        { header: "Items", value: (o) => o.items.length },
        { header: "Total", value: (o) => parseFloat(o.totalAmount || "0").toFixed(2) },
      ],
      filtered
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sales Summary</CardTitle>
        <CardDescription>
          Revenue and orders for the selected date range (excludes cancelled
          orders).
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <DateRange
            idPrefix="sales"
            from={from}
            to={to}
            setFrom={setFrom}
            setTo={setTo}
          />
          <Button
            variant="outline"
            onClick={handleExport}
            disabled={filtered.length === 0}
          >
            <Download />
            Export CSV
          </Button>
        </div>

        {isError && error ? (
          <Error message={error.message} />
        ) : isLoading || isPending ? (
          <Loading feature="sales report" />
        ) : (
          <>
            <div className="flex flex-wrap gap-6 text-sm">
              <div>
                <p className="text-muted-foreground">Total Revenue</p>
                <p className="text-xl font-semibold">
                  {formatCurrency(totalRevenue)}
                </p>
              </div>
              <div>
                <p className="text-muted-foreground">Orders</p>
                <p className="text-xl font-semibold">{filtered.length}</p>
              </div>
            </div>

            {filtered.length > 0 ? (
              <TableContainer>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order Date</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Items</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((order) => (
                    <TableRow key={order._id}>
                      <TableCell>
                        {new Date(order.orderDate).toLocaleDateString()}
                      </TableCell>
                      <TableCell>{getCustomerName(order.customer)}</TableCell>
                      <TableCell>{order.status}</TableCell>
                      <TableCell className="text-right">
                        {order.items.length}
                      </TableCell>
                      <TableCell className="text-right">
                        {formatCurrency(parseFloat(order.totalAmount || "0"))}
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
                    <ShoppingCart />
                  </EmptyMedia>
                  <EmptyTitle>No sales in this date range</EmptyTitle>
                  <EmptyDescription>
                    Try widening the date range to see more orders.
                  </EmptyDescription>
                </EmptyHeader>
              </Empty>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default SalesReport;
