import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const statusClassName: Record<string, string> = {
  Pending: "bg-amber-500/15 dark:bg-amber-500/10 text-amber-500",
  Shipped: "bg-blue-500/15 dark:bg-blue-500/10 text-blue-500",
  "Partially Received": "bg-blue-500/15 dark:bg-blue-500/10 text-blue-500",
  Delivered: "bg-emerald-500/15 dark:bg-emerald-500/10 text-emerald-500",
  Received: "bg-emerald-500/15 dark:bg-emerald-500/10 text-emerald-500",
  Cancelled: "bg-red-500/15 dark:bg-red-500/10 text-red-500",
};

const StatusBadge = ({ status }: { status: string }) => {
  return (
    <Badge
      variant="outline"
      className={cn(
        "border-transparent",
        statusClassName[status] ?? "bg-muted text-muted-foreground"
      )}
    >
      {status}
    </Badge>
  );
};

export default StatusBadge;
