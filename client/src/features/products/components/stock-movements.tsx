import TableContainer from "@/components/table-container";
import Error from "@/components/error";
import Loading from "@/components/loading";
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
import { cn } from "@/lib/utils";
import { HistoryIcon } from "lucide-react";
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
      <h2 className="text-lg font-semibold tracking-tight">Stock History</h2>
      {movements.length > 0 ? (
        <TableContainer>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
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
                  <TableCell>
                    {movement.user
                      ? `${movement.user.firstName} ${movement.user.lastName}`
                      : "—"}
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
              <HistoryIcon />
            </EmptyMedia>
            <EmptyTitle>No stock movements yet</EmptyTitle>
            <EmptyDescription>
              Adjustments and order activity for this product will appear here.
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      )}
    </div>
  );
};

export default StockMovements;
