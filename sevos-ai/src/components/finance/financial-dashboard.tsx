"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown,
  Calculator, 
  FileText, 
  Plus, 
  Search, 
  Filter,
  Download,
  CreditCard,
  Wallet,
  ArrowUpCircle,
  ArrowDownCircle,
  Calendar,
  BarChart3,
  PieChart,
  Receipt,
  Building,
  Truck,
  Users,
  AlertTriangle
} from "lucide-react";
import { cn } from "@/lib/utils";

interface JournalEntry {
  id: string;
  date: Date;
  description: string;
  reference: string;
  entries: {
    account: string;
    accountNumber: string;
    debit?: number;
    credit?: number;
    description: string;
  }[];
  totalDebits: number;
  totalCredits: number;
  balanced: boolean;
  source: "manual" | "ai" | "invoice" | "payment";
}

interface AccountBalance {
  accountNumber: string;
  accountName: string;
  balance: number;
  type: "asset" | "liability" | "equity" | "revenue" | "expense";
  subAccounts?: AccountBalance[];
}

const DEMO_JOURNAL_ENTRIES: JournalEntry[] = [
  {
    id: "JE-001",
    date: new Date(Date.now() - 2 * 60 * 60 * 1000),
    description: "Payment to Elite Freight - Invoice EF-2024-1156",
    reference: "INV-EF-2024-1156",
    entries: [
      {
        account: "Carrier Costs",
        accountNumber: "5000",
        debit: 2450.00,
        description: "Carrier payment - Elite Freight"
      },
      {
        account: "Accounts Payable",
        accountNumber: "2000",
        credit: 2450.00,
        description: "Payment to Elite Freight"
      }
    ],
    totalDebits: 2450.00,
    totalCredits: 2450.00,
    balanced: true,
    source: "ai"
  },
  {
    id: "JE-002",
    date: new Date(Date.now() - 4 * 60 * 60 * 1000),
    description: "Revenue from MegaCorp Industries - Load LD-789123",
    reference: "LOAD-789123",
    entries: [
      {
        account: "Accounts Receivable",
        accountNumber: "1200",
        debit: 3200.00,
        description: "MegaCorp Industries - Electronics shipment"
      },
      {
        account: "Freight Revenue",
        accountNumber: "4000",
        credit: 3200.00,
        description: "Chicago to Denver - Electronics"
      }
    ],
    totalDebits: 3200.00,
    totalCredits: 3200.00,
    balanced: true,
    source: "invoice"
  },
  {
    id: "JE-003",
    date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    description: "Customer payment received - FastTrack Logistics",
    reference: "PMT-FT-001",
    entries: [
      {
        account: "Cash - Operating",
        accountNumber: "1000",
        debit: 5670.00,
        description: "Payment received from FastTrack Logistics"
      },
      {
        account: "Accounts Receivable",
        accountNumber: "1200",
        credit: 5670.00,
        description: "FastTrack Logistics payment"
      }
    ],
    totalDebits: 5670.00,
    totalCredits: 5670.00,
    balanced: true,
    source: "payment"
  },
  {
    id: "JE-004",
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    description: "Monthly insurance expense",
    reference: "INS-2024-03",
    entries: [
      {
        account: "Insurance Expense",
        accountNumber: "6100",
        debit: 1250.00,
        description: "Monthly cargo and liability insurance"
      },
      {
        account: "Cash - Operating",
        accountNumber: "1000",
        credit: 1250.00,
        description: "Insurance premium payment"
      }
    ],
    totalDebits: 1250.00,
    totalCredits: 1250.00,
    balanced: true,
    source: "manual"
  }
];

const CHART_OF_ACCOUNTS: AccountBalance[] = [
  {
    accountNumber: "1000",
    accountName: "Cash - Operating",
    balance: 127450.00,
    type: "asset"
  },
  {
    accountNumber: "1200",
    accountName: "Accounts Receivable",
    balance: 45670.00,
    type: "asset"
  },
  {
    accountNumber: "1500",
    accountName: "Equipment",
    balance: 85000.00,
    type: "asset"
  },
  {
    accountNumber: "2000",
    accountName: "Accounts Payable",
    balance: 23450.00,
    type: "liability"
  },
  {
    accountNumber: "2100",
    accountName: "Accrued Expenses",
    balance: 8900.00,
    type: "liability"
  },
  {
    accountNumber: "3000",
    accountName: "Owner's Equity",
    balance: 150000.00,
    type: "equity"
  },
  {
    accountNumber: "4000",
    accountName: "Freight Revenue",
    balance: 289500.00,
    type: "revenue"
  },
  {
    accountNumber: "5000",
    accountName: "Carrier Costs",
    balance: 205670.00,
    type: "expense"
  },
  {
    accountNumber: "6000",
    accountName: "Operating Expenses",
    balance: 34500.00,
    type: "expense"
  },
  {
    accountNumber: "6100",
    accountName: "Insurance Expense",
    balance: 15000.00,
    type: "expense"
  }
];

export default function FinancialDashboardComponent() {
  const [selectedEntry, setSelectedEntry] = useState<JournalEntry | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterSource, setFilterSource] = useState<string>("all");
  const [activeView, setActiveView] = useState<"overview" | "journal" | "accounts">("overview");

  const filteredEntries = DEMO_JOURNAL_ENTRIES.filter(entry => {
    const matchesSearch = entry.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entry.reference.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterSource === "all" || entry.source === filterSource;
    return matchesSearch && matchesFilter;
  });

  const totalAssets = CHART_OF_ACCOUNTS
    .filter(account => account.type === "asset")
    .reduce((sum, account) => sum + account.balance, 0);

  const totalLiabilities = CHART_OF_ACCOUNTS
    .filter(account => account.type === "liability")
    .reduce((sum, account) => sum + account.balance, 0);

  const totalRevenue = CHART_OF_ACCOUNTS
    .filter(account => account.type === "revenue")
    .reduce((sum, account) => sum + account.balance, 0);

  const totalExpenses = CHART_OF_ACCOUNTS
    .filter(account => account.type === "expense")
    .reduce((sum, account) => sum + account.balance, 0);

  const netIncome = totalRevenue - totalExpenses;
  const grossMargin = ((totalRevenue - CHART_OF_ACCOUNTS.find(a => a.accountNumber === "5000")?.balance!) / totalRevenue * 100);

  const handleGenerateJE = async () => {
    console.log("Generate journal entry with AI");
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Financial Dashboard</h1>
          <p className="text-gray-600">Financial management, journal entries, and accounting overview</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button size="sm" onClick={handleGenerateJE}>
            <Plus className="h-4 w-4 mr-2" />
            New Entry
          </Button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
        {[
          { id: "overview", label: "Overview", icon: BarChart3 },
          { id: "journal", label: "Journal Entries", icon: FileText },
          { id: "accounts", label: "Chart of Accounts", icon: Building }
        ].map((tab) => (
          <Button
            key={tab.id}
            variant={activeView === tab.id ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveView(tab.id as any)}
            className="flex items-center space-x-2"
          >
            <tab.icon className="h-4 w-4" />
            <span>{tab.label}</span>
          </Button>
        ))}
      </div>

      {activeView === "overview" && (
        <div className="space-y-6">
          {/* Financial KPIs */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Assets</p>
                    <p className="text-2xl font-bold">{formatCurrency(totalAssets)}</p>
                  </div>
                  <Wallet className="h-8 w-8 text-green-600" />
                </div>
                <p className="text-sm text-green-600 mt-1">+8.2% from last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Net Income</p>
                    <p className="text-2xl font-bold">{formatCurrency(netIncome)}</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-blue-600" />
                </div>
                <p className="text-sm text-blue-600 mt-1">+15.3% profit margin</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Gross Margin</p>
                    <p className="text-2xl font-bold">{grossMargin.toFixed(1)}%</p>
                  </div>
                  <PieChart className="h-8 w-8 text-purple-600" />
                </div>
                <p className="text-sm text-purple-600 mt-1">Above industry avg</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">A/R Outstanding</p>
                    <p className="text-2xl font-bold">{formatCurrency(CHART_OF_ACCOUNTS.find(a => a.accountNumber === "1200")?.balance!)}</p>
                  </div>
                  <CreditCard className="h-8 w-8 text-orange-600" />
                </div>
                <p className="text-sm text-orange-600 mt-1">32 days average</p>
              </CardContent>
            </Card>
          </div>

          {/* Quick Financial Summary */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <ArrowUpCircle className="h-5 w-5 mr-2 text-green-600" />
                  Revenue Breakdown
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Freight Revenue</span>
                    <span className="font-medium">{formatCurrency(totalRevenue)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Less: Carrier Costs</span>
                    <span className="font-medium text-red-600">-{formatCurrency(CHART_OF_ACCOUNTS.find(a => a.accountNumber === "5000")?.balance!)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Less: Operating Expenses</span>
                    <span className="font-medium text-red-600">-{formatCurrency(totalExpenses - CHART_OF_ACCOUNTS.find(a => a.accountNumber === "5000")?.balance!)}</span>
                  </div>
                  <div className="border-t pt-3">
                    <div className="flex justify-between items-center font-bold">
                      <span>Net Income</span>
                      <span className="text-green-600">{formatCurrency(netIncome)}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calculator className="h-5 w-5 mr-2 text-blue-600" />
                  Key Ratios
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Gross Profit Margin</span>
                    <span className="font-medium">{grossMargin.toFixed(1)}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Net Profit Margin</span>
                    <span className="font-medium">{(netIncome / totalRevenue * 100).toFixed(1)}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Asset Turnover</span>
                    <span className="font-medium">1.12x</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Current Ratio</span>
                    <span className="font-medium">7.85</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">ROA</span>
                    <span className="font-medium text-green-600">22.4%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {activeView === "journal" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Journal Entry List */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Journal Entries</CardTitle>
                <div className="flex space-x-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search entries..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="flex space-x-1">
                  {["all", "ai", "manual", "invoice", "payment"].map((source) => (
                    <Button
                      key={source}
                      variant={filterSource === source ? "default" : "outline"}
                      size="sm"
                      onClick={() => setFilterSource(source)}
                      className="capitalize text-xs"
                    >
                      {source}
                    </Button>
                  ))}
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="max-h-[600px] overflow-auto">
                  {filteredEntries.map((entry) => (
                    <div
                      key={entry.id}
                      onClick={() => setSelectedEntry(entry)}
                      className={cn(
                        "p-4 border-b cursor-pointer hover:bg-gray-50 transition-colors",
                        selectedEntry?.id === entry.id && "bg-blue-50 border-blue-200"
                      )}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <p className="font-medium text-sm">{entry.id}</p>
                            <Badge 
                              variant={
                                entry.source === "ai" ? "default" :
                                entry.source === "manual" ? "secondary" :
                                entry.source === "invoice" ? "outline" : "destructive"
                              }
                              className="text-xs"
                            >
                              {entry.source}
                            </Badge>
                          </div>
                          <p className="text-xs text-gray-600 mt-1">{entry.description}</p>
                          <div className="flex items-center space-x-2 mt-2">
                            <span className="text-xs text-gray-500">
                              {formatCurrency(entry.totalDebits)}
                            </span>
                            <span className="text-xs text-gray-400">
                              {entry.date.toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                        <div className={cn(
                          "w-2 h-2 rounded-full mt-1",
                          entry.balanced ? "bg-green-400" : "bg-red-400"
                        )} />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Journal Entry Details */}
          <div className="lg:col-span-2">
            {selectedEntry ? (
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center space-x-2">
                        <span>{selectedEntry.id}</span>
                        <Badge 
                          variant={
                            selectedEntry.source === "ai" ? "default" :
                            selectedEntry.source === "manual" ? "secondary" :
                            selectedEntry.source === "invoice" ? "outline" : "destructive"
                          }
                        >
                          {selectedEntry.source}
                        </Badge>
                        {selectedEntry.balanced && (
                          <Badge variant="outline" className="text-green-600">
                            Balanced
                          </Badge>
                        )}
                      </CardTitle>
                      <CardDescription>
                        {selectedEntry.description} • {selectedEntry.date.toLocaleString()}
                      </CardDescription>
                    </div>
                    <Button variant="outline" size="sm">
                      <FileText className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-3">Journal Entries</h4>
                      <div className="bg-gray-50 rounded-lg overflow-hidden">
                        <div className="grid grid-cols-4 gap-4 p-3 bg-gray-100 text-sm font-medium">
                          <span>Account</span>
                          <span>Description</span>
                          <span className="text-right">Debit</span>
                          <span className="text-right">Credit</span>
                        </div>
                        {selectedEntry.entries.map((entry, index) => (
                          <div key={index} className="grid grid-cols-4 gap-4 p-3 border-b last:border-b-0 text-sm">
                            <div>
                              <div className="font-medium">{entry.account}</div>
                              <div className="text-gray-500 text-xs">{entry.accountNumber}</div>
                            </div>
                            <span className="text-gray-700">{entry.description}</span>
                            <span className="text-right font-mono">
                              {entry.debit ? formatCurrency(entry.debit) : "-"}
                            </span>
                            <span className="text-right font-mono">
                              {entry.credit ? formatCurrency(entry.credit) : "-"}
                            </span>
                          </div>
                        ))}
                        <div className="grid grid-cols-4 gap-4 p-3 bg-gray-100 text-sm font-medium">
                          <span></span>
                          <span>Totals</span>
                          <span className="text-right">{formatCurrency(selectedEntry.totalDebits)}</span>
                          <span className="text-right">{formatCurrency(selectedEntry.totalCredits)}</span>
                        </div>
                      </div>
                    </div>
                    
                    {selectedEntry.reference && (
                      <div>
                        <h4 className="font-medium mb-2">Reference</h4>
                        <p className="text-sm text-gray-700 bg-gray-50 p-2 rounded">
                          {selectedEntry.reference}
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="p-12 text-center">
                  <FileText className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                  <h3 className="text-lg font-medium mb-2">Select a journal entry</h3>
                  <p className="text-gray-600">Choose an entry from the list to view details</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      )}

      {activeView === "accounts" && (
        <Card>
          <CardHeader>
            <CardTitle>Chart of Accounts</CardTitle>
            <CardDescription>Account balances and structure</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {["asset", "liability", "equity", "revenue", "expense"].map((type) => (
                <div key={type}>
                  <h3 className="font-medium mb-3 capitalize flex items-center">
                    {type === "asset" && <ArrowUpCircle className="h-4 w-4 mr-2 text-green-600" />}
                    {type === "liability" && <ArrowDownCircle className="h-4 w-4 mr-2 text-red-600" />}
                    {type === "equity" && <Building className="h-4 w-4 mr-2 text-blue-600" />}
                    {type === "revenue" && <TrendingUp className="h-4 w-4 mr-2 text-purple-600" />}
                    {type === "expense" && <TrendingDown className="h-4 w-4 mr-2 text-orange-600" />}
                    {type}s
                  </h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="space-y-2">
                      {CHART_OF_ACCOUNTS
                        .filter(account => account.type === type)
                        .map((account) => (
                          <div key={account.accountNumber} className="flex justify-between items-center">
                            <div className="flex items-center space-x-3">
                              <span className="text-sm text-gray-500 font-mono w-12">
                                {account.accountNumber}
                              </span>
                              <span className="text-sm font-medium">{account.accountName}</span>
                            </div>
                            <span className="font-mono text-sm">
                              {formatCurrency(account.balance)}
                            </span>
                          </div>
                        ))}
                      <div className="border-t pt-2 mt-2">
                        <div className="flex justify-between items-center font-medium">
                          <span className="text-sm">Total {type}s</span>
                          <span className="font-mono">
                            {formatCurrency(
                              CHART_OF_ACCOUNTS
                                .filter(account => account.type === type)
                                .reduce((sum, account) => sum + account.balance, 0)
                            )}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}