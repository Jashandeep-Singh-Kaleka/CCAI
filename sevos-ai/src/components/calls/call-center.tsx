"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { 
  Phone, 
  PhoneCall, 
  PhoneOff, 
  Play, 
  Pause, 
  StopCircle, 
  Clock, 
  User, 
  Calendar,
  Search,
  Filter,
  Download,
  MessageSquare,
  Bot,
  Star,
  MoreHorizontal,
  Volume2,
  FileText,
  TrendingUp,
  AlertCircle,
  Mic,
  MicOff,
  Square,
  Circle,
  Activity
} from "lucide-react";
import { cn } from "@/lib/utils";
import { demoCalls } from "@/lib/demo-data";

interface CallRecord {
  id: string;
  customerName: string;
  phoneNumber: string;
  duration: string;
  timestamp: Date;
  direction: "inbound" | "outbound";
  status: "completed" | "missed" | "in-progress";
  transcript?: string;
  summary?: string;
  sentiment?: "positive" | "neutral" | "negative";
  actionItems?: string[];
  tags?: string[];
  recording?: string;
}

const DEMO_CALLS: CallRecord[] = [
  {
    id: "CALL-001",
    customerName: "Sarah Chen - MegaCorp Industries",
    phoneNumber: "+1 (555) 234-5678",
    duration: "8m 45s",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    direction: "inbound",
    status: "completed",
    transcript: `Sarah: Hi, this is Sarah from MegaCorp. I need a quote for shipping electronics from Chicago to Denver.

Agent: Hi Sarah! I'd be happy to help you with that. Can you tell me more about the shipment details?

Sarah: We have 15 pallets of high-value electronics, about 45,000 pounds total. We need it delivered by Friday.

Agent: Perfect. For high-value electronics on that route, I can offer $3,200 for Friday delivery. This includes full cargo insurance and white glove service.

Sarah: That sounds reasonable. Can you send me the formal quote?

Agent: Absolutely! I'll send that over within the hour. Is this email still current: sarah.chen@megacorp.com?

Sarah: Yes, that's correct. Thanks for the quick response!

Agent: You're welcome! I'll get that quote to you shortly.`,
    summary: "Rate request for electronics shipment Chicago to Denver. Customer accepted $3,200 quote for Friday delivery.",
    sentiment: "positive",
    actionItems: [
      "Send formal quote to sarah.chen@megacorp.com",
      "Include cargo insurance details",
      "Follow up on Friday for booking confirmation"
    ],
    tags: ["electronics", "high-value", "chicago-denver", "quote-requested"]
  },
  {
    id: "CALL-002",
    customerName: "Mike Johnson - FastTrack Logistics",
    phoneNumber: "+1 (555) 987-6543",
    duration: "12m 20s",
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
    direction: "outbound",
    status: "completed",
    transcript: `Agent: Hi Mike, this is Jennifer from SEVOS.AI. I wanted to follow up on the Dallas to Phoenix route we discussed.

Mike: Oh yes! Thanks for calling back. We're still very interested in that partnership.

Agent: Great! I've been working on the rates and I think we can offer very competitive pricing. For standard dry van loads, we're looking at $1,800-$2,200 depending on weight and urgency.

Mike: That's definitely in our range. What about volume commitments?

Agent: For regular customers like FastTrack, we can guarantee 10-15 loads per month and offer a 5% discount for bookings over 20 loads.

Mike: Perfect. Can we set up a contract review meeting next week?

Agent: Absolutely! I'll send you our standard carrier agreement and we can discuss terms. How's Tuesday at 2 PM?

Mike: Tuesday works great. I'll have our legal team review the contract beforehand.

Agent: Perfect! I'll send everything over today.`,
    summary: "Partnership discussion with FastTrack Logistics. Agreed on rate structure and scheduled contract review meeting for Tuesday.",
    sentiment: "positive",
    actionItems: [
      "Send carrier agreement to Mike Johnson",
      "Schedule contract review meeting for Tuesday 2 PM",
      "Prepare volume discount proposal"
    ],
    tags: ["partnership", "carrier-agreement", "dallas-phoenix", "volume-discount"]
  },
  {
    id: "CALL-003",
    customerName: "Unknown Caller",
    phoneNumber: "+1 (555) 123-4567",
    duration: "2m 15s",
    timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
    direction: "inbound",
    status: "missed",
    sentiment: "neutral",
    tags: ["missed-call", "follow-up-needed"]
  },
  {
    id: "CALL-004",
    customerName: "Lisa Rodriguez - TransWest Shipping",
    phoneNumber: "+1 (555) 456-7890",
    duration: "15m 30s",
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
    direction: "inbound",
    status: "completed",
    transcript: `Lisa: Hi, this is Lisa from TransWest. We have an urgent shipment that needs to go out today.

Agent: Hi Lisa! What can we help you with?

Lisa: We have a broke down truck in Oklahoma with a full load that needs to get to Miami by tomorrow morning. It's pharmaceuticals, so it's temperature controlled.

Agent: That's definitely urgent. Let me check our available carriers for reefer equipment on that route.

Lisa: The load is worth about $500,000 so we need a reliable carrier with full insurance.

Agent: I understand. For such high-value pharma with same-day pickup and next-day delivery, we're looking at emergency rates. I can get a carrier there within 3 hours for $4,500.

Lisa: That's higher than normal but given the urgency and value, we'll approve it. Can you guarantee the delivery time?

Agent: Yes, our carrier partners on this route have 99% on-time performance for emergency loads. I'll get you the carrier details and tracking information within the hour.

Lisa: Perfect. Please send everything to my email and call me once pickup is confirmed.

Agent: Will do! I'll have updates for you shortly.`,
    summary: "Emergency reefer load Oklahoma to Miami. High-value pharmaceuticals. Approved $4,500 for same-day pickup and next-day delivery.",
    sentiment: "neutral",
    actionItems: [
      "Dispatch carrier for immediate pickup in Oklahoma",
      "Send carrier details and tracking to Lisa",
      "Call Lisa to confirm pickup completion",
      "Monitor delivery progress for next-day arrival"
    ],
    tags: ["emergency", "pharmaceuticals", "reefer", "high-value", "oklahoma-miami"]
  }
];

export default function CallCenterComponent() {
  const [selectedCall, setSelectedCall] = useState<CallRecord | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [isPlaying, setIsPlaying] = useState(false);
  const [showNewCallDialog, setShowNewCallDialog] = useState(false);
  
  // Voice recording states
  const [isRecording, setIsRecording] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [interimTranscript, setInterimTranscript] = useState("");
  const [callDuration, setCallDuration] = useState(0);
  const [callStartTime, setCallStartTime] = useState<Date | null>(null);
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [callNotes, setCallNotes] = useState("");
  const [currentSentiment, setCurrentSentiment] = useState<"positive" | "neutral" | "negative">("neutral");
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([]);
  const [speakerTranscript, setSpeakerTranscript] = useState<{speaker: string, text: string, timestamp: Date}[]>([]);
  
  const recognitionRef = useRef<any>(null);
  const callTimerRef = useRef<NodeJS.Timeout | null>(null);
  const sentimentTimerRef = useRef<NodeJS.Timeout | null>(null);

  const filteredCalls = DEMO_CALLS.filter(call => {
    const matchesSearch = call.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         call.phoneNumber.includes(searchTerm);
    const matchesFilter = filterStatus === "all" || call.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const handleGenerateSummary = async (callId: string) => {
    // Simulate AI summary generation
    const call = DEMO_CALLS.find(c => c.id === callId);
    if (call && call.transcript) {
      // In real implementation, this would call the summarize API
      console.log("Generating summary for call:", callId);
    }
  };

  const handleCallAction = (action: string, callId?: string) => {
    console.log(`Call action: ${action}`, callId);
    // Simulate call actions
  };

  // Voice recording functions
  useEffect(() => {
    if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-US';
      
      recognitionRef.current.onresult = (event: any) => {
        let finalTranscript = '';
        let interimTranscript = '';
        
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript + ' ';
          } else {
            interimTranscript += transcript;
          }
        }
        
        if (finalTranscript) {
          setTranscript(prev => prev + finalTranscript);
          
          // Add to speaker transcript (assuming user is speaking)
          setSpeakerTranscript(prev => [...prev, {
            speaker: "Agent",
            text: finalTranscript.trim(),
            timestamp: new Date()
          }]);
          
          // Analyze sentiment and generate AI suggestions
          analyzeSentiment(finalTranscript);
          generateAISuggestions(finalTranscript);
        }
        setInterimTranscript(interimTranscript);
      };
      
      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };
      
      recognitionRef.current.onend = () => {
        if (isRecording) {
          recognitionRef.current.start();
        }
      };
    }
    
    return () => {
      if (callTimerRef.current) {
        clearInterval(callTimerRef.current);
      }
    };
  }, [isRecording]);

  const startCall = async () => {
    if (!customerPhone.trim()) {
      alert('Please enter a customer phone number');
      return;
    }

    // Request microphone permission
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
    } catch (error) {
      alert('Microphone access is required for voice transcription. Please allow microphone access and try again.');
      return;
    }
    
    setIsRecording(true);
    setIsListening(true);
    setCallStartTime(new Date());
    setTranscript("");
    setInterimTranscript("");
    setCallDuration(0);
    setSpeakerTranscript([]);
    setCurrentSentiment("neutral");
    setAiSuggestions(["Welcome the customer warmly", "Ask how you can help today", "Listen actively to their needs"]);
    
    // Generate demo customer data
    generateCustomerData();
    
    // Start call timer
    callTimerRef.current = setInterval(() => {
      setCallDuration(prev => prev + 1);
    }, 1000);
    
    // Start speech recognition
    if (recognitionRef.current) {
      recognitionRef.current.start();
    }
  };

  const endCall = () => {
    setIsRecording(false);
    setIsListening(false);
    
    // Stop call timer
    if (callTimerRef.current) {
      clearInterval(callTimerRef.current);
      callTimerRef.current = null;
    }
    
    // Stop speech recognition
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    
    // Save call record (in real app, this would save to database)
    const newCall: CallRecord = {
      id: `CALL-${Date.now()}`,
      customerName: customerName || `Customer ${customerPhone}`,
      phoneNumber: customerPhone,
      duration: formatDuration(callDuration),
      timestamp: callStartTime || new Date(),
      direction: "outbound",
      status: "completed",
      transcript: transcript.trim(),
      summary: "Live call completed - summary will be generated",
      sentiment: "neutral",
      actionItems: [],
      tags: ["live-call", "recorded"]
    };
    
    console.log('Call completed:', newCall);
    alert('Call completed and saved!');
    
    // Reset form
    setCustomerPhone("");
    setCustomerName("");
    setShowNewCallDialog(false);
  };

  const toggleMute = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      recognitionRef.current?.start();
      setIsListening(true);
    }
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs.toString().padStart(2, '0')}s`;
  };

  const analyzeSentiment = (text: string) => {
    // Simple sentiment analysis based on keywords
    const positiveWords = ['good', 'great', 'excellent', 'happy', 'satisfied', 'perfect', 'wonderful', 'amazing', 'thank'];
    const negativeWords = ['bad', 'terrible', 'awful', 'angry', 'frustrated', 'disappointed', 'problem', 'issue', 'wrong', 'hate'];
    
    const words = text.toLowerCase().split(' ');
    const positiveCount = words.filter(word => positiveWords.some(pos => word.includes(pos))).length;
    const negativeCount = words.filter(word => negativeWords.some(neg => word.includes(neg))).length;
    
    if (positiveCount > negativeCount) {
      setCurrentSentiment("positive");
    } else if (negativeCount > positiveCount) {
      setCurrentSentiment("negative");
    } else {
      setCurrentSentiment("neutral");
    }
  };

  const generateAISuggestions = (text: string) => {
    // Generate contextual AI suggestions based on conversation content
    const suggestions: string[] = [];
    const lowerText = text.toLowerCase();
    
    if (lowerText.includes('rate') || lowerText.includes('quote') || lowerText.includes('price')) {
      suggestions.push("Suggest: 'Let me check our current rates for that route and get back to you with a competitive quote.'");
      suggestions.push("Offer: 'Would you like me to include cargo insurance in the quote?'");
    }
    
    if (lowerText.includes('delay') || lowerText.includes('late') || lowerText.includes('problem')) {
      suggestions.push("Apologize: 'I sincerely apologize for the inconvenience this has caused.'");
      suggestions.push("Solution: 'Let me immediately contact our dispatch team to get you an update.'");
    }
    
    if (lowerText.includes('thank') || lowerText.includes('appreciate')) {
      suggestions.push("Respond: 'You're very welcome! We appreciate your business.'");
      suggestions.push("Follow-up: 'Is there anything else I can help you with today?'");
    }
    
    if (lowerText.includes('emergency') || lowerText.includes('urgent')) {
      suggestions.push("Priority: 'I'm marking this as urgent priority and will handle it immediately.'");
      suggestions.push("Action: 'Let me connect you with our emergency dispatch team right away.'");
    }
    
    if (suggestions.length === 0) {
      suggestions.push("Ask: 'Can you provide more details about your shipment requirements?'");
      suggestions.push("Clarify: 'What's the timeline for this delivery?'");
    }
    
    setAiSuggestions(suggestions.slice(0, 3)); // Limit to 3 suggestions
  };

  const generateCustomerData = () => {
    // Generate demo customer data when call starts
    const demoCustomers = [
      {
        name: "Sarah Chen",
        email: "sarah.chen@megacorp.com",
        account: "MC001234",
        company: "MegaCorp Industries"
      },
      {
        name: "Mike Rodriguez",
        email: "mike.r@fasttrack.com",
        account: "FT005678",
        company: "FastTrack Logistics"
      },
      {
        name: "Jennifer Lee",
        email: "j.lee@freshfoods.com",
        account: "FF009876",
        company: "Fresh Foods Distribution"
      }
    ];
    
    const randomCustomer = demoCustomers[Math.floor(Math.random() * demoCustomers.length)];
    setCustomerName(randomCustomer.name);
    setCustomerEmail(randomCustomer.email);
    setAccountNumber(randomCustomer.account);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Call Center</h1>
          <p className="text-gray-600">Call transcripts, recordings, and communication history</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Calls
          </Button>
          <Button size="sm" onClick={() => setShowNewCallDialog(true)}>
            <PhoneCall className="h-4 w-4 mr-2" />
            New Call
          </Button>
        </div>
      </div>

      {/* Call Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Calls Today</p>
                <p className="text-2xl font-bold">27</p>
              </div>
              <Phone className="h-8 w-8 text-blue-600" />
            </div>
            <p className="text-sm text-green-600 mt-1">+15% from yesterday</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg Call Duration</p>
                <p className="text-2xl font-bold">8m 32s</p>
              </div>
              <Clock className="h-8 w-8 text-green-600" />
            </div>
            <p className="text-sm text-blue-600 mt-1">-2m improvement</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Success Rate</p>
                <p className="text-2xl font-bold">94%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-600" />
            </div>
            <p className="text-sm text-purple-600 mt-1">Above target</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Missed Calls</p>
                <p className="text-2xl font-bold">3</p>
              </div>
              <AlertCircle className="h-8 w-8 text-orange-600" />
            </div>
            <p className="text-sm text-orange-600 mt-1">Need follow-up</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Call List */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Recent Calls</CardTitle>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex space-x-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search calls..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex space-x-1">
                {["all", "completed", "missed", "in-progress"].map((status) => (
                  <Button
                    key={status}
                    variant={filterStatus === status ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFilterStatus(status)}
                    className="capitalize text-xs"
                  >
                    {status.replace("-", " ")}
                  </Button>
                ))}
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="max-h-[600px] overflow-auto">
                {filteredCalls.map((call) => (
                  <div
                    key={call.id}
                    onClick={() => setSelectedCall(call)}
                    className={cn(
                      "p-4 border-b cursor-pointer hover:bg-gray-50 transition-colors",
                      selectedCall?.id === call.id && "bg-blue-50 border-blue-200"
                    )}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <p className="font-medium text-sm">{call.customerName}</p>
                          <Badge 
                            variant={
                              call.status === "completed" ? "default" :
                              call.status === "missed" ? "destructive" : "secondary"
                            }
                            className="text-xs"
                          >
                            {call.status}
                          </Badge>
                        </div>
                        <p className="text-xs text-gray-600">{call.phoneNumber}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <div className="flex items-center space-x-1">
                            {call.direction === "inbound" ? (
                              <Phone className="h-3 w-3 text-green-600" />
                            ) : (
                              <PhoneCall className="h-3 w-3 text-blue-600" />
                            )}
                            <span className="text-xs text-gray-500">{call.duration}</span>
                          </div>
                          <span className="text-xs text-gray-400">
                            {call.timestamp.toLocaleTimeString()}
                          </span>
                        </div>
                      </div>
                      {call.sentiment && (
                        <div className={cn(
                          "w-2 h-2 rounded-full mt-1",
                          call.sentiment === "positive" ? "bg-green-400" :
                          call.sentiment === "negative" ? "bg-red-400" : "bg-gray-400"
                        )} />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Call Details */}
        <div className="lg:col-span-2">
          {selectedCall ? (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center space-x-2">
                      <span>{selectedCall.customerName}</span>
                      <Badge 
                        variant={
                          selectedCall.status === "completed" ? "default" :
                          selectedCall.status === "missed" ? "destructive" : "secondary"
                        }
                      >
                        {selectedCall.status}
                      </Badge>
                    </CardTitle>
                    <CardDescription>
                      {selectedCall.phoneNumber} • {selectedCall.duration} • {selectedCall.timestamp.toLocaleString()}
                    </CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    {selectedCall.transcript && (
                      <>
                        <Button variant="outline" size="sm">
                          <Volume2 className="h-4 w-4 mr-2" />
                          Play Recording
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleGenerateSummary(selectedCall.id)}
                        >
                          <Bot className="h-4 w-4 mr-2" />
                          AI Summary
                        </Button>
                      </>
                    )}
                    <Button variant="outline" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Sentiment & Tags */}
                {(selectedCall.sentiment || selectedCall.tags) && (
                  <div className="flex items-center space-x-4">
                    {selectedCall.sentiment && (
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium">Sentiment:</span>
                        <Badge 
                          variant={
                            selectedCall.sentiment === "positive" ? "default" :
                            selectedCall.sentiment === "negative" ? "destructive" : "secondary"
                          }
                          className="capitalize"
                        >
                          {selectedCall.sentiment}
                        </Badge>
                      </div>
                    )}
                    {selectedCall.tags && selectedCall.tags.length > 0 && (
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium">Tags:</span>
                        <div className="flex flex-wrap gap-1">
                          {selectedCall.tags.map((tag, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Summary */}
                {selectedCall.summary && (
                  <div>
                    <h4 className="font-medium mb-2 flex items-center">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Call Summary
                    </h4>
                    <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">
                      {selectedCall.summary}
                    </p>
                  </div>
                )}

                {/* Action Items */}
                {selectedCall.actionItems && selectedCall.actionItems.length > 0 && (
                  <div>
                    <h4 className="font-medium mb-2 flex items-center">
                      <FileText className="h-4 w-4 mr-2" />
                      Action Items
                    </h4>
                    <ul className="space-y-1">
                      {selectedCall.actionItems.map((item, index) => (
                        <li key={index} className="text-sm flex items-start space-x-2">
                          <span className="text-blue-600 mt-1">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Transcript */}
                {selectedCall.transcript ? (
                  <div>
                    <h4 className="font-medium mb-2 flex items-center">
                      <Volume2 className="h-4 w-4 mr-2" />
                      Call Transcript
                    </h4>
                    <div className="bg-gray-50 p-4 rounded-lg max-h-96 overflow-auto">
                      <div className="whitespace-pre-wrap text-sm font-mono">
                        {selectedCall.transcript}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <PhoneOff className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p>No transcript available for this call</p>
                    {selectedCall.status === "missed" && (
                      <Button size="sm" className="mt-2">
                        <PhoneCall className="h-4 w-4 mr-2" />
                        Call Back
                      </Button>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="p-12 text-center">
                <Phone className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <h3 className="text-lg font-medium mb-2">Select a call to view details</h3>
                <p className="text-gray-600">Choose a call from the list to see transcript, summary, and action items</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* New Call Dialog */}
      {showNewCallDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className={`w-full ${isRecording ? 'max-w-7xl h-full overflow-auto' : 'max-w-2xl'} mx-4 bg-white`}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center">
                    <PhoneCall className="h-5 w-5 mr-2" />
                    {isRecording ? "Call In Progress" : "New Call"}
                  </CardTitle>
                  <CardDescription>
                    {isRecording ? "Live call with voice transcription" : "Start a new call with live transcription"}
                  </CardDescription>
                </div>
                {!isRecording && (
                  <Button variant="ghost" onClick={() => setShowNewCallDialog(false)}>
                    ✕
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {!isRecording ? (
                // Call Setup Form
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Customer Name (Optional)</label>
                    <Input
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="Enter customer name..."
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Phone Number *</label>
                    <Input
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder="+1 (555) 123-4567"
                      className="w-full"
                    />
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="flex items-start space-x-3">
                      <Mic className="h-5 w-5 text-blue-600 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-blue-900">Voice Transcription Ready</h4>
                        <p className="text-sm text-blue-700 mt-1">
                          This demo will use your browser&apos;s speech recognition to create a live transcript of your conversation.
                          Make sure to allow microphone access when prompted.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-3">
                    <Button onClick={startCall} className="flex-1" disabled={!customerPhone.trim()}>
                      <PhoneCall className="h-4 w-4 mr-2" />
                      Start Call
                    </Button>
                    <Button variant="outline" onClick={() => setShowNewCallDialog(false)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                // Active Call Interface - Enhanced Layout
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-7xl">
                  {/* Left Panel - Customer Details */}
                  <div className="lg:col-span-1 space-y-4">
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg">Customer Details</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <label className="text-sm font-medium text-gray-600">Customer Name</label>
                          <p className="font-medium">{customerName || "Unknown Customer"}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-600">Phone Number</label>
                          <p className="font-medium">{customerPhone}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-600">Email</label>
                          <p className="font-medium text-blue-600">{customerEmail || "Not provided"}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-600">Account Number</label>
                          <p className="font-medium">{accountNumber || "New Customer"}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-600">Call Duration</label>
                          <p className="font-medium text-lg font-mono">{formatDuration(callDuration)}</p>
                        </div>
                        
                        {/* Call Controls */}
                        <div className="pt-4 border-t">
                          <div className="flex items-center justify-center space-x-4">
                            <Button
                              variant={isListening ? "default" : "outline"}
                              size="lg"
                              onClick={toggleMute}
                              className="rounded-full w-12 h-12"
                              title={isListening ? "Mute Microphone" : "Unmute Microphone"}
                            >
                              {isListening ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
                            </Button>
                            <Button
                              variant="destructive"
                              size="lg"
                              onClick={endCall}
                              className="rounded-full w-12 h-12"
                              title="End Call"
                            >
                              <PhoneOff className="h-5 w-5" />
                            </Button>
                          </div>
                          <div className="flex items-center justify-center mt-2 space-x-2">
                            <div className={`w-2 h-2 rounded-full ${isRecording ? 'bg-red-500 animate-pulse' : 'bg-gray-400'}`} />
                            <span className="text-sm text-gray-600">
                              {isRecording ? 'Recording' : 'Not Recording'}
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Customer Sentiment */}
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg">Customer Sentiment</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center space-x-3">
                          <div className="flex-1">
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className={`h-2 rounded-full transition-all duration-500 ${
                                  currentSentiment === 'positive' ? 'bg-green-500 w-4/5' :
                                  currentSentiment === 'negative' ? 'bg-red-500 w-1/5' :
                                  'bg-yellow-500 w-1/2'
                                }`}
                              />
                            </div>
                            <div className="flex justify-between text-xs text-gray-500 mt-1">
                              <span>Negative</span>
                              <span>Neutral</span>
                              <span>Positive</span>
                            </div>
                          </div>
                          <div className={`w-3 h-3 rounded-full ${
                            currentSentiment === 'positive' ? 'bg-green-500' :
                            currentSentiment === 'negative' ? 'bg-red-500' :
                            'bg-yellow-500'
                          }`} />
                        </div>
                        <p className="text-sm text-gray-600 mt-2 capitalize">
                          Current mood: {currentSentiment}
                        </p>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Center Panel - Call Transcription */}
                  <div className="lg:col-span-1">
                    <Card className="h-full">
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">Call Transcription</CardTitle>
                          <div className="flex items-center space-x-2">
                            <div className={`w-2 h-2 rounded-full ${isListening ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`} />
                            <span className="text-sm text-gray-600">
                              {isListening ? 'Listening...' : 'Muted'}
                            </span>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="bg-gray-50 border rounded-lg p-4 h-96 overflow-auto">
                          {speakerTranscript.length > 0 ? (
                            <div className="space-y-3">
                              {speakerTranscript.map((entry, index) => (
                                <div key={index} className="flex space-x-3">
                                  <div className="flex-shrink-0">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${
                                      entry.speaker === 'Agent' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                                    }`}>
                                      {entry.speaker === 'Agent' ? 'A' : 'C'}
                                    </div>
                                  </div>
                                  <div className="flex-1">
                                    <div className="flex items-center space-x-2 mb-1">
                                      <span className="font-medium text-sm">{entry.speaker}</span>
                                      <span className="text-xs text-gray-500">
                                        {entry.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                      </span>
                                    </div>
                                    <p className="text-sm text-gray-700">{entry.text}</p>
                                  </div>
                                </div>
                              ))}
                              {interimTranscript && (
                                <div className="flex space-x-3">
                                  <div className="flex-shrink-0">
                                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium bg-blue-100 text-blue-800">
                                      A
                                    </div>
                                  </div>
                                  <div className="flex-1">
                                    <div className="flex items-center space-x-2 mb-1">
                                      <span className="font-medium text-sm">Agent</span>
                                      <span className="text-xs text-gray-500">Now</span>
                                    </div>
                                    <p className="text-sm text-gray-500 italic">{interimTranscript}</p>
                                  </div>
                                </div>
                              )}
                            </div>
                          ) : (
                            <div className="text-center text-gray-400 py-8">
                              <Activity className="h-8 w-8 mx-auto mb-2 opacity-50" />
                              <p>Start speaking to see live transcription...</p>
                              <p className="text-xs mt-1">Make sure your microphone is enabled</p>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Right Panel - AI Assistant */}
                  <div className="lg:col-span-1">
                    <Card className="h-full">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg flex items-center">
                          <Bot className="h-5 w-5 mr-2 text-blue-600" />
                          LISA AI Assistant
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="bg-blue-50 p-3 rounded-lg">
                          <p className="text-sm text-blue-800 font-medium">💡 AI Suggestions</p>
                        </div>
                        
                        <div className="space-y-2 max-h-80 overflow-auto">
                          {aiSuggestions.map((suggestion, index) => (
                            <div key={index} className="bg-white border border-blue-200 rounded-lg p-3 hover:bg-blue-50 transition-colors cursor-pointer">
                              <p className="text-sm text-gray-700">{suggestion}</p>
                            </div>
                          ))}
                        </div>

                        {/* Call Notes */}
                        <div className="pt-4 border-t">
                          <label className="block text-sm font-medium mb-2">Call Notes</label>
                          <Textarea
                            value={callNotes}
                            onChange={(e) => setCallNotes(e.target.value)}
                            placeholder="Add notes about this call..."
                            className="w-full h-24"
                          />
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}