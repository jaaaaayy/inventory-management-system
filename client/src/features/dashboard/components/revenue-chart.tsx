import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { cn, formatCurrency } from "@/lib/utils";
import { ChartColumn } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { TSalesOrder } from "@/features/sales-orders/types";

const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export function RevenueChart({
  salesOrders,
  className,
}: {
  salesOrders: TSalesOrder[];
  className?: string;
}) {
  const chartData = salesOrders.reduce(
    (acc: { date: string; label: string; revenue: number }[], order) => {
      if (order.status === "Cancelled") {
        return acc;
      }

      const orderDate = new Date(order.orderDate);
      const date = orderDate.toISOString().slice(0, 10);
      const existing = acc.find((item) => item.date === date);
      const amount = parseFloat(order.totalAmount || "0");

      if (existing) {
        existing.revenue += amount;
      } else {
        acc.push({
          date,
          label: orderDate.toLocaleDateString(undefined, {
            month: "short",
            day: "numeric",
          }),
          revenue: amount,
        });
      }

      return acc;
    },
    []
  );

  chartData.sort((a, b) => a.date.localeCompare(b.date));
  const displayData = chartData.slice(-7);

  return (
    <Card className={cn(className)}>
      <CardHeader>
        <CardTitle>Sales Revenue Over Time</CardTitle>
        <CardDescription>Daily revenue for the latest 7 sales days</CardDescription>
      </CardHeader>
      <CardContent>
        {displayData.length > 0 ? (
          <ChartContainer config={chartConfig} className="h-[300px] w-full">
            <BarChart accessibilityLayer data={displayData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="label"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
              />
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    indicator="dot"
                    formatter={(value) => (
                      <span className="font-mono font-medium tabular-nums">
                        {formatCurrency(Number(value))}
                      </span>
                    )}
                  />
                }
              />
              <Bar dataKey="revenue" fill="var(--color-revenue)" radius={6} />
            </BarChart>
          </ChartContainer>
        ) : (
          <Empty className="h-[300px]">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <ChartColumn />
              </EmptyMedia>
              <EmptyTitle>No sales revenue yet</EmptyTitle>
              <EmptyDescription>
                Revenue will appear here once orders come in.
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        )}
      </CardContent>
    </Card>
  );
}
