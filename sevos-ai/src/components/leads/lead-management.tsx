"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Users, 
  Search, 
  Plus, 
  Eye,
  Phone,
  Mail,
  MapPin,
  Truck,
  DollarSign,
  Calendar,
  Edit,
  MoreHorizontal,
  Bot,
  Zap,
  Star,
  Clock,
  CheckCircle,
  Target,
  TrendingUp
} from "lucide-react";
import { demoLeads } from "@/lib/demo-data";
import { formatCurrency, formatDate, getRelativeTime } from "@/lib/format";
import { cn } from "@/lib/utils";

const PIPELINE_STAGES = {
  new: { label: "New", color: "bg-blue-100 text-blue-800", icon: Star },
  contacted: { label: "Contacted", color: "bg-yellow-100 text-yellow-800", icon: Phone },
  quoted: { label: "Quoted", color: "bg-purple-100 text-purple-800", icon: DollarSign },
  won: { label: "Won", color: "bg-green-100 text-green-800", icon: CheckCircle },
  lost: { label: "Lost", color: "bg-red-100 text-red-800", icon: Target }
};

export default function LeadManagementComponent() {
  const [leads, setLeads] = useState(demoLeads);
  const [selectedLead, setSelectedLead] = useState<any>(null);
  const [activeStage, setActiveStage] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isGeneratingBid, setIsGeneratingBid] = useState(false);

  const getFilteredLeads = () => {
    let filtered = leads;

    if (activeStage !== "all") {
      filtered = filtered.filter(lead => lead.status === activeStage);
    }

    if (searchQuery) {
      filtered = filtered.filter(lead => 
        lead.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.contactName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.origin.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.destination.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.commodity.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  };

  const getStageCounts = () => {
    return Object.keys(PIPELINE_STAGES).reduce((acc, stage) => {
      acc[stage] = leads.filter(lead => lead.status === stage).length;
      return acc;
    }, {} as Record<string, number>);
  };

  const generateBid = async (lead: any) => {
    setIsGeneratingBid(true);
    
    // Simulate AI bid generation
    setTimeout(() => {
      alert(`AI-generated bid for ${lead.companyName}:\n\nRoute: ${lead.origin} → ${lead.destination}\nRate: ${formatCurrency(lead.rate || 2500)}\nTransit Time: 2-3 days\n\nBid has been drafted and is ready for review.`);
      setIsGeneratingBid(false);
    }, 2000);
  };

  const moveToStage = (leadId: string, newStage: string) => {
    setLeads(prev => prev.map(lead => 
      lead.id === leadId 
        ? { ...lead, status: newStage as any, updatedAt: new Date().toISOString() }
        : lead
    ));
  };

  const createNewLead = () => {
    const newLead = {
      id: `lead-${Date.now()}`,
      companyName: "TechStart Logistics",
      contactName: "Alex Johnson",
      email: "alex@techstart.com",
      phone: "+1-555-0199",
      origin: "Austin, TX",
      destination: "Denver, CO",
      commodity: "Tech Equipment",
      weight: 28000,
      equipmentType: "Dry Van",
      notes: "New tech company needing regular shipping for computer equipment",
      status: "new",
      priority: "medium",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    setLeads(prev => [newLead as any, ...prev]);
  };

  const stageCounts = getStageCounts();
  const totalValue = leads.reduce((sum, lead) => sum + (lead.rate || 0), 0);
  const avgDealSize = totalValue / leads.length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Lead Management</h1>
          <p className="text-gray-600">Track opportunities through your sales pipeline</p>
        </div>
        <Button onClick={createNewLead}>
          <Plus className="h-4 w-4 mr-2" />
          New Lead
        </Button>
      </div>

      {/* Pipeline Overview */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {Object.entries(PIPELINE_STAGES).map(([stage, config]) => {
          const count = stageCounts[stage] || 0;
          const Icon = config.icon;
          return (
            <Card 
              key={stage}
              className={cn(
                "cursor-pointer transition-all hover:shadow-md",
                activeStage === stage ? "ring-2 ring-blue-500" : ""
              )}
              onClick={() => setActiveStage(activeStage === stage ? "all" : stage)}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <Icon className="h-5 w-5 text-gray-600" />
                  <span className="text-2xl font-bold">{count}</span>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">{config.label}</p>
                  <Badge className={cn("text-xs", config.color)} variant="outline">
                    {stage === "quoted" && `$${Math.round(totalValue / 1000)}K total`}
                    {stage === "won" && `$${Math.round(avgDealSize)}K avg`}
                    {stage !== "quoted" && stage !== "won" && `${count} leads`}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Search and Summary */}
      <div className="flex items-center justify-between">
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search leads..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex items-center space-x-4 text-sm text-gray-600">
          <div className="flex items-center space-x-1">
            <TrendingUp className="h-4 w-4" />
            <span>Pipeline Value: {formatCurrency(totalValue)}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Target className="h-4 w-4" />
            <span>Avg Deal: {formatCurrency(avgDealSize)}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Leads List */}
        <div className="lg:col-span-2">
          <div className="space-y-3">
            {getFilteredLeads().map((lead) => {
              const stageConfig = PIPELINE_STAGES[lead.status as keyof typeof PIPELINE_STAGES];
              return (
                <Card 
                  key={lead.id}
                  className={cn(
                    "cursor-pointer transition-all hover:shadow-md",
                    selectedLead?.id === lead.id ? "ring-2 ring-blue-500" : ""
                  )}
                  onClick={() => setSelectedLead(lead)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="font-semibold">{lead.companyName}</h3>
                          <Badge 
                            className={cn("text-xs", stageConfig.color)}
                            variant="outline"
                          >
                            {stageConfig.label}
                          </Badge>
                          <Badge 
                            variant={lead.priority === "high" ? "destructive" : "secondary"}
                            className="text-xs"
                          >
                            {lead.priority}
                          </Badge>
                        </div>
                        
                        <div className="space-y-1 mb-3">
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <span className="flex items-center space-x-1">
                              <Users className="h-3 w-3" />
                              <span>{lead.contactName}</span>
                            </span>
                            <span className="flex items-center space-x-1">
                              <MapPin className="h-3 w-3" />
                              <span>{lead.origin} → {lead.destination}</span>
                            </span>
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <span className="flex items-center space-x-1">
                              <Truck className="h-3 w-3" />
                              <span>{lead.commodity}</span>
                            </span>
                            {lead.weight && (
                              <span>{lead.weight.toLocaleString()} lbs</span>
                            )}
                            {lead.rate && (
                              <span className="flex items-center space-x-1">
                                <DollarSign className="h-3 w-3" />
                                <span>{formatCurrency(lead.rate)}</span>
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500">
                            Updated {getRelativeTime(lead.updatedAt)}
                          </span>
                          <div className="flex items-center space-x-1">
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={(e) => {
                                e.stopPropagation();
                                generateBid(lead);
                              }}
                              disabled={isGeneratingBid}
                            >
                              {isGeneratingBid ? (
                                <Bot className="h-3 w-3 animate-pulse" />
                              ) : (
                                <Zap className="h-3 w-3" />
                              )}
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

        {/* Lead Details */}
        <div>
          {selectedLead ? (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">
                    {selectedLead.companyName}
                  </CardTitle>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
                <CardDescription>
                  {selectedLead.contactName} • Created {formatDate(selectedLead.createdAt)}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Contact Info */}
                <div className="space-y-2">
                  <h4 className="font-medium text-sm">Contact Information</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex items-center space-x-2">
                      <Mail className="h-3 w-3 text-gray-400" />
                      <span>{selectedLead.email}</span>
                    </div>
                    {selectedLead.phone && (
                      <div className="flex items-center space-x-2">
                        <Phone className="h-3 w-3 text-gray-400" />
                        <span>{selectedLead.phone}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Shipment Details */}
                <div className="space-y-2">
                  <h4 className="font-medium text-sm">Shipment Details</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-3 w-3 text-gray-400" />
                      <span>{selectedLead.origin} → {selectedLead.destination}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Truck className="h-3 w-3 text-gray-400" />
                      <span>{selectedLead.commodity}</span>
                    </div>
                    {selectedLead.weight && (
                      <div className="flex items-center space-x-2">
                        <span className="text-gray-400">Weight:</span>
                        <span>{selectedLead.weight.toLocaleString()} lbs</span>
                      </div>
                    )}
                    {selectedLead.equipmentType && (
                      <div className="flex items-center space-x-2">
                        <span className="text-gray-400">Equipment:</span>
                        <span>{selectedLead.equipmentType}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Notes */}
                {selectedLead.notes && (
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm">Notes</h4>
                    <p className="text-sm text-gray-600">{selectedLead.notes}</p>
                  </div>
                )}

                {/* Stage Actions */}
                <div className="space-y-2 pt-4 border-t">
                  <h4 className="font-medium text-sm">Pipeline Actions</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {Object.entries(PIPELINE_STAGES).map(([stage, config]) => {
                      if (stage === selectedLead.status) return null;
                      return (
                        <Button
                          key={stage}
                          size="sm"
                          variant="outline"
                          onClick={() => moveToStage(selectedLead.id, stage)}
                          className="text-xs"
                        >
                          Move to {config.label}
                        </Button>
                      );
                    })}
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="space-y-2">
                  <h4 className="font-medium text-sm">Quick Actions</h4>
                  <div className="flex flex-col space-y-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => generateBid(selectedLead)}
                      disabled={isGeneratingBid}
                      className="justify-start"
                    >
                      <Bot className="h-4 w-4 mr-2" />
                      {isGeneratingBid ? "Generating..." : "AI Draft Bid"}
                    </Button>
                    <Button size="sm" variant="outline" className="justify-start">
                      <Phone className="h-4 w-4 mr-2" />
                      Schedule Call
                    </Button>
                    <Button size="sm" variant="outline" className="justify-start">
                      <Mail className="h-4 w-4 mr-2" />
                      Send Email
                    </Button>
                    <Button size="sm" variant="outline" className="justify-start">
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Lead
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="p-8 text-center">
                <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="font-medium text-gray-900 mb-2">No lead selected</h3>
                <p className="text-sm text-gray-500">
                  Select a lead from the pipeline to view details and take actions.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}