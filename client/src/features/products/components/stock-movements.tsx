import Error from "@/components/error";
import Loading from "@/components/loading";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { useFetchStockMovements } from "../services/queries";
import { TStockMovement } from "../types";

const StockMovements = ({ productId }: { productId: string }) => {
  const { isLoading, isPending, isError, error, data } =
    useFetchStockMovements(productId);

  if (isError && error) {
    return <Error message={error.message} />;
  }

  if (isLoading || isPending) {
    return <Loading feature="stock history" />;
  }

  const movements: TStockMovement[] = data.movements;

  return (
    <div className="space-y-3">
      <h2 className="text-lg font-semibold">Stock History</h2>
      {movements.length > 0 ? (
        <Table className="border">
          <TableHeader>
            <TableRow>
              <TableHead className="border">Date</TableHead>
              <TableHead className="border">Type</TableHead>
              <TableHead className="border text-right">Change</TableHead>
              <TableHead className="border text-right">Qty After</TableHead>
              <TableHead className="border">Reason</TableHead>
              <TableHead className="border">By</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {movements.map((movement) => (
              <TableRow key={movement._id}>
                <TableCell className="border">
                  {new Date(movement.createdAt).toLocaleString()}
                </TableCell>
                <TableCell className="border">{movement.type}</TableCell>
                <TableCell
                  className={cn(
                    "border text-right tabular-nums",
                    movement.delta > 0
                      ? "text-emerald-500"
                      : movement.delta < 0
                      ? "text-red-500"
                      : ""
                  )}
                >
                  {movement.delta > 0 ? `+${movement.delta}` : movement.delta}
                </TableCell>
                <TableCell className="border text-right tabular-nums">
                  {movement.quantityAfter}
                </TableCell>
                <TableCell className="border">
                  {movement.reason || "—"}
                </TableCell>
                <TableCell className="border">
                  {movement.user
                    ? `${movement.user.firstName} ${movement.user.lastName}`
                    : "—"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <p className="text-sm text-muted-foreground">No stock movements yet.</p>
      )}
    </div>
  );
};

export default StockMovements;
