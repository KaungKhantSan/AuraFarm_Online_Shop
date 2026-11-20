import type { ProductImage } from "@/types/product";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface productChartProps {
  data: ProductImage[];
}

function ProductChart({ data }: productChartProps) {
  const monthMap: { [month: string]: number } = {};
  // {["Sep 12"]: 16,["Sep 13"]: 1}

  for (const product of data) {
    const month = new Date(product.createdAt).toLocaleString("default", {
      month: "short",
      day: "2-digit",
    });
    if (!monthMap[month]) monthMap[month] = 0;
    monthMap[month]++;
  }

  const chartData = Object.entries(monthMap).map(([month, count]) => ({
    month,
    count,
  }));

  const chartConfig = {
    desktop: {
      label: "Date",
      color: "#2563eb",
    },
    mobile: {
      label: "Count",
      color: "#60a5fa",
    },
  } satisfies ChartConfig;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Product Added per month</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-80 w-full">
          <AreaChart data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis dataKey={"month"} />
            <YAxis />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Area dataKey={"count"} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

export default ProductChart;
