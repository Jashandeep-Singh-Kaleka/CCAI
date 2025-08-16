"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown,
  PieChart, 
  LineChart, 
  Calendar, 
  Download, 
  Filter,
  Target,
  Users,
  Truck,
  DollarSign,
  Clock,
  MapPin,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Activity,
  Zap,
  Globe,
  Building
} from "lucide-react";
import { cn } from "@/lib/utils";

interface MetricCard {
  title: string;
  value: string | number;
  change: string;
  trend: "up" | "down" | "neutral";
  icon: any;
  color: string;
}

interface ChartData {
  month: string;
  revenue: number;
  loads: number;
  margin: number;
}

const METRICS_DATA: MetricCard[] = [
  {
    title: "Monthly Revenue",
    value: "$289,500",
    change: "+12.3%",
    trend: "up",
    icon: DollarSign,
    color: "green"
  },
  {
    title: "Total Loads",
    value: 147,
    change: "+8.7%",
    trend: "up",
    icon: Truck,
    color: "blue"
  },
  {
    title: "Avg Margin",
    value: "18.5%",
    change: "+2.1%",
    trend: "up",
    icon: TrendingUp,
    color: "purple"
  },
  {
    title: "Customer Satisfaction",
    value: "94.2%",
    change: "-1.2%",
    trend: "down",
    icon: Users,
    color: "orange"
  },
  {
    title: "On-Time Delivery",
    value: "97.8%",
    change: "+0.5%",
    trend: "up",
    icon: Clock,
    color: "teal"
  },
  {
    title: "Avg Load Time",
    value: "2.3 days",
    change: "-0.4 days",
    trend: "up",
    icon: Activity,
    color: "indigo"
  }
];

const REVENUE_CHART_DATA: ChartData[] = [
  { month: "Jan", revenue: 245000, loads: 98, margin: 16.2 },
  { month: "Feb", revenue: 267000, loads: 112, margin: 17.1 },
  { month: "Mar", revenue: 289500, loads: 147, margin: 18.5 },
  { month: "Apr", revenue: 312000, loads: 156, margin: 19.2 },
  { month: "May", revenue: 298000, loads: 142, margin: 18.8 },
  { month: "Jun", revenue: 334000, loads: 168, margin: 20.1 }
];

const LANE_PERFORMANCE = [
  { route: "Chicago - Denver", loads: 23, revenue: 73600, margin: 22.1, trend: "up" },
  { route: "Dallas - Phoenix", loads: 19, revenue: 58400, margin: 18.9, trend: "up" },
  { route: "Miami - Atlanta", loads: 16, revenue: 42800, margin: 15.3, trend: "down" },
  { route: "LA - Seattle", loads: 14, revenue: 67200, margin: 24.5, trend: "up" },
  { route: "Houston - Memphis", loads: 12, revenue: 31200, margin: 14.8, trend: "neutral" }
];

const CARRIER_PERFORMANCE = [
  { name: "Elite Freight", loads: 34, onTime: 98.5, rating: 4.9, status: "preferred" },
  { name: "FastTrack Logistics", loads: 28, onTime: 96.8, rating: 4.7, status: "active" },
  { name: "TransWest Shipping", loads: 22, onTime: 94.2, rating: 4.5, status: "active" },
  { name: "Premier Carriers", loads: 18, onTime: 99.1, rating: 4.8, status: "preferred" },
  { name: "Reliable Transport", loads: 15, onTime: 91.3, rating: 4.2, status: "review" }
];

const CUSTOMER_METRICS = [
  { company: "MegaCorp Industries", loads: 45, revenue: 144000, satisfaction: 4.9, tier: "platinum" },
  { company: "TechFlow Solutions", loads: 32, revenue: 96000, satisfaction: 4.7, tier: "gold" },
  { company: "BuildCorp", loads: 28, revenue: 67200, satisfaction: 4.8, tier: "gold" },
  { company: "FastRetail Chain", loads: 24, revenue: 57600, satisfaction: 4.5, tier: "silver" },
  { company: "GlobalTrade Inc", loads: 18, revenue: 43200, satisfaction: 4.6, tier: "silver" }
];

export default function MetricsDashboardComponent() {
  const [selectedPeriod, setSelectedPeriod] = useState("30d");
  const [activeMetric, setActiveMetric] = useState("revenue");

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      notation: 'compact'
    }).format(amount);
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up": return <TrendingUp className="h-4 w-4 text-green-600" />;
      case "down": return <TrendingDown className="h-4 w-4 text-red-600" />;
      default: return <Activity className="h-4 w-4 text-gray-600" />;
    }
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case "platinum": return "bg-purple-100 text-purple-800";
      case "gold": return "bg-yellow-100 text-yellow-800";
      case "silver": return "bg-gray-100 text-gray-800";
      default: return "bg-blue-100 text-blue-800";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "preferred": return "bg-green-100 text-green-800";
      case "active": return "bg-blue-100 text-blue-800";
      case "review": return "bg-orange-100 text-orange-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Business Metrics</h1>
          <p className="text-gray-600">Performance analytics and key business insights</p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
            {["7d", "30d", "90d", "1y"].map((period) => (
              <Button
                key={period}
                variant={selectedPeriod === period ? "default" : "ghost"}
                size="sm"
                onClick={() => setSelectedPeriod(period)}
                className="text-xs"
              >
                {period}
              </Button>
            ))}
          </div>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {METRICS_DATA.map((metric, index) => (
          <Card key={index} className="relative overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{metric.title}</p>
                  <p className="text-2xl font-bold">{metric.value}</p>
                  <div className="flex items-center space-x-1 mt-1">
                    {getTrendIcon(metric.trend)}
                    <span className={cn(
                      "text-sm font-medium",
                      metric.trend === "up" ? "text-green-600" : 
                      metric.trend === "down" ? "text-red-600" : "text-gray-600"
                    )}>
                      {metric.change}
                    </span>
                  </div>
                </div>
                <div className={cn(
                  "p-3 rounded-full",
                  metric.color === "green" ? "bg-green-100" :
                  metric.color === "blue" ? "bg-blue-100" :
                  metric.color === "purple" ? "bg-purple-100" :
                  metric.color === "orange" ? "bg-orange-100" :
                  metric.color === "teal" ? "bg-teal-100" : "bg-indigo-100"
                )}>
                  <metric.icon className={cn(
                    "h-6 w-6",
                    metric.color === "green" ? "text-green-600" :
                    metric.color === "blue" ? "text-blue-600" :
                    metric.color === "purple" ? "text-purple-600" :
                    metric.color === "orange" ? "text-orange-600" :
                    metric.color === "teal" ? "text-teal-600" : "text-indigo-600"
                  )} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Chart Visualization */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Revenue & Load Trends</CardTitle>
              <CardDescription>Monthly performance over time</CardDescription>
            </div>
            <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
              {["revenue", "loads", "margin"].map((metric) => (
                <Button
                  key={metric}
                  variant={activeMetric === metric ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setActiveMetric(metric)}
                  className="capitalize text-xs"
                >
                  {metric}
                </Button>
              ))}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-end justify-between space-x-2 p-4">
            {REVENUE_CHART_DATA.map((data, index) => {
              const value = activeMetric === "revenue" ? data.revenue / 1000 : 
                          activeMetric === "loads" ? data.loads :
                          data.margin;
              const maxValue = activeMetric === "revenue" ? 350 : 
                             activeMetric === "loads" ? 200 : 25;
              const height = (value / maxValue) * 200;
              
              return (
                <div key={index} className="flex flex-col items-center space-y-2 flex-1">
                  <div 
                    className="bg-blue-500 rounded-t w-full min-h-[20px] transition-all duration-300 hover:bg-blue-600 cursor-pointer"
                    style={{ height: `${height}px` }}
                    title={`${data.month}: ${
                      activeMetric === "revenue" ? formatCurrency(data.revenue) :
                      activeMetric === "loads" ? `${data.loads} loads` :
                      `${data.margin}% margin`
                    }`}
                  />
                  <span className="text-xs text-gray-600">{data.month}</span>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Lane Performance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <MapPin className="h-5 w-5 mr-2" />
              Top Performing Lanes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {LANE_PERFORMANCE.map((lane, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-sm">{lane.route}</span>
                      {getTrendIcon(lane.trend)}
                    </div>
                    <div className="flex items-center space-x-4 mt-1 text-xs text-gray-600">
                      <span>{lane.loads} loads</span>
                      <span>{formatCurrency(lane.revenue)}</span>
                      <span>{lane.margin}% margin</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Carrier Performance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Truck className="h-5 w-5 mr-2" />
              Carrier Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {CARRIER_PERFORMANCE.map((carrier, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-sm">{carrier.name}</span>
                      <Badge variant="outline" className={getStatusColor(carrier.status)}>
                        {carrier.status}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-4 mt-1 text-xs text-gray-600">
                      <span>{carrier.loads} loads</span>
                      <span>{carrier.onTime}% on-time</span>
                      <span>★ {carrier.rating}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Customer Analytics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Building className="h-5 w-5 mr-2" />
            Top Customers
          </CardTitle>
          <CardDescription>Customer performance and tier analysis</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b text-left">
                  <th className="pb-3 text-sm font-medium text-gray-600">Customer</th>
                  <th className="pb-3 text-sm font-medium text-gray-600">Loads</th>
                  <th className="pb-3 text-sm font-medium text-gray-600">Revenue</th>
                  <th className="pb-3 text-sm font-medium text-gray-600">Satisfaction</th>
                  <th className="pb-3 text-sm font-medium text-gray-600">Tier</th>
                </tr>
              </thead>
              <tbody>
                {CUSTOMER_METRICS.map((customer, index) => (
                  <tr key={index} className="border-b last:border-b-0">
                    <td className="py-3">
                      <span className="font-medium text-sm">{customer.company}</span>
                    </td>
                    <td className="py-3 text-sm">{customer.loads}</td>
                    <td className="py-3 text-sm font-mono">{formatCurrency(customer.revenue)}</td>
                    <td className="py-3 text-sm">
                      <div className="flex items-center space-x-1">
                        <span>★ {customer.satisfaction}</span>
                      </div>
                    </td>
                    <td className="py-3">
                      <Badge variant="outline" className={getTierColor(customer.tier)}>
                        {customer.tier}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Performance Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center">
              <Target className="h-5 w-5 mr-2 text-green-600" />
              Goals Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Monthly Revenue</span>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm font-medium">110%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Load Volume</span>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm font-medium">104%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Profit Margin</span>
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="h-4 w-4 text-orange-600" />
                  <span className="text-sm font-medium">92%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center">
              <Zap className="h-5 w-5 mr-2 text-blue-600" />
              Quick Insights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <p>• Chicago-Denver is your most profitable lane</p>
              <p>• Elite Freight has 98.5% on-time rate</p>
              <p>• MegaCorp represents 22% of total revenue</p>
              <p>• Load volume up 8.7% vs last month</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center">
              <AlertTriangle className="h-5 w-5 mr-2 text-orange-600" />
              Action Items
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <p>• Review Miami-Atlanta margin decline</p>
              <p>• Follow up with 3 missed calls</p>
              <p>• Negotiate rates with FastTrack</p>
              <p>• Update customer satisfaction survey</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}