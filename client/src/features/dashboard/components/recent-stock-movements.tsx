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
import { useFetchStockMovementsReport } from "@/features/reports/services/queries";
import { TReportStockMovement } from "@/features/reports/types";
import { cn } from "@/lib/utils";

export function RecentStockMovements() {
  const { isLoading, isPending, isError, error, data } =
    useFetchStockMovementsReport();

  const movements: TReportStockMovement[] = (data?.movements ?? []).slice(0, 8);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Stock Movements</CardTitle>
        <CardDescription>
          Latest stock changes across all products.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isError && error ? (
          <p className="text-sm text-muted-foreground">
            Could not load stock movements.
          </p>
        ) : isLoading || isPending ? (
          <p className="text-sm text-muted-foreground">Loading...</p>
        ) : movements.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Type</TableHead>
                <TableHead className="text-right">Change</TableHead>
                <TableHead className="text-right">Qty After</TableHead>
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
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <p className="text-sm text-muted-foreground">
            No stock movements yet.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
