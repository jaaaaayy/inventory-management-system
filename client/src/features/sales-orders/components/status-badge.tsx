import { Badge } from "@/components/ui/badge";

const statusVariant: Record<
  string,
  "default" | "secondary" | "destructive" | "outline"
> = {
  Pending: "outline",
  Shipped: "secondary",
  Delivered: "default",
  Cancelled: "destructive",
};

const SalesOrderStatusBadge = ({ status }: { status: string }) => {
  return <Badge variant={statusVariant[status] ?? "outline"}>{status}</Badge>;
};

export default SalesOrderStatusBadge;
