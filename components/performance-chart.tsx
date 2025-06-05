"use client"

import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// Mock data for the performance chart
const performanceData = [
  { day: "Mon", efficiency: 78 },
  { day: "Tue", efficiency: 82 },
  { day: "Wed", efficiency: 85 },
  { day: "Thu", efficiency: 79 },
  { day: "Fri", efficiency: 88 },
  { day: "Sat", efficiency: 91 },
  { day: "Sun", efficiency: 87 },
]

export function PerformanceChart() {
  return (
    <ChartContainer
      config={{
        efficiency: {
          label: "Efficiency",
          color: "hsl(var(--chart-1))",
        },
      }}
      className="h-[300px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={performanceData} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
          <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
          <YAxis
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `${value}%`}
            domain={[0, 100]}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Line
            type="monotone"
            dataKey="efficiency"
            strokeWidth={2}
            activeDot={{ r: 6, strokeWidth: 0 }}
            stroke="var(--color-efficiency)"
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
