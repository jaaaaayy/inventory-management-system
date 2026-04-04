import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";
import { Bar, BarChart, XAxis } from "recharts";
import { TSalesOrder } from "@/features/sales-orders/types";

const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export function RevenueChart({ salesOrders }: { salesOrders: TSalesOrder[] }) {
  // Aggregate sales orders by date loosely
  const chartData = salesOrders.reduce((acc: { date: string; revenue: number }[], order) => {
    const date = new Date(order.orderDate).toLocaleDateString();
    const existing = acc.find((d) => d.date === date);
    const amount = parseFloat(order.totalAmount || "0");
    if (existing) {
      existing.revenue += amount;
    } else {
      acc.push({ date, revenue: amount });
    }
    return acc;
  }, []);

  chartData.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  const displayData = chartData.slice(-7);

  return (
    <Card className="col-span-1 lg:col-span-2">
      <CardHeader>
        <CardTitle>Sales Revenue Over Time</CardTitle>
        <CardDescription>Daily revenue from completed orders</CardDescription>
      </CardHeader>
      <CardContent className="h-[300px]">
        <ChartContainer config={chartConfig} className="h-full w-full">
          <BarChart accessibilityLayer data={displayData}>
            <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={8} />
            <ChartTooltip content={<ChartTooltipContent indicator="dashed" />} />
            <Bar dataKey="revenue" fill="var(--color-revenue)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
