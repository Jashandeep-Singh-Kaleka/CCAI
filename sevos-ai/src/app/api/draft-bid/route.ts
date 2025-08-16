import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { chat } from "@/lib/llm";
import { BidDraftResponseSchema } from "@/lib/schema";

export const runtime = 'edge';

const BidDraftRequestSchema = z.object({
  content: z.string().min(1),
  context: z.object({
    customerName: z.string().optional(),
    origin: z.string().optional(),
    destination: z.string().optional(),
    commodity: z.string().optional(),
    weight: z.number().optional(),
    equipmentType: z.string().optional(),
    timeline: z.string().optional()
  }).optional(),
  responseType: z.enum(["email", "call_script"]).default("email"),
  tone: z.enum(["professional", "friendly", "urgent"]).default("professional")
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { content, context, responseType, tone } = BidDraftRequestSchema.parse(body);

    const systemPrompt = `You are an expert freight broker assistant specializing in drafting professional responses to rate requests and capacity inquiries.

GUIDELINES:
- Always be professional and responsive
- Include specific details when available (rates, transit times, equipment)
- Highlight competitive advantages (experience, reliability, tracking)
- Provide clear next steps and contact information
- Use current market knowledge for rate suggestions
- Address customer concerns proactively

RATE CALCULATION FACTORS:
- Distance and route complexity
- Commodity type and special requirements  
- Current fuel costs and market conditions
- Equipment availability and carrier relationships
- Seasonal demand fluctuations
- Customer relationship and volume potential

For email responses: Use professional email format with clear structure
For call scripts: Provide talking points and key messages in bullet format

Generate a professional ${responseType} response that addresses the inquiry effectively.`;

    const contextInfo = context ? `
Customer: ${context.customerName || 'N/A'}
Route: ${context.origin || 'N/A'} → ${context.destination || 'N/A'}  
Commodity: ${context.commodity || 'N/A'}
Weight: ${context.weight || 'N/A'} lbs
Equipment: ${context.equipmentType || 'N/A'}
Timeline: ${context.timeline || 'N/A'}
` : '';

    const userPrompt = `Please draft a ${responseType} response to this freight inquiry:

${contextInfo}

Original Message:
${content}

Response Type: ${responseType}
Tone: ${tone}`;

    const response = await chat([
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt }
    ], {
      temperature: 0.7,
      maxTokens: 800
    });

    // Extract rate if mentioned in response
    const rateMatch = response.match(/\$([0-9,]+(?:\.[0-9]{2})?)/);
    const suggestedRate = rateMatch ? parseFloat(rateMatch[1].replace(/,/g, '')) : undefined;

    const result = {
      content: response,
      suggestedRate,
      reasoning: "Generated based on current market conditions and customer requirements",
      nextSteps: [
        "Send quote to customer",
        "Follow up within 24 hours", 
        "Check carrier availability",
        "Prepare load confirmation documents"
      ]
    };

    const validatedResponse = BidDraftResponseSchema.parse(result);
    return NextResponse.json(validatedResponse);

  } catch (error) {
    console.error("Bid drafting error:", error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid input", details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Bid drafting failed" },
      { status: 500 }
    );
  }
}