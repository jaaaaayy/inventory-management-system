import { Badge } from "@/components/ui/badge";

const statusClassName: Record<string, string> = {
  Pending: "bg-amber-500/15 dark:bg-amber-500/10 text-amber-500",
  Received: "bg-emerald-500/15 dark:bg-emerald-500/10 text-emerald-500",
  Cancelled: "bg-red-500/15 dark:bg-red-500/10 text-red-500",
};

const PurchaseOrderStatusBadge = ({ status }: { status: string }) => {
  return (
    <Badge
      variant="outline"
      className={`border-transparent ${
        statusClassName[status] ?? "bg-muted text-muted-foreground"
      }`}
    >
      {status}
    </Badge>
  );
};

export default PurchaseOrderStatusBadge;
