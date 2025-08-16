import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { chat } from "@/lib/llm";
import { SummarizationResponseSchema } from "@/lib/schema";

export const runtime = 'edge';

const SummarizeRequestSchema = z.object({
  content: z.string().min(1),
  type: z.enum(["email", "call", "document"]).default("email"),
  context: z.string().optional()
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { content, type, context } = SummarizeRequestSchema.parse(body);

    const systemPrompt = `You are an AI assistant specialized in summarizing communications for trucking brokerage operations.

Create concise, actionable summaries that include:
- Brief summary (1-2 sentences)
- Key points (3-5 bullet points)
- Action items (if any)
- Urgency assessment (low, medium, high, urgent)

Focus on business-critical information like rates, routes, deadlines, problems, and opportunities.`;

    const userPrompt = `Summarize this ${type}:

${context ? `Context: ${context}` : ''}

Content:
${content}`;

    const response = await chat([
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt }
    ], {
      temperature: 0.3,
      maxTokens: 400
    });

    let parsedResponse;
    try {
      parsedResponse = JSON.parse(response);
    } catch (e) {
      // Create structured response from text
      const lines = response.split('\n').filter(line => line.trim());
      parsedResponse = {
        summary: lines[0] || "Summary not available",
        keyPoints: lines.slice(1, 4),
        actionItems: [],
        urgency: "medium"
      };
    }

    const validatedResponse = SummarizationResponseSchema.parse(parsedResponse);
    return NextResponse.json(validatedResponse);

  } catch (error) {
    console.error("Summarization error:", error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid input", details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Summarization failed" },
      { status: 500 }
    );
  }
}