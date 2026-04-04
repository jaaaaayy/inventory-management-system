import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";
import { Pie, PieChart, LabelList } from "recharts";
import { TSalesOrder } from "@/features/sales-orders/types";

export function StatusChart({ salesOrders }: { salesOrders: TSalesOrder[] }) {
  const statusCounts = salesOrders.reduce((acc: Record<string, number>, order) => {
    const status = order.status || "Pending";
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.keys(statusCounts).map((key) => {
    return {
      status: key,
      orders: statusCounts[key],
      fill: `var(--color-${key.toLowerCase().replace(/\s/g, "")})`,
    };
  });

  const chartConfig = {
    orders: { label: "Orders" },
  } satisfies ChartConfig as ChartConfig;

  // Dynamically assign Shadcn chart native variables in config
  chartData.forEach((item, index) => {
    chartConfig[item.status.toLowerCase().replace(/\s/g, "")] = {
      label: item.status,
      color: `var(--chart-${(index % 5) + 1})`,
    };
  });

  return (
    <Card className="flex flex-col col-span-1">
      <CardHeader className="items-center pb-0">
        <CardTitle>Order Statuses</CardTitle>
        <CardDescription>Breakdown of all active orders</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[250px]">
          <PieChart>
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Pie data={chartData} dataKey="orders" nameKey="status" innerRadius={60} strokeWidth={5}>
              <LabelList dataKey="status" position="inside" fill="white" fontSize={12} className="opacity-0 lg:opacity-100" />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
