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
import { Label, Pie, PieChart } from "recharts";
import { TPurchaseOrder } from "@/features/purchase-orders/types";

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
}: {
  purchaseOrders: TPurchaseOrder[];
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
    <Card className="flex flex-col col-span-1">
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
          <div className="flex h-[300px] items-center justify-center text-sm text-muted-foreground">
            No purchase orders yet.
          </div>
        )}
      </CardContent>
    </Card>
  );
}
