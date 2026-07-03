import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
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
import { ChartPie } from "lucide-react";
import { Label, Pie, PieChart } from "recharts";
import { TPurchaseOrder } from "@/features/purchase-orders/types";
import { cn } from "@/lib/utils";

const chartConfig = {
  orders: {
    label: "Orders",
  },
  pending: {
    label: "Pending",
    color: "var(--chart-2)",
  },
  received: {
    label: "Received",
    color: "var(--chart-3)",
  },
  cancelled: {
    label: "Cancelled",
    color: "var(--chart-5)",
  },
} satisfies ChartConfig;

const statusKeys = ["Pending", "Received", "Cancelled"] as const;

export function PurchaseStatusChart({
  purchaseOrders,
  className,
}: {
  purchaseOrders: TPurchaseOrder[];
  className?: string;
}) {
  const statusCounts = purchaseOrders.reduce<Record<string, number>>(
    (acc, order) => {
      const status = order.status || "Pending";
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    },
    {}
  );

  const chartData = statusKeys
    .map((status) => ({
      status,
      statusKey: status.toLowerCase(),
      orders: statusCounts[status] || 0,
      fill: `var(--color-${status.toLowerCase()})`,
    }))
    .filter((item) => item.orders > 0);

  const totalOrders = chartData.reduce((total, item) => total + item.orders, 0);

  return (
    <Card className={cn("flex flex-col", className)}>
      <CardHeader className="items-center pb-0">
        <CardTitle>Purchase Statuses</CardTitle>
        <CardDescription>Breakdown of purchase orders by status</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        {totalOrders > 0 ? (
          <ChartContainer
            config={chartConfig}
            className="mx-auto h-[300px] w-full"
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel nameKey="statusKey" />}
              />
              <Pie
                data={chartData}
                dataKey="orders"
                nameKey="statusKey"
                innerRadius={68}
                outerRadius={96}
                strokeWidth={5}
              >
                <Label
                  content={({ viewBox }) => {
                    if (!viewBox || !("cx" in viewBox) || !("cy" in viewBox)) {
                      return null;
                    }

                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalOrders.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground text-xs"
                        >
                          Orders
                        </tspan>
                      </text>
                    );
                  }}
                />
              </Pie>
              <ChartLegend
                content={<ChartLegendContent nameKey="statusKey" />}
                className="-translate-y-2 flex-wrap gap-2"
              />
            </PieChart>
          </ChartContainer>
        ) : (
          <Empty className="h-[300px]">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <ChartPie />
              </EmptyMedia>
              <EmptyTitle>No purchase orders yet</EmptyTitle>
              <EmptyDescription>
                Purchase statuses will appear here once orders are placed.
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        )}
      </CardContent>
    </Card>
  );
}
