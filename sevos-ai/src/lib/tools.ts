export const CLASSIFICATION_TOOL = {
  name: "classify_communication",
  description: "Classify emails and calls into appropriate buckets for trucking brokerage operations",
  parameters: {
    type: "object",
    properties: {
      bucket: {
        type: "string",
        enum: ["leads", "invoices", "dispatch", "carrier_updates", "accounting", "claims", "other"],
        description: "The primary bucket this communication belongs to"
      },
      intent: {
        type: "string",
        enum: [
          "rate_request", "capacity_inquiry", "quote_follow_up",
          "payment_reminder", "invoice_dispute", "payment_confirmation",
          "load_update", "pickup_confirmation", "delivery_confirmation", "delay_notification",
          "availability_update", "rate_negotiation", "equipment_inquiry", 
          "payment_inquiry", "factoring_notice", "tax_document",
          "damage_report", "insurance_claim", "cargo_issue"
        ],
        description: "The specific intent or purpose of this communication"
      },
      priority: {
        type: "string", 
        enum: ["low", "medium", "high", "urgent"],
        description: "Priority level based on urgency and business impact"
      },
      confidence: {
        type: "number",
        minimum: 0,
        maximum: 1,
        description: "Confidence score for the classification"
      },
      reasoning: {
        type: "string",
        description: "Brief explanation for the classification decision"
      }
    },
    required: ["bucket", "priority", "confidence"]
  }
};

export const BID_DRAFTING_TOOL = {
  name: "draft_bid_response",
  description: "Generate professional bid responses for freight quotes and rate requests",
  parameters: {
    type: "object", 
    properties: {
      content: {
        type: "string",
        description: "The drafted response content"
      },
      suggestedRate: {
        type: "number",
        description: "Suggested rate for the shipment if applicable"
      },
      reasoning: {
        type: "string", 
        description: "Explanation for rate calculation and positioning"
      },
      nextSteps: {
        type: "array",
        items: { type: "string" },
        description: "Recommended follow-up actions"
      }
    },
    required: ["content"]
  }
};

export const INVOICE_EXTRACTION_TOOL = {
  name: "extract_invoice_data",
  description: "Extract structured data from invoice documents and emails",
  parameters: {
    type: "object",
    properties: {
      invoiceNumber: { type: "string" },
      vendor: { type: "string" },
      amount: { type: "number" },
      currency: { type: "string", default: "USD" },
      dueDate: { type: "string", format: "date" },
      issueDate: { type: "string", format: "date" },
      lineItems: {
        type: "array",
        items: {
          type: "object",
          properties: {
            description: { type: "string" },
            quantity: { type: "number" },
            unitPrice: { type: "number" },
            total: { type: "number" }
          }
        }
      }
    },
    required: ["invoiceNumber", "vendor", "amount"]
  }
};

export const JOURNAL_ENTRY_TOOL = {
  name: "suggest_journal_entry",
  description: "Generate journal entry suggestions for accounting integration",
  parameters: {
    type: "object",
    properties: {
      description: { type: "string" },
      reference: { type: "string" },
      entries: {
        type: "array",
        items: {
          type: "object",
          properties: {
            account: { type: "string" },
            accountNumber: { type: "string" },
            debit: { type: "number" },
            credit: { type: "number" },
            description: { type: "string" }
          }
        }
      },
      totalDebits: { type: "number" },
      totalCredits: { type: "number" },
      balanced: { type: "boolean" }
    },
    required: ["description", "entries", "totalDebits", "totalCredits", "balanced"]
  }
};

export const SUMMARIZATION_TOOL = {
  name: "summarize_communication",
  description: "Generate concise summaries of communications with key insights",
  parameters: {
    type: "object",
    properties: {
      summary: { 
        type: "string",
        description: "Brief summary of the communication"
      },
      keyPoints: {
        type: "array", 
        items: { type: "string" },
        description: "Important points extracted from the communication"
      },
      actionItems: {
        type: "array",
        items: { type: "string" },
        description: "Suggested actions based on the communication"
      },
      urgency: {
        type: "string",
        enum: ["low", "medium", "high", "urgent"],
        description: "Assessed urgency level"
      }
    },
    required: ["summary", "keyPoints", "urgency"]
  }
};

export const SEARCH_TOOL = {
  name: "search_knowledge_base",
  description: "Search internal SOPs and knowledge base for relevant information",
  parameters: {
    type: "object",
    properties: {
      query: {
        type: "string", 
        description: "Search query for knowledge base"
      },
      category: {
        type: "string",
        enum: ["sop", "rates", "carriers", "compliance", "general"],
        description: "Category to search within"
      },
      limit: {
        type: "number",
        default: 5,
        description: "Maximum number of results to return"
      }
    },
    required: ["query"]
  }
};