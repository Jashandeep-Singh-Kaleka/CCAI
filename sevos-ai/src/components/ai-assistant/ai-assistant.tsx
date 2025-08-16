"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Bot, 
  Send, 
  Copy, 
  RefreshCw,
  Zap,
  FileText,
  DollarSign,
  Truck,
  MapPin,
  Clock,
  User,
  Sparkles,
  MessageSquare,
  Lightbulb,
  Target
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  type?: "text" | "bid" | "analysis";
}

const QUICK_PROMPTS = [
  {
    icon: <DollarSign className="h-4 w-4" />,
    title: "Rate Analysis",
    prompt: "What should I charge for a 45,000 lb electronics load from Chicago to Denver?",
    category: "pricing"
  },
  {
    icon: <Truck className="h-4 w-4" />,
    title: "Carrier Search",
    prompt: "Find me reliable carriers for temperature-controlled shipments from Miami to Boston",
    category: "operations"
  },
  {
    icon: <FileText className="h-4 w-4" />,
    title: "Draft Email",
    prompt: "Draft a professional follow-up email for a quote I sent 3 days ago",
    category: "communication"
  },
  {
    icon: <MapPin className="h-4 w-4" />,
    title: "Route Optimization",
    prompt: "What's the most efficient route for a multi-stop delivery from Texas to California?",
    category: "logistics"
  },
  {
    icon: <Target className="h-4 w-4" />,
    title: "Market Analysis",
    prompt: "Analyze current market conditions for flatbed transportation in the Southeast",
    category: "analysis"
  },
  {
    icon: <Lightbulb className="h-4 w-4" />,
    title: "Problem Solving",
    prompt: "My carrier broke down 200 miles from delivery. What are my options?",
    category: "support"
  }
];

export default function AIAssistantComponent() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "👋 Hello! I'm your AI assistant for SEVOS.AI. I can help you with:\n\n• Rate calculations and market analysis\n• Bid drafting for email and calls\n• Carrier recommendations\n• Route optimization\n• Invoice processing\n• Operational problem-solving\n\nWhat can I help you with today?",
      timestamp: new Date(),
      type: "text"
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSendMessage = async (message?: string) => {
    const messageText = message || inputMessage.trim();
    if (!messageText || isLoading) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content: messageText,
      timestamp: new Date(),
      type: "text"
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    try {
      // Simulate AI processing
      await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
      
      const response = await fetch("/api/draft-bid", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: messageText,
          context: {
            customerName: "Demo Customer",
            origin: "Chicago, IL",
            destination: "Denver, CO",
            commodity: "Electronics",
            weight: 45000
          },
          responseType: "email"
        })
      });

      let aiResponseContent;
      let messageType: "text" | "bid" | "analysis" = "text";

      if (response.ok) {
        const data = await response.json();
        aiResponseContent = data.content;
        if (messageText.toLowerCase().includes("bid") || messageText.toLowerCase().includes("rate") || messageText.toLowerCase().includes("quote")) {
          messageType = "bid";
        }
      } else {
        // Fallback response
        aiResponseContent = generateFallbackResponse(messageText);
      }

      const aiMessage: Message = {
        id: `ai-${Date.now()}`,
        role: "assistant",
        content: aiResponseContent,
        timestamp: new Date(),
        type: messageType
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error("AI Assistant error:", error);
      const errorMessage: Message = {
        id: `error-${Date.now()}`,
        role: "assistant",
        content: "I'm sorry, I encountered an error processing your request. Please try again.",
        timestamp: new Date(),
        type: "text"
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const generateFallbackResponse = (input: string): string => {
    const lowerInput = input.toLowerCase();
    
    if (lowerInput.includes("rate") || lowerInput.includes("price") || lowerInput.includes("cost")) {
      return `For rate calculations, I'd consider:\n\n• **Distance & Route**: Longer distances and complex routes increase costs\n• **Commodity Type**: High-value or specialized cargo commands premium rates\n• **Market Conditions**: Current supply/demand in your lane\n• **Fuel Costs**: Current diesel prices and surcharges\n• **Equipment Type**: Dry van, reefer, flatbed pricing varies\n\nBased on current market conditions, a typical Chicago-Denver dry van load (45K lbs) ranges from $2,800-$3,500 depending on urgency and equipment availability.\n\nWould you like me to analyze a specific shipment?`;
    }
    
    if (lowerInput.includes("carrier") || lowerInput.includes("truck")) {
      return `For carrier selection, I recommend:\n\n🏆 **Top Criteria**:\n• Safety rating (Satisfactory or better)\n• Insurance coverage ($1M+ cargo)\n• On-time performance (95%+)\n• Equipment availability\n• Geographic coverage\n\n📋 **Vetting Process**:\n• Check FMCSA safety scores\n• Verify insurance certificates\n• Review customer references\n• Confirm equipment specifications\n\nFor your specific needs, I can help identify carriers in our network with the right equipment and lane experience.`;
    }
    
    if (lowerInput.includes("email") || lowerInput.includes("draft") || lowerInput.includes("write")) {
      return `I can help draft professional communications:\n\n📧 **Email Types**:\n• Quote responses with competitive rates\n• Follow-up messages for pending opportunities\n• Carrier instructions and confirmations\n• Customer updates and notifications\n\n✍️ **Best Practices**:\n• Clear subject lines\n• Professional tone\n• Specific details (rates, times, requirements)\n• Clear next steps\n• Contact information\n\nWhat type of email would you like me to help draft?`;
    }
    
    if (lowerInput.includes("problem") || lowerInput.includes("delay") || lowerInput.includes("issue")) {
      return `Let me help solve your operational challenge:\n\n🚨 **Common Solutions**:\n• **Breakdown**: Find backup carrier, customer notification, ETA updates\n• **Weather Delays**: Proactive communication, revised schedules\n• **Load Rejection**: Alternative carriers, rate adjustments\n• **Documentation Issues**: Digital solutions, expedited processing\n\n📞 **Immediate Actions**:\n1. Assess situation severity\n2. Communicate with all parties\n3. Identify alternative solutions\n4. Document for future prevention\n\nTell me more about the specific issue you're facing?`;
    }
    
    return `I understand you're asking about "${input}". As your AI assistant for trucking brokerage operations, I can help with:\n\n🎯 **Core Services**:\n• Rate analysis and pricing strategy\n• Carrier sourcing and vetting\n• Professional communication drafting\n• Route optimization\n• Market intelligence\n• Problem resolution\n\nCould you provide more specific details about what you need help with?`;
  };

  const copyToClipboard = (content: string) => {
    navigator.clipboard.writeText(content);
  };

  const clearChat = () => {
    setMessages([
      {
        id: "welcome",
        role: "assistant",
        content: "Chat cleared. How can I assist you today?",
        timestamp: new Date(),
        type: "text"
      }
    ]);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">AI Assistant</h1>
          <p className="text-gray-600">GPT-4 powered assistance for trucking brokerage operations</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            <Bot className="h-3 w-3 mr-1" />
            GPT-4 Turbo
          </Badge>
          <Button variant="outline" size="sm" onClick={clearChat}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Clear Chat
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Chat Interface */}
        <div className="lg:col-span-3">
          <Card className="h-[600px] flex flex-col">
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <Sparkles className="h-4 w-4 text-white" />
                </div>
                <div>
                  <CardTitle className="text-lg">SEVOS.AI Assistant</CardTitle>
                  <CardDescription>Specialized in trucking brokerage operations</CardDescription>
                </div>
              </div>
            </CardHeader>

            {/* Messages */}
            <CardContent className="flex-1 overflow-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "flex",
                    message.role === "user" ? "justify-end" : "justify-start"
                  )}
                >
                  <div
                    className={cn(
                      "max-w-[80%] rounded-lg px-4 py-2 text-sm",
                      message.role === "user"
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-900"
                    )}
                  >
                    <div className="flex items-start space-x-2">
                      {message.role === "assistant" && (
                        <Bot className="h-4 w-4 mt-0.5 text-blue-600 flex-shrink-0" />
                      )}
                      {message.role === "user" && (
                        <User className="h-4 w-4 mt-0.5 text-blue-100 flex-shrink-0" />
                      )}
                      <div className="flex-1">
                        <div className="whitespace-pre-wrap">{message.content}</div>
                        {message.role === "assistant" && message.type === "bid" && (
                          <div className="mt-2 pt-2 border-t border-gray-200">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => copyToClipboard(message.content)}
                              className="h-7 text-xs"
                            >
                              <Copy className="h-3 w-3 mr-1" />
                              Copy Bid
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 rounded-lg px-4 py-2 text-sm">
                    <div className="flex items-center space-x-2">
                      <Bot className="h-4 w-4 text-blue-600 animate-pulse" />
                      <span>AI is thinking...</span>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </CardContent>

            {/* Input */}
            <div className="p-4 border-t">
              <div className="flex space-x-2">
                <Input
                  placeholder="Ask me about rates, carriers, routes, or any trucking question..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  disabled={isLoading}
                  className="flex-1"
                />
                <Button 
                  onClick={() => handleSendMessage()}
                  disabled={!inputMessage.trim() || isLoading}
                  size="sm"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center">
                <Zap className="h-5 w-5 mr-2" />
                Quick Prompts
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {QUICK_PROMPTS.map((prompt, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => handleSendMessage(prompt.prompt)}
                  disabled={isLoading}
                  className="w-full justify-start text-left h-auto p-3"
                >
                  <div className="flex items-start space-x-2">
                    {prompt.icon}
                    <div>
                      <div className="font-medium text-xs">{prompt.title}</div>
                      <div className="text-xs text-gray-500 mt-1">
                        {prompt.prompt.length > 50 
                          ? `${prompt.prompt.slice(0, 50)}...` 
                          : prompt.prompt
                        }
                      </div>
                    </div>
                  </div>
                </Button>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center">
                <MessageSquare className="h-5 w-5 mr-2" />
                Tips
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="space-y-2">
                <h4 className="font-medium">Ask me about:</h4>
                <ul className="space-y-1 text-xs text-gray-600">
                  <li>• Current market rates by lane</li>
                  <li>• Carrier recommendations</li>
                  <li>• Professional email drafting</li>
                  <li>• Route optimization</li>
                  <li>• Problem resolution</li>
                  <li>• Industry best practices</li>
                </ul>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-medium">Example queries:</h4>
                <ul className="space-y-1 text-xs text-gray-600">
                  <li>• &quot;Draft a quote for electronics from Chicago to Denver&quot;</li>
                  <li>• &quot;What&apos;s a fair rate for reefer loads in Texas?&quot;</li>
                  <li>• &quot;My carrier is delayed, what should I tell the customer?&quot;</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}