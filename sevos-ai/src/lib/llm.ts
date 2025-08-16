import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "demo-key"
});

export interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export async function chat(messages: ChatMessage[], options?: {
  model?: string;
  temperature?: number;
  maxTokens?: number;
  stream?: boolean;
}): Promise<string> {
  // In demo mode, return mock responses
  if (process.env.OPENAI_API_KEY === "demo-key" || !process.env.OPENAI_API_KEY) {
    return getMockResponse(messages);
  }

  try {
    const completion = await openai.chat.completions.create({
      model: options?.model || "gpt-4",
      messages: messages,
      temperature: options?.temperature || 0.7,
      max_tokens: options?.maxTokens || 1000,
      stream: options?.stream || false
    });

    if (options?.stream) {
      throw new Error("Streaming not supported in this implementation");
    }

    return (completion as any).choices[0]?.message?.content || "No response generated";
  } catch (error) {
    console.error("OpenAI API error:", error);
    throw new Error("Failed to generate response");
  }
}

function getMockResponse(messages: ChatMessage[]): string {
  const lastMessage = messages[messages.length - 1];
  const content = lastMessage.content.toLowerCase();

  // Mock responses based on content patterns
  if (content.includes("classify") || content.includes("bucket")) {
    return JSON.stringify({
      bucket: "leads",
      intent: "rate_request", 
      priority: "high",
      confidence: 0.95,
      reasoning: "Email contains rate request for freight shipment with urgency indicators"
    });
  }

  if (content.includes("draft") || content.includes("bid")) {
    return `Thank you for your interest in our transportation services.

Based on your shipment requirements:
- Origin: Chicago, IL
- Destination: Denver, CO  
- Commodity: Electronics
- Weight: 45,000 lbs

We can provide competitive service at $3,200 for this load, which includes:
✓ Experienced driver with electronics handling experience
✓ Real-time tracking and updates
✓ $100K cargo insurance coverage
✓ Pickup within 24 hours

This rate is valid for 48 hours. We have excellent availability for next week and can guarantee on-time delivery.

Please let me know if you'd like to proceed or if you have any questions.

Best regards,
CCAI Logistics Team`;
  }

  if (content.includes("extract") || content.includes("invoice")) {
    return JSON.stringify({
      invoiceNumber: "EF-2024-1156",
      vendor: "Elite Freight LLC",
      amount: 2450.00,
      dueDate: "2024-02-15",
      lineItems: [
        {
          description: "Transportation: Dallas, TX to Houston, TX",
          amount: 2450.00
        }
      ]
    });
  }

  if (content.includes("journal") || content.includes("accounting")) {
    return JSON.stringify({
      entries: [
        {
          account: "Accounts Payable",
          accountNumber: "2000",
          credit: 2450.00,
          description: "Payment to Elite Freight LLC"
        },
        {
          account: "Cash - Operating", 
          accountNumber: "1000",
          debit: 2450.00,
          description: "Payment to Elite Freight LLC"
        }
      ],
      totalDebits: 2450.00,
      totalCredits: 2450.00,
      balanced: true
    });
  }

  if (content.includes("summarize")) {
    return JSON.stringify({
      summary: "Customer inquiry about freight capacity and rates for regular shipping lane",
      keyPoints: [
        "Needs regular weekly service between LA and Phoenix",
        "Volume: 3-4 loads per week",
        "Requesting competitive pricing",
        "Interested in dedicated service"
      ],
      actionItems: [
        "Prepare competitive rate quote",
        "Schedule follow-up call",
        "Check carrier availability for dedicated service"
      ],
      urgency: "high"
    });
  }

  // Default response
  return "I understand you're asking about trucking brokerage operations. For demo purposes, I can help with classification, bid drafting, invoice processing, and other logistics tasks. What specific assistance do you need?";
}