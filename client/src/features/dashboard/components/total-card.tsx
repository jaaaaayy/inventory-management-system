import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface TotalCardProps {
  total: {
    title: string;
    amount: string | number;
    icon?: LucideIcon;
    subtext?: string;
  };
}

const TotalCard = ({ total }: TotalCardProps) => {
  const Icon = total.icon;

  return (
    <Card className="min-w-0">
      <CardHeader>
        <CardTitle className="min-w-0 truncate text-sm font-medium text-muted-foreground">
          {total.title}
        </CardTitle>
        <CardAction className="shrink-0">
          {Icon && (
            <div className="flex size-8 items-center justify-center rounded-md bg-muted text-muted-foreground">
              <Icon className="size-4" />
            </div>
          )}
        </CardAction>
      </CardHeader>
      <CardContent className="space-y-1">
        <div className="min-w-0 truncate text-xl font-semibold tabular-nums sm:text-2xl">
          {total.amount}
        </div>
        {total.subtext && (
          <p className="min-w-0 truncate text-xs text-muted-foreground">
            {total.subtext}
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default TotalCard;
