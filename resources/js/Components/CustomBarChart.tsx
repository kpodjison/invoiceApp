"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/Components/ui/chart";
const chartData = [
    { month: "January 2024", earnings: 186, expenditure: 80 },
    { month: "February", earnings: 305, expenditure: 200 },
    { month: "March", earnings: 237, expenditure: 120 },
    { month: "April", earnings: 73, expenditure: 190 },
    { month: "May", earnings: 209, expenditure: 130 },
    { month: "June", earnings: 214, expenditure: 140 },
];

const chartConfig = {
    earnings: {
        label: "Earnings",
        color: "#65a30d",
    },
    expenditure: {
        label: "Expenditure",
        color: "#ca8a04",
    },
} satisfies ChartConfig;

export function CustomBarChart() {
    return (
        <Card className="">
            <CardHeader>
                <CardTitle>Expenditure - Earnings</CardTitle>
                {/* <CardDescription>January - June 2024</CardDescription> */}
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <BarChart accessibilityLayer data={chartData}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent indicator="dashed" />}
                        />
                        <Bar
                            dataKey="earnings"
                            fill="var(--color-earnings)"
                            radius={4}
                        />
                        <Bar
                            dataKey="expenditure"
                            fill="var(--color-expenditure)"
                            radius={4}
                        />
                    </BarChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
                <div className="leading-none text-muted-foreground rale">
                    Showing monthly expenditure-earnings 
                </div>
            </CardFooter>
        </Card>
    );
}
