import { AlertTriangle, Clock, Gauge, Package } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface StatCardProps {
  title: string
  value: string
  description: string
  icon: "clock" | "gauge" | "alert-triangle" | "package"
  trend?: string
  trendValue?: string
  trendDirection?: "up" | "down"
}

export function StatCard({ title, value, description, icon, trend, trendValue, trendDirection = "up" }: StatCardProps) {
  const IconComponent = {
    clock: Clock,
    gauge: Gauge,
    "alert-triangle": AlertTriangle,
    package: Package,
  }[icon]

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <IconComponent className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
        {trend && (
          <div className="mt-2 flex items-center text-xs">
            <span
              className={cn(
                "mr-1 rounded-md px-1.5 py-0.5 font-medium",
                trendDirection === "down"
                  ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                  : "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
              )}
            >
              {trendValue}
            </span>
            <span className="text-muted-foreground">
              {trendDirection === "down" ? "decrease" : "increase"} from last period
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
