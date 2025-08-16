import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { chat } from "@/lib/llm";
import { ClassificationResponseSchema } from "@/lib/schema";

// Mark as edge runtime for low latency
export const runtime = 'edge';

const ClassifyRequestSchema = z.object({
  content: z.string().min(1),
  type: z.enum(["email", "call"]).default("email"),
  subject: z.string().optional(),
  from: z.string().optional()
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { content, type, subject, from } = ClassifyRequestSchema.parse(body);

    const systemPrompt = `You are an AI assistant specialized in classifying communications for a trucking brokerage company.

Your task is to analyze emails, calls, and other communications and classify them into the appropriate business buckets:

BUCKETS:
- leads: New business opportunities, rate requests, capacity inquiries
- invoices: Payment requests, billing documents, invoice disputes  
- dispatch: Load updates, pickup/delivery confirmations, driver communications
- carrier_updates: Carrier availability, rate negotiations, equipment inquiries
- accounting: Payment confirmations, factoring notices, financial documents
- claims: Damage reports, insurance claims, cargo issues
- other: Everything else that doesn't fit the above categories

PRIORITY LEVELS:
- urgent: Immediate action required (delays, emergencies, time-sensitive)
- high: Important business impact (hot leads, payment issues, critical updates)  
- medium: Standard business communications requiring timely response
- low: Informational or routine communications

Respond with a JSON object containing: bucket, intent (optional), priority, confidence (0-1), and reasoning.`;

    const userPrompt = `Please classify this ${type}:

${subject ? `Subject: ${subject}` : ''}
${from ? `From: ${from}` : ''}

Content:
${content}`;

    const response = await chat([
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt }
    ]);

    // Parse the JSON response
    let parsedResponse;
    try {
      parsedResponse = JSON.parse(response);
    } catch (e) {
      // Fallback parsing with regex if JSON is malformed
      const bucketMatch = response.match(/"bucket":\s*"([^"]+)"/);
      const priorityMatch = response.match(/"priority":\s*"([^"]+)"/);
      const confidenceMatch = response.match(/"confidence":\s*([0-9.]+)/);
      
      parsedResponse = {
        bucket: bucketMatch?.[1] || "other",
        priority: priorityMatch?.[1] || "medium", 
        confidence: parseFloat(confidenceMatch?.[1] || "0.8"),
        reasoning: "Classified using fallback parsing"
      };
    }

    // Validate response against schema
    const validatedResponse = ClassificationResponseSchema.parse(parsedResponse);

    return NextResponse.json(validatedResponse);

  } catch (error) {
    console.error("Classification error:", error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid input", details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Classification failed" },
      { status: 500 }
    );
  }
}