"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Receipt, 
  Search, 
  Upload, 
  Eye,
  Download,
  CheckCircle,
  Clock,
  AlertTriangle,
  FileText,
  DollarSign,
  Calendar,
  Bot,
  Zap,
  Plus,
  Filter,
  MoreHorizontal,
  Paperclip
} from "lucide-react";
import { demoInvoices } from "@/lib/demo-data";
import { formatCurrency, formatDate, getRelativeTime } from "@/lib/format";
import { cn } from "@/lib/utils";

const STATUS_CONFIG = {
  pending: { label: "Pending", color: "bg-yellow-100 text-yellow-800", icon: Clock },
  paid: { label: "Paid", color: "bg-green-100 text-green-800", icon: CheckCircle },
  overdue: { label: "Overdue", color: "bg-red-100 text-red-800", icon: AlertTriangle },
  disputed: { label: "Disputed", color: "bg-orange-100 text-orange-800", icon: FileText },
  draft: { label: "Draft", color: "bg-gray-100 text-gray-800", icon: FileText }
};

export default function InvoiceManagementComponent() {
  const [invoices, setInvoices] = useState(demoInvoices);
  const [selectedInvoice, setSelectedInvoice] = useState<any>(null);
  const [activeStatus, setActiveStatus] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const getFilteredInvoices = () => {
    let filtered = invoices;

    if (activeStatus !== "all") {
      filtered = filtered.filter(invoice => invoice.status === activeStatus);
    }

    if (searchQuery) {
      filtered = filtered.filter(invoice => 
        invoice.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        invoice.vendor.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered.sort((a, b) => new Date(b.issueDate).getTime() - new Date(a.issueDate).getTime());
  };

  const getStatusCounts = () => {
    return Object.keys(STATUS_CONFIG).reduce((acc, status) => {
      acc[status] = invoices.filter(invoice => invoice.status === status).length;
      return acc;
    }, {} as Record<string, number>);
  };

  const getTotalsByStatus = () => {
    return Object.keys(STATUS_CONFIG).reduce((acc, status) => {
      acc[status] = invoices
        .filter(invoice => invoice.status === status)
        .reduce((sum, inv) => sum + inv.amount, 0);
      return acc;
    }, {} as Record<string, number>);
  };

  const processInvoiceWithAI = async () => {
    setIsProcessing(true);

    // Simulate AI processing a new invoice
    const newInvoice = {
      id: `inv-${Date.now()}`,
      invoiceNumber: "FR-2024-0789",
      vendor: "FastLine Trucking Co",
      amount: 3150.00,
      currency: "USD",
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      issueDate: new Date().toISOString(),
      status: "pending" as const,
      lineItems: [
        {
          description: "Transportation: Miami, FL to Boston, MA",
          quantity: 1,
          unitPrice: 2950.00,
          total: 2950.00
        },
        {
          description: "Fuel Surcharge",
          quantity: 1,
          unitPrice: 200.00,
          total: 200.00
        }
      ],
      extractedData: {
        confidence: 0.96,
        ocrText: "AI extracted data from PDF",
        processingTime: "1.2 seconds"
      }
    };

    setTimeout(() => {
      setInvoices(prev => [newInvoice, ...prev]);
      setSelectedInvoice(newInvoice);
      setIsProcessing(false);
    }, 2000);
  };

  const markAsPaid = (invoiceId: string) => {
    setInvoices(prev => prev.map(invoice => 
      invoice.id === invoiceId 
        ? { ...invoice, status: "paid" as const }
        : invoice
    ));
  };

  const generateJournalEntry = async (invoice: any) => {
    alert(`AI-Generated Journal Entry for ${invoice.invoiceNumber}:

DR: Accounts Payable - ${invoice.vendor}     ${formatCurrency(invoice.amount)}
    CR: Cash - Operating Account                     ${formatCurrency(invoice.amount)}

Entry ready for posting to your accounting system.`);
  };

  const statusCounts = getStatusCounts();
  const statusTotals = getTotalsByStatus();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Invoice Management</h1>
          <p className="text-gray-600">AI-powered invoice processing and payment tracking</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button 
            onClick={processInvoiceWithAI}
            disabled={isProcessing}
            variant="outline"
          >
            {isProcessing ? (
              <Bot className="h-4 w-4 mr-2 animate-pulse" />
            ) : (
              <Upload className="h-4 w-4 mr-2" />
            )}
            {isProcessing ? "Processing..." : "Simulate Invoice"}
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Invoice
          </Button>
        </div>
      </div>

      {isProcessing && (
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Bot className="h-5 w-5 text-blue-600 animate-pulse" />
              <span className="text-blue-800 font-medium">AI is extracting data from invoice...</span>
              <Badge variant="secondary" className="ml-auto">OCR + GPT-4</Badge>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {Object.entries(STATUS_CONFIG).map(([status, config]) => {
          const count = statusCounts[status] || 0;
          const total = statusTotals[status] || 0;
          const Icon = config.icon;
          return (
            <Card 
              key={status}
              className={cn(
                "cursor-pointer transition-all hover:shadow-md",
                activeStatus === status ? "ring-2 ring-blue-500" : ""
              )}
              onClick={() => setActiveStatus(activeStatus === status ? "all" : status)}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <Icon className="h-5 w-5 text-gray-600" />
                  <span className="text-2xl font-bold">{count}</span>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">{config.label}</p>
                  <Badge className={cn("text-xs", config.color)} variant="outline">
                    {formatCurrency(total)}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Search and Filters */}
      <div className="flex items-center justify-between">
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search invoices..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Invoice List */}
        <div className="lg:col-span-2">
          <div className="space-y-3">
            {getFilteredInvoices().map((invoice) => {
              const statusConfig = STATUS_CONFIG[invoice.status as keyof typeof STATUS_CONFIG];
              const isOverdue = invoice.status === 'pending' && new Date(invoice.dueDate) < new Date();
              return (
                <Card 
                  key={invoice.id}
                  className={cn(
                    "cursor-pointer transition-all hover:shadow-md",
                    selectedInvoice?.id === invoice.id ? "ring-2 ring-blue-500" : "",
                    isOverdue ? "border-red-200" : ""
                  )}
                  onClick={() => setSelectedInvoice(invoice)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="font-semibold">{invoice.invoiceNumber}</h3>
                          <Badge 
                            className={cn("text-xs", statusConfig.color)}
                            variant="outline"
                          >
                            {statusConfig.label}
                          </Badge>
                          {isOverdue && (
                            <Badge variant="destructive" className="text-xs">
                              Overdue
                            </Badge>
                          )}
                        </div>
                        
                        <div className="space-y-1 mb-3">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">{invoice.vendor}</span>
                            <span className="font-semibold">{formatCurrency(invoice.amount)}</span>
                          </div>
                          <div className="flex items-center justify-between text-sm text-gray-500">
                            <span>Due: {formatDate(invoice.dueDate)}</span>
                            <span>Issued: {formatDate(invoice.issueDate)}</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            {invoice.extractedData && (
                              <Badge variant="secondary" className="text-xs">
                                <Bot className="h-3 w-3 mr-1" />
                                AI Processed
                              </Badge>
                            )}
                            {invoice.lineItems && (
                              <Badge variant="outline" className="text-xs">
                                {invoice.lineItems.length} items
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center space-x-1">
                            {invoice.status === 'pending' && (
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  markAsPaid(invoice.id);
                                }}
                              >
                                <CheckCircle className="h-3 w-3" />
                              </Button>
                            )}
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={(e) => {
                                e.stopPropagation();
                                generateJournalEntry(invoice);
                              }}
                            >
                              <Zap className="h-3 w-3" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Eye className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Invoice Details */}
        <div>
          {selectedInvoice ? (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">
                    {selectedInvoice.invoiceNumber}
                  </CardTitle>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
                <CardDescription>
                  {selectedInvoice.vendor} • {formatDate(selectedInvoice.issueDate)}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Amount */}
                <div className="space-y-2">
                  <h4 className="font-medium text-sm">Amount</h4>
                  <div className="text-2xl font-bold text-green-600">
                    {formatCurrency(selectedInvoice.amount)}
                  </div>
                </div>

                {/* Dates */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <h4 className="font-medium text-sm">Issue Date</h4>
                    <p className="text-sm">{formatDate(selectedInvoice.issueDate)}</p>
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-medium text-sm">Due Date</h4>
                    <p className="text-sm">{formatDate(selectedInvoice.dueDate)}</p>
                  </div>
                </div>

                {/* Line Items */}
                {selectedInvoice.lineItems && (
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm">Line Items</h4>
                    <div className="space-y-2">
                      {selectedInvoice.lineItems.map((item: any, index: number) => (
                        <div key={index} className="flex justify-between text-sm p-2 bg-gray-50 rounded">
                          <span>{item.description}</span>
                          <span className="font-medium">{formatCurrency(item.total)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* AI Processing Info */}
                {selectedInvoice.extractedData && (
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm">AI Processing</h4>
                    <div className="text-sm space-y-1">
                      <div className="flex justify-between">
                        <span>Confidence:</span>
                        <span>{(selectedInvoice.extractedData.confidence * 100).toFixed(1)}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Processing Time:</span>
                        <span>{selectedInvoice.extractedData.processingTime}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="space-y-2 pt-4 border-t">
                  <h4 className="font-medium text-sm">Actions</h4>
                  <div className="flex flex-col space-y-2">
                    {selectedInvoice.status === 'pending' && (
                      <Button 
                        size="sm" 
                        onClick={() => markAsPaid(selectedInvoice.id)}
                        className="justify-start"
                      >
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Mark as Paid
                      </Button>
                    )}
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => generateJournalEntry(selectedInvoice)}
                      className="justify-start"
                    >
                      <Bot className="h-4 w-4 mr-2" />
                      Generate Journal Entry
                    </Button>
                    <Button size="sm" variant="outline" className="justify-start">
                      <Download className="h-4 w-4 mr-2" />
                      Download PDF
                    </Button>
                    <Button size="sm" variant="outline" className="justify-start">
                      <Paperclip className="h-4 w-4 mr-2" />
                      View Attachments
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="p-8 text-center">
                <Receipt className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="font-medium text-gray-900 mb-2">No invoice selected</h3>
                <p className="text-sm text-gray-500">
                  Select an invoice from the list to view details and take actions.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}