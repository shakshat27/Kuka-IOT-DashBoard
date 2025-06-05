"use client"

import { useState } from "react"
import { Bell, ChevronDown, Menu } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PerformanceChart } from "@/components/performance-chart"
import { ErrorsTable } from "@/components/errors-table"
import { StatCard } from "@/components/stat-card"
import { AxisStatusTab } from "@/components/axis-status-tab"

export function KukaRobotDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72">
            <nav className="grid gap-2 text-lg font-medium">
              <a href="#" className="flex items-center gap-2 text-lg font-semibold">
                <span className="text-orange-600">KUKA</span> Robot Dashboard
              </a>
              <a href="#" className="hover:text-orange-600">
                Dashboard
              </a>
              <a href="#" className="hover:text-orange-600">
                Robots
              </a>
              <a href="#" className="hover:text-orange-600">
                Analytics
              </a>
              <a href="#" className="hover:text-orange-600">
                Settings
              </a>
            </nav>
          </SheetContent>
        </Sheet>
        <div className="flex items-center gap-2">
          <a href="#" className="flex items-center gap-2 font-semibold">
            <span className="text-2xl font-bold text-orange-600">KUKA</span>
            <span className="text-xl">Robot Dashboard</span>
          </a>
        </div>
        <div className="ml-auto flex items-center gap-4">
          <Button variant="outline" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-orange-600 text-xs text-white">
              3
            </span>
            <span className="sr-only">Notifications</span>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                  <AvatarFallback>OP</AvatarFallback>
                </Avatar>
                <span className="hidden md:inline-flex">Operator</span>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1">
        <div className="container mx-auto p-4 md:p-6">
          <div className="mb-8">
            <h1 className="text-2xl font-bold tracking-tight">Dashboard Overview</h1>
            <p className="text-muted-foreground">Monitor and analyze your KUKA robot performance.</p>
          </div>

          {/* Quick Actions Bar */}
          <div className="mb-4 flex flex-wrap gap-2 items-center">
            <Button variant="default" onClick={() => alert('All errors acknowledged!')}>
              Acknowledge All Errors
            </Button>
            <Button variant="outline" onClick={() => alert('Report download started!')}>
              Download Report
            </Button>
            <Button variant="secondary" onClick={() => alert('Maintenance request sent!')}>
              Request Maintenance
            </Button>
          </div>

          {/* Last Updated Timestamp */}
          <div className="mb-2 text-xs text-muted-foreground text-right">
            Last updated: {new Date().toLocaleString()}
          </div>

          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="robots">Robots</TabsTrigger>
              <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="status">Status</TabsTrigger> {/* New tab */}
            </TabsList>
            <TabsContent value="overview" className="space-y-4">
              {/* Stats Summary Section */}
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <StatCard
                  title="Total Runtime"
                  value="123h 45m"
                  description="Last 30 days"
                  icon="clock"
                  trend="up"
                  trendValue="12%"
                />
                <StatCard
                  title="Efficiency"
                  value="87%"
                  description="Average across all robots"
                  icon="gauge"
                  trend="up"
                  trendValue="5%"
                />
                <StatCard
                  title="Error Count"
                  value="3"
                  description="Last 24 hours"
                  icon="alert-triangle"
                  trend="down"
                  trendValue="2"
                  trendDirection="down"
                />
                <StatCard title="Current Task" value="Palletizing" description="Active on 3 robots" icon="package" />
              </div>

              {/* Performance Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>Runtime Efficiency</CardTitle>
                  <CardDescription>Performance over the last 7 days</CardDescription>
                </CardHeader>
                <CardContent>
                  <PerformanceChart />
                </CardContent>
              </Card>

              {/* Recent Errors Table */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Errors</CardTitle>
                  <CardDescription>Errors detected in the last 24 hours</CardDescription>
                </CardHeader>
                <CardContent>
                  <ErrorsTable />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="robots">
              <Card>
                <CardHeader>
                  <CardTitle>Robot Status</CardTitle>
                  <CardDescription>Current status of all robots</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Robot status content will appear here.</p>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="maintenance">
              <Card>
                <CardHeader>
                  <CardTitle>Maintenance Schedule</CardTitle>
                  <CardDescription>Upcoming maintenance tasks</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Maintenance schedule content will appear here.</p>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="analytics">
              <Card>
                <CardHeader>
                  <CardTitle>Advanced Analytics</CardTitle>
                  <CardDescription>Detailed performance metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Advanced analytics content will appear here.</p>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="status">
              <Card>
                <CardHeader>
                  <CardTitle>Axis & Motor Load / Temperature</CardTitle>
                  <CardDescription>Live status for each axis and motor</CardDescription>
                </CardHeader>
                <CardContent>
                  {/* AxisStatusTab component displays the table */}
                  <AxisStatusTab />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      {/* Footer */}
      <footer className="w-full border-t bg-background py-2 text-center text-xs text-muted-foreground mt-8">
        &copy; {new Date().getFullYear()} KUKA Dashboard &mdash; v1.0
      </footer>
    </div>
  )
}
