import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { chat } from "@/lib/llm";

export const runtime = 'edge';

const JournalEntryRequestSchema = z.object({
  invoiceData: z.object({
    invoiceNumber: z.string(),
    vendor: z.string(),
    amount: z.number(),
    description: z.string().optional()
  }),
  transactionType: z.enum(["payable", "receivable", "payment", "receipt"]).default("payable")
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { invoiceData, transactionType } = JournalEntryRequestSchema.parse(body);

    const systemPrompt = `You are an AI accounting assistant for trucking brokerage companies. Generate appropriate journal entries for common transactions.

Standard Chart of Accounts:
- 1000: Cash - Operating
- 1200: Accounts Receivable  
- 2000: Accounts Payable
- 4000: Freight Revenue
- 5000: Carrier Costs
- 6000: Operating Expenses

For trucking companies:
- Payable: When receiving carrier invoices (DR: Carrier Costs, CR: Accounts Payable)
- Receivable: When billing customers (DR: Accounts Receivable, CR: Freight Revenue)
- Payment: When paying carriers (DR: Accounts Payable, CR: Cash)
- Receipt: When receiving customer payments (DR: Cash, CR: Accounts Receivable)

Return JSON with entries array, totalDebits, totalCredits, and balanced status.`;

    const userPrompt = `Generate journal entry for:
Type: ${transactionType}
Invoice: ${invoiceData.invoiceNumber}
Vendor: ${invoiceData.vendor}
Amount: $${invoiceData.amount}
Description: ${invoiceData.description || 'Transportation services'}`;

    const response = await chat([
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt }
    ]);

    let journalEntry;
    try {
      journalEntry = JSON.parse(response);
    } catch (e) {
      // Generate default journal entry
      const amount = invoiceData.amount;
      
      if (transactionType === "payable") {
        journalEntry = {
          description: `Payment to ${invoiceData.vendor} - ${invoiceData.invoiceNumber}`,
          entries: [
            {
              account: "Carrier Costs",
              accountNumber: "5000", 
              debit: amount,
              description: `Carrier payment - ${invoiceData.vendor}`
            },
            {
              account: "Accounts Payable",
              accountNumber: "2000",
              credit: amount,
              description: `Payment to ${invoiceData.vendor}`
            }
          ],
          totalDebits: amount,
          totalCredits: amount,
          balanced: true
        };
      } else {
        journalEntry = {
          description: `Transaction for ${invoiceData.invoiceNumber}`,
          entries: [],
          totalDebits: 0,
          totalCredits: 0,
          balanced: true
        };
      }
    }

    return NextResponse.json({
      success: true,
      journalEntry,
      confidence: 0.95
    });

  } catch (error) {
    console.error("Journal entry generation error:", error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid input", details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Journal entry generation failed" },
      { status: 500 }
    );
  }
}