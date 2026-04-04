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
    <Card>
      <CardHeader>
        <CardTitle>{total.title}</CardTitle>
        <CardAction>{Icon && <Icon />}</CardAction>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{total.amount}</div>
      </CardContent>
    </Card>
  );
};

export default TotalCard;
