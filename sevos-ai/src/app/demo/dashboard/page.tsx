"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Inbox, 
  Receipt, 
  Users, 
  Phone, 
  DollarSign, 
  BarChart3,
  Bot,
  Mail,
  AlertCircle,
  TrendingUp,
  Truck,
  Bell,
  Settings,
  LogOut,
  Search,
  Menu,
  ChevronDown,
  Sparkles,
  Shield,
  User
} from "lucide-react";
import { useState } from "react";
import InboxComponent from "@/components/inbox/inbox";
import LeadManagementComponent from "@/components/leads/lead-management";
import InvoiceManagementComponent from "@/components/invoices/invoice-management";
import AIAssistantComponent from "@/components/ai-assistant/ai-assistant";
import CallCenterComponent from "@/components/calls/call-center";
import FinancialDashboardComponent from "@/components/finance/financial-dashboard";
import MetricsDashboardComponent from "@/components/metrics/metrics-dashboard";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50" style={{backgroundColor: '#f9fafb', minHeight: '100vh'}}>
      {/* Top Navigation */}
      <header className="sticky top-0 z-40 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center shadow-soft">
                    <Truck className="h-4 w-4 text-white" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-success rounded-full border border-background" />
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
                    SEVOS.AI
                  </span>
                  <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20 text-xs">
                    Demo
                  </Badge>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-64 pl-10 pr-4 py-2 text-sm border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                />
              </div>
              
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-destructive text-destructive-foreground rounded-full text-xs flex items-center justify-center">
                  3
                </span>
              </Button>
              
              <div className="flex items-center space-x-2 pl-4 border-l border-border">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <User className="h-4 w-4 text-primary" />
                  </div>
                  <div className="hidden md:block">
                    <div className="text-sm font-medium">Demo User</div>
                    <div className="text-xs text-muted-foreground">demo@sevos.ai</div>
                  </div>
                </div>
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`${sidebarCollapsed ? 'w-16' : 'w-72'} transition-all duration-300 border-r bg-white backdrop-blur-sm`} style={{backgroundColor: 'white', borderRight: '1px solid #e5e7eb'}}>
          <div className="p-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="w-full justify-start mb-6"
            >
              <Menu className="h-4 w-4" />
              {!sidebarCollapsed && <span className="ml-2">Collapse menu</span>}
            </Button>
          </div>
          
          <nav className="px-4 space-y-2">
            {[
              { 
                id: "overview", 
                icon: BarChart3, 
                label: "Overview", 
                badge: null,
                color: "text-blue-600",
                bgColor: "bg-blue-50"
              },
              { 
                id: "inbox", 
                icon: Inbox, 
                label: "Inbox", 
                badge: 12,
                color: "text-purple-600",
                bgColor: "bg-purple-50"
              },
              { 
                id: "leads", 
                icon: Users, 
                label: "Leads", 
                badge: 8,
                color: "text-green-600",
                bgColor: "bg-green-50"
              },
              { 
                id: "invoices", 
                icon: Receipt, 
                label: "Invoices", 
                badge: 3,
                color: "text-orange-600",
                bgColor: "bg-orange-50"
              },
              { 
                id: "calls", 
                icon: Phone, 
                label: "Calls", 
                badge: 2,
                color: "text-indigo-600",
                bgColor: "bg-indigo-50"
              },
              { 
                id: "finance", 
                icon: DollarSign, 
                label: "Finance", 
                badge: null,
                color: "text-emerald-600",
                bgColor: "bg-emerald-50"
              },
              { 
                id: "metrics", 
                icon: TrendingUp, 
                label: "Analytics", 
                badge: null,
                color: "text-pink-600",
                bgColor: "bg-pink-50"
              },
              { 
                id: "ai-assistant", 
                icon: Bot, 
                label: "AI Assistant", 
                badge: null,
                color: "text-violet-600",
                bgColor: "bg-violet-50",
                highlight: true
              }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-3 py-3 rounded-xl text-left transition-all duration-200 group ${
                  activeTab === item.id 
                    ? `${item.bgColor} ${item.color} shadow-sm` 
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`relative ${activeTab === item.id ? item.color : 'text-gray-500 group-hover:text-gray-900'}`}>
                    <item.icon className="h-5 w-5" />
                    {item.highlight && (
                      <Sparkles className="absolute -top-1 -right-1 h-3 w-3 text-warning" />
                    )}
                  </div>
                  {!sidebarCollapsed && (
                    <span className="font-medium">{item.label}</span>
                  )}
                </div>
                {!sidebarCollapsed && item.badge && (
                  <Badge 
                    variant="secondary" 
                    className={`ml-auto text-xs ${
                      activeTab === item.id ? 'bg-white/80' : ''
                    }`}
                  >
                    {item.badge}
                  </Badge>
                )}
              </button>
            ))}
          </nav>
          
          {!sidebarCollapsed && (
            <div className="p-4 mt-8 border-t">
              <div className="bg-primary/5 border border-primary/20 rounded-xl p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Shield className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium text-primary">Enterprise Ready</span>
                </div>
                <p className="text-xs text-muted-foreground mb-3">
                  Upgrade to unlock advanced features and unlimited usage.
                </p>
                <Button size="sm" className="w-full h-8 text-xs">
                  Upgrade Now
                </Button>
              </div>
            </div>
          )}
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-auto bg-gray-50" style={{backgroundColor: '#f9fafb'}}>
          <div className="p-6 space-y-6 animate-fade-in" style={{padding: '1.5rem'}}>
            {activeTab === "overview" && <OverviewTab />}
            {activeTab === "inbox" && <InboxTab />}
            {activeTab === "invoices" && <InvoicesTab />}
            {activeTab === "leads" && <LeadsTab />}
            {activeTab === "calls" && <CallsTab />}
            {activeTab === "finance" && <FinanceTab />}
            {activeTab === "metrics" && <MetricsTab />}
            {activeTab === "ai-assistant" && <AIAssistantTab />}
          </div>
        </main>
      </div>
    </div>
  );
}

function OverviewTab() {
  return (
    <div className="space-y-8">
      {/* Debug Test Element */}
      <div className="bg-red-500 text-white p-4 rounded-lg" style={{backgroundColor: 'red', color: 'white', padding: '1rem', borderRadius: '0.5rem'}}>
        🔥 DEBUG: If you can see this red box, Tailwind CSS and components are loading correctly!
      </div>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900" style={{color: '#111827', fontSize: '1.875rem', fontWeight: '700'}}>Welcome back! 👋</h1>
          <p className="text-gray-600 text-lg mt-2">Here&apos;s what&apos;s happening with your brokerage today.</p>
        </div>
        <div className="flex items-center space-x-3">
          <Badge variant="outline" className="bg-success/10 text-success border-success/20">
            <div className="w-2 h-2 bg-success rounded-full mr-2" />
            All systems operational
          </Badge>
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4 mr-2" />
            Quick Actions
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            title: "Total Revenue",
            value: "$127,450",
            change: "+12%",
            trend: "up",
            icon: DollarSign,
            color: "text-emerald-600",
            bgColor: "bg-emerald-50",
            description: "from last month"
          },
          {
            title: "Active Loads",
            value: "47",
            change: "+8",
            trend: "up", 
            icon: Truck,
            color: "text-blue-600",
            bgColor: "bg-blue-50",
            description: "new this week"
          },
          {
            title: "Open Leads",
            value: "23",
            change: "5",
            trend: "neutral",
            icon: Users,
            color: "text-purple-600",
            bgColor: "bg-purple-50",
            description: "high priority"
          },
          {
            title: "Avg Margin",
            value: "18.5%",
            change: "+2.1%",
            trend: "up",
            icon: TrendingUp,
            color: "text-orange-600",
            bgColor: "bg-orange-50",
            description: "improvement"
          }
        ].map((metric, index) => (
          <Card key={index} className="relative overflow-hidden bg-white border shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1" style={{backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '0.5rem', boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)'}}>
            <div className={`absolute inset-0 ${metric.bgColor} opacity-30`} />
            <CardContent className="p-6 relative">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 ${metric.bgColor} rounded-xl flex items-center justify-center shadow-soft`}>
                  <metric.icon className={`h-6 w-6 ${metric.color}`} />
                </div>
                <div className={`flex items-center space-x-1 text-sm ${
                  metric.trend === "up" ? "text-success" : 
                  metric.trend === "down" ? "text-destructive" : "text-muted-foreground"
                }`}>
                  {metric.trend === "up" && <TrendingUp className="h-4 w-4" />}
                  {metric.trend === "down" && <AlertCircle className="h-4 w-4" />}
                  <span className="font-medium">{metric.change}</span>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">{metric.title}</p>
                <p className="text-3xl font-bold tracking-tight text-gray-900">{metric.value}</p>
                <p className="text-sm text-gray-500 mt-1">{metric.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activity */}
        <Card className="bg-white border shadow-sm">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl">Recent Activity</CardTitle>
                <CardDescription>Latest communications and updates</CardDescription>
              </div>
              <Button variant="ghost" size="sm">
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              {
                icon: Mail,
                title: "Rate request from MegaCorp Industries",
                description: "Chicago to Denver - Electronics load",
                time: "2 hours ago",
                priority: "high",
                color: "text-blue-600",
                bgColor: "bg-blue-50"
              },
              {
                icon: AlertCircle,
                title: "Load delay notification",
                description: "Weather delay in Oklahoma - Load #LD-789123",
                time: "1 hour ago", 
                priority: "urgent",
                color: "text-red-600",
                bgColor: "bg-red-50"
              },
              {
                icon: Receipt,
                title: "Invoice received from Elite Freight",
                description: "Invoice #EF-2024-1156 - $2,450",
                time: "4 hours ago",
                priority: "medium",
                color: "text-green-600",
                bgColor: "bg-green-50"
              },
              {
                icon: Phone,
                title: "Call from TransWest Shipping",
                description: "Emergency load pickup needed",
                time: "5 hours ago",
                priority: "high",
                color: "text-purple-600",
                bgColor: "bg-purple-50"
              }
            ].map((item, index) => (
              <div key={index} className="flex items-start space-x-4 p-4 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer group">
                <div className={`w-10 h-10 ${item.bgColor} rounded-lg flex items-center justify-center shadow-soft group-hover:shadow-moderate transition-all duration-200`}>
                  <item.icon className={`h-5 w-5 ${item.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium leading-tight text-gray-900">{item.title}</p>
                  <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                  <p className="text-xs text-gray-500 mt-2">{item.time}</p>
                </div>
                <Badge 
                  variant={item.priority === "urgent" ? "destructive" : 
                          item.priority === "high" ? "default" : "secondary"}
                  className="flex-shrink-0"
                >
                  {item.priority}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Card className="bg-white border shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl">Performance Overview</CardTitle>
            <CardDescription>Key metrics for this month</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {[
              { label: "Customer Satisfaction", value: 94, color: "bg-green-500" },
              { label: "On-Time Delivery", value: 98, color: "bg-blue-500" },
              { label: "Load Fill Rate", value: 87, color: "bg-purple-500" },
              { label: "Carrier Retention", value: 92, color: "bg-orange-500" }
            ].map((stat, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{stat.label}</span>
                  <span className="text-muted-foreground">{stat.value}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                  <div 
                    className={`h-full ${stat.color} rounded-full transition-all duration-700 ease-out`}
                    style={{ width: `${stat.value}%` }}
                  />
                </div>
              </div>
            ))}
            
            <div className="pt-4 border-t">
              <Button variant="outline" className="w-full">
                <BarChart3 className="h-4 w-4 mr-2" />
                View Detailed Analytics
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function InboxTab() {
  return <InboxComponent />;
}

function InvoicesTab() {
  return <InvoiceManagementComponent />;
}

function LeadsTab() {
  return <LeadManagementComponent />;
}

function CallsTab() {
  return <CallCenterComponent />;
}

function FinanceTab() {
  return <FinancialDashboardComponent />;
}

function MetricsTab() {
  return <MetricsDashboardComponent />;
}

function AIAssistantTab() {
  return <AIAssistantComponent />;
}