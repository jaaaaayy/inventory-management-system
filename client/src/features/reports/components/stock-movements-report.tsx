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
import { cn } from "@/lib/utils";
import { exportToCsv } from "@/lib/csv";
import { Download } from "lucide-react";
import { useState } from "react";
import { useFetchStockMovementsReport } from "../services/queries";
import { defaultFromDate, defaultToDate, TReportStockMovement } from "../types";
import DateRange from "./date-range";

const userName = (user: TReportStockMovement["user"]) =>
  user ? `${user.firstName} ${user.lastName}` : "—";

const StockMovementsReport = () => {
  const [from, setFrom] = useState(defaultFromDate());
  const [to, setTo] = useState(defaultToDate());

  const { isLoading, isPending, isError, error, data } =
    useFetchStockMovementsReport(from, to);

  const movements: TReportStockMovement[] = data?.movements ?? [];

  const handleExport = () => {
    exportToCsv(
      `stock-movements_${from}_to_${to}.csv`,
      [
        { header: "Date", value: (m: TReportStockMovement) => new Date(m.createdAt).toLocaleString() },
        { header: "Product", value: (m) => m.product?.name ?? "" },
        { header: "SKU", value: (m) => m.product?.stockKeepingUnit ?? "" },
        { header: "Type", value: (m) => m.type },
        { header: "Change", value: (m) => m.delta },
        { header: "Qty After", value: (m) => m.quantityAfter },
        { header: "Reason", value: (m) => m.reason },
        { header: "By", value: (m) => userName(m.user) },
      ],
      movements
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Stock Movements</CardTitle>
        <CardDescription>
          Every stock change across all products in the selected date range.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <DateRange
            idPrefix="movements"
            from={from}
            to={to}
            setFrom={setFrom}
            setTo={setTo}
          />
          <Button
            variant="outline"
            onClick={handleExport}
            disabled={movements.length === 0}
          >
            <Download />
            Export CSV
          </Button>
        </div>

        {isError && error ? (
          <Error message={error.message} />
        ) : isLoading || isPending ? (
          <Loading feature="stock movements" />
        ) : movements.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Type</TableHead>
                <TableHead className="text-right">Change</TableHead>
                <TableHead className="text-right">Qty After</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead>By</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {movements.map((movement) => (
                <TableRow key={movement._id}>
                  <TableCell>
                    {new Date(movement.createdAt).toLocaleString()}
                  </TableCell>
                  <TableCell>{movement.product?.name ?? "—"}</TableCell>
                  <TableCell>{movement.type}</TableCell>
                  <TableCell
                    className={cn(
                      "text-right tabular-nums",
                      movement.delta > 0
                        ? "text-emerald-500"
                        : movement.delta < 0
                        ? "text-red-500"
                        : ""
                    )}
                  >
                    {movement.delta > 0 ? `+${movement.delta}` : movement.delta}
                  </TableCell>
                  <TableCell className="text-right tabular-nums">
                    {movement.quantityAfter}
                  </TableCell>
                  <TableCell>{movement.reason || "—"}</TableCell>
                  <TableCell>{userName(movement.user)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <p className="text-sm text-muted-foreground">
            No stock movements in this date range.
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default StockMovementsReport;
