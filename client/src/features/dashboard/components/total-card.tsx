import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface TotalCardProps {
  total: {
    title: string;
    amount: string | number;
    icon?: LucideIcon;
  };
}

const TotalCard = ({ total }: TotalCardProps) => {
  const Icon = total.icon;

  return (
    <Card className="min-w-0">
      <CardHeader>
        <CardTitle className="min-w-0 truncate">{total.title}</CardTitle>
        <CardAction className="shrink-0">{Icon && <Icon />}</CardAction>
      </CardHeader>
      <CardContent>
        <div className="min-w-0 truncate text-xl font-bold tabular-nums sm:text-2xl">
          {total.amount}
        </div>
      </CardContent>
    </Card>
  );
};

export default TotalCard;
