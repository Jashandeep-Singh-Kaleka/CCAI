"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { 
  Mail, 
  Phone, 
  Search, 
  Filter, 
  Bot, 
  Zap,
  Eye,
  MoreHorizontal,
  Plus,
  AlertTriangle,
  Clock,
  CheckCircle,
  Users,
  Receipt,
  Truck,
  DollarSign,
  AlertCircle,
  FileText
} from "lucide-react";
import { demoEmails, demoCalls } from "@/lib/demo-data";
import { BUCKET_LABELS, COMMUNICATION_BUCKETS } from "@/lib/buckets";
import { formatDateTime, getRelativeTime, truncateText } from "@/lib/format";
import { cn } from "@/lib/utils";

export default function InboxComponent() {
  const [emails, setEmails] = useState(demoEmails);
  const [calls, setCalls] = useState(demoCalls);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [activeBucket, setActiveBucket] = useState("all");
  const [isClassifying, setIsClassifying] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const allCommunications = [...emails, ...calls].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  const getFilteredCommunications = () => {
    let filtered = allCommunications;

    if (activeBucket !== "all") {
      filtered = filtered.filter(item => item.bucket === activeBucket);
    }

    if (searchQuery) {
      filtered = filtered.filter(item => 
        ('subject' in item && item.subject?.toLowerCase().includes(searchQuery.toLowerCase())) ||
        ('summary' in item && item.summary?.toLowerCase().includes(searchQuery.toLowerCase())) ||
        ('body' in item && item.body?.toLowerCase().includes(searchQuery.toLowerCase())) ||
        ('transcript' in item && item.transcript?.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    return filtered;
  };

  const getBucketIcon = (bucket: string) => {
    switch (bucket) {
      case COMMUNICATION_BUCKETS.LEADS: return <Users className="h-4 w-4" />;
      case COMMUNICATION_BUCKETS.INVOICES: return <Receipt className="h-4 w-4" />;
      case COMMUNICATION_BUCKETS.DISPATCH: return <Truck className="h-4 w-4" />;
      case COMMUNICATION_BUCKETS.CARRIER_UPDATES: return <Truck className="h-4 w-4" />;
      case COMMUNICATION_BUCKETS.ACCOUNTING: return <DollarSign className="h-4 w-4" />;
      case COMMUNICATION_BUCKETS.CLAIMS: return <AlertCircle className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent": return "destructive";
      case "high": return "default";
      case "medium": return "secondary";
      case "low": return "outline";
      default: return "secondary";
    }
  };

  const getBucketColor = (bucket: string) => {
    switch (bucket) {
      case COMMUNICATION_BUCKETS.LEADS: return "bg-green-100 text-green-800";
      case COMMUNICATION_BUCKETS.INVOICES: return "bg-blue-100 text-blue-800";
      case COMMUNICATION_BUCKETS.DISPATCH: return "bg-orange-100 text-orange-800";
      case COMMUNICATION_BUCKETS.CARRIER_UPDATES: return "bg-purple-100 text-purple-800";
      case COMMUNICATION_BUCKETS.ACCOUNTING: return "bg-yellow-100 text-yellow-800";
      case COMMUNICATION_BUCKETS.CLAIMS: return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const bucketCounts = Object.values(COMMUNICATION_BUCKETS).reduce((acc, bucket) => {
    acc[bucket] = allCommunications.filter(item => item.bucket === bucket).length;
    return acc;
  }, {} as Record<string, number>);

  const simulateNewEmail = async () => {
    setIsClassifying(true);
    
    const newEmail = {
      id: `email-${Date.now()}`,
      from: "newcustomer@freshproduce.com",
      to: "demo@sevos.ai",
      subject: "Urgent: Reefer Transport Needed - Miami to Boston",
      body: `Hi there,

We have an urgent shipment of fresh produce that needs to move from Miami, FL to Boston, MA. The load is 48,000 lbs of temperature-controlled produce and needs to be picked up tomorrow morning.

Details:
- Pickup: Miami, FL (33125)
- Delivery: Boston, MA (02108)  
- Weight: 48,000 lbs
- Temperature: 34-36°F
- Pickup Date: Tomorrow 6 AM
- Delivery Date: Day after tomorrow by 10 AM

This is time-sensitive and we need a reliable carrier with reefer experience. What rates can you provide?

Thanks,
Maria Gonzalez
Fresh Produce Express`,
      timestamp: new Date().toISOString(),
      bucket: COMMUNICATION_BUCKETS.LEADS,
      intent: "rate_request",
      priority: "urgent",
      processed: false
    };

    // Simulate AI classification delay
    setTimeout(() => {
      setEmails(prev => [newEmail as any, ...prev]);
      setIsClassifying(false);
    }, 2000);
  };

  const simulateNewCall = async () => {
    setIsClassifying(true);

    const newCall = {
      id: `call-${Date.now()}`,
      from: "+1-555-0987",
      to: "+1-555-SEVOS",
      duration: 300,
      timestamp: new Date().toISOString(),
      transcript: "Customer called regarding delayed delivery. Load was supposed to arrive yesterday but carrier had mechanical issues. Customer is upset and demanding compensation. Needs immediate resolution and new carrier assignment.",
      summary: "Delay complaint - mechanical issues, customer demanding compensation",
      bucket: COMMUNICATION_BUCKETS.CLAIMS,
      intent: "cargo_issue",
      priority: "urgent",
      processed: false
    };

    setTimeout(() => {
      setCalls(prev => [newCall as any, ...prev]);
      setIsClassifying(false);
    }, 1500);
  };

  const createLead = (item: any) => {
    // This would normally create a lead in the system
    alert(`Creating lead from ${item.type === 'email' ? 'email' : 'call'}: ${item.subject || item.summary}`);
  };

  const processInvoice = (item: any) => {
    // This would normally extract invoice data
    alert(`Processing invoice from: ${item.subject || item.summary}`);
  };

  const openClaim = (item: any) => {
    // This would normally open a claim
    alert(`Opening claim for: ${item.subject || item.summary}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Smart Inbox</h1>
          <p className="text-gray-600">AI-powered communication sorting and management</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button 
            onClick={simulateNewEmail}
            disabled={isClassifying}
            variant="outline"
            size="sm"
          >
            {isClassifying ? <Bot className="h-4 w-4 animate-pulse mr-2" /> : <Mail className="h-4 w-4 mr-2" />}
            Simulate Email
          </Button>
          <Button 
            onClick={simulateNewCall}
            disabled={isClassifying}
            variant="outline"
            size="sm"
          >
            {isClassifying ? <Bot className="h-4 w-4 animate-pulse mr-2" /> : <Phone className="h-4 w-4 mr-2" />}
            Simulate Call
          </Button>
        </div>
      </div>

      {isClassifying && (
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Bot className="h-5 w-5 text-blue-600 animate-pulse" />
              <span className="text-blue-800 font-medium">AI is classifying new communication...</span>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Search and Filters */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search communications..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline" size="sm">
          <Filter className="h-4 w-4 mr-2" />
          Filters
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Inbox List */}
        <div className="lg:col-span-2">
          <Tabs value={activeBucket} onValueChange={setActiveBucket}>
            <TabsList className="grid grid-cols-4 lg:grid-cols-8 mb-4">
              <TabsTrigger value="all" className="text-xs">
                All ({allCommunications.length})
              </TabsTrigger>
              {Object.entries(BUCKET_LABELS).map(([key, label]) => (
                <TabsTrigger key={key} value={key} className="text-xs">
                  {label} ({bucketCounts[key] || 0})
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value={activeBucket}>
              <div className="space-y-2">
                {getFilteredCommunications().map((item) => (
                  <Card 
                    key={item.id}
                    className={cn(
                      "cursor-pointer transition-all hover:shadow-md",
                      selectedItem?.id === item.id ? "ring-2 ring-blue-500" : "",
                      !item.processed ? "bg-blue-50/50" : ""
                    )}
                    onClick={() => setSelectedItem(item)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            {'from' in item ? (
                              <Mail className="h-4 w-4 text-blue-600" />
                            ) : (
                              <Phone className="h-4 w-4 text-green-600" />
                            )}
                            <span className="font-medium text-sm">
                              {item.from}
                            </span>
                            <Badge 
                              variant={getPriorityColor(item.priority)}
                              className="text-xs"
                            >
                              {item.priority}
                            </Badge>
                            {!item.processed && (
                              <Badge variant="secondary" className="text-xs">
                                New
                              </Badge>
                            )}
                          </div>
                          
                          <h3 className="font-semibold mb-1">
                            {'subject' in item ? item.subject : 'summary' in item ? item.summary : 'No subject'}
                          </h3>
                          
                          <p className="text-sm text-gray-600 mb-2">
                            {truncateText(('body' in item ? item.body : 'transcript' in item ? item.transcript : "") || "", 120)}
                          </p>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <Badge 
                                className={cn("text-xs", getBucketColor(item.bucket))}
                                variant="outline"
                              >
                                {getBucketIcon(item.bucket)}
                                <span className="ml-1">{BUCKET_LABELS[item.bucket as keyof typeof BUCKET_LABELS]}</span>
                              </Badge>
                            </div>
                            <span className="text-xs text-gray-500">
                              {getRelativeTime(item.timestamp)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Communication Detail */}
        <div>
          {selectedItem ? (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">
                    {selectedItem.subject || selectedItem.summary}
                  </CardTitle>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
                <CardDescription>
                  From: {selectedItem.from} • {formatDateTime(selectedItem.timestamp)}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Badge 
                    className={cn("text-xs", getBucketColor(selectedItem.bucket))}
                    variant="outline"
                  >
                    {getBucketIcon(selectedItem.bucket)}
                    <span className="ml-1">{BUCKET_LABELS[selectedItem.bucket as keyof typeof BUCKET_LABELS]}</span>
                  </Badge>
                  <Badge variant={getPriorityColor(selectedItem.priority)}>
                    {selectedItem.priority}
                  </Badge>
                </div>

                <div className="prose prose-sm max-w-none">
                  <p className="whitespace-pre-wrap text-sm">
                    {selectedItem.body || selectedItem.transcript}
                  </p>
                </div>

                {/* Quick Actions */}
                <div className="space-y-2 pt-4 border-t">
                  <h4 className="font-medium text-sm">Quick Actions</h4>
                  <div className="flex flex-col space-y-2">
                    {selectedItem.bucket === COMMUNICATION_BUCKETS.LEADS && (
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => createLead(selectedItem)}
                        className="justify-start"
                      >
                        <Users className="h-4 w-4 mr-2" />
                        Create Lead
                      </Button>
                    )}
                    {selectedItem.bucket === COMMUNICATION_BUCKETS.INVOICES && (
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => processInvoice(selectedItem)}
                        className="justify-start"
                      >
                        <Receipt className="h-4 w-4 mr-2" />
                        Process Invoice
                      </Button>
                    )}
                    {selectedItem.bucket === COMMUNICATION_BUCKETS.CLAIMS && (
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => openClaim(selectedItem)}
                        className="justify-start"
                      >
                        <AlertTriangle className="h-4 w-4 mr-2" />
                        Open Claim
                      </Button>
                    )}
                    <Button size="sm" variant="outline" className="justify-start">
                      <Eye className="h-4 w-4 mr-2" />
                      Mark as Read
                    </Button>
                    <Button size="sm" variant="outline" className="justify-start">
                      <Zap className="h-4 w-4 mr-2" />
                      AI Draft Response
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="p-8 text-center">
                <Mail className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="font-medium text-gray-900 mb-2">No communication selected</h3>
                <p className="text-sm text-gray-500">
                  Select a communication from the list to view details and take actions.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}