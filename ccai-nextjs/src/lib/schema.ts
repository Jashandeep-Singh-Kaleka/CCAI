import { z } from "zod";
import { COMMUNICATION_BUCKETS, INTENT_TYPES, PRIORITY_LEVELS, COMMUNICATION_TYPES } from "./buckets";

// Base schemas
export const EmailSchema = z.object({
  id: z.string(),
  from: z.string().email(),
  to: z.string().email(),
  subject: z.string(),
  body: z.string(),
  timestamp: z.string().datetime(),
  bucket: z.enum([
    COMMUNICATION_BUCKETS.LEADS,
    COMMUNICATION_BUCKETS.INVOICES,
    COMMUNICATION_BUCKETS.DISPATCH,
    COMMUNICATION_BUCKETS.CARRIER_UPDATES,
    COMMUNICATION_BUCKETS.ACCOUNTING,
    COMMUNICATION_BUCKETS.CLAIMS,
    COMMUNICATION_BUCKETS.OTHER
  ]),
  intent: z.enum([
    INTENT_TYPES.RATE_REQUEST,
    INTENT_TYPES.CAPACITY_INQUIRY,
    INTENT_TYPES.QUOTE_FOLLOW_UP,
    INTENT_TYPES.PAYMENT_REMINDER,
    INTENT_TYPES.INVOICE_DISPUTE,
    INTENT_TYPES.PAYMENT_CONFIRMATION,
    INTENT_TYPES.LOAD_UPDATE,
    INTENT_TYPES.PICKUP_CONFIRMATION,
    INTENT_TYPES.DELIVERY_CONFIRMATION,
    INTENT_TYPES.DELAY_NOTIFICATION,
    INTENT_TYPES.AVAILABILITY_UPDATE,
    INTENT_TYPES.RATE_NEGOTIATION,
    INTENT_TYPES.EQUIPMENT_INQUIRY,
    INTENT_TYPES.PAYMENT_INQUIRY,
    INTENT_TYPES.FACTORING_NOTICE,
    INTENT_TYPES.TAX_DOCUMENT,
    INTENT_TYPES.DAMAGE_REPORT,
    INTENT_TYPES.INSURANCE_CLAIM,
    INTENT_TYPES.CARGO_ISSUE
  ]).optional(),
  priority: z.enum([
    PRIORITY_LEVELS.LOW,
    PRIORITY_LEVELS.MEDIUM,
    PRIORITY_LEVELS.HIGH,
    PRIORITY_LEVELS.URGENT
  ]),
  processed: z.boolean().default(false),
  attachments: z.array(z.string()).optional(),
  extractedData: z.record(z.any()).optional()
});

export const CallSchema = z.object({
  id: z.string(),
  from: z.string(),
  to: z.string().optional(),
  duration: z.number(), // in seconds
  timestamp: z.string().datetime(),
  transcript: z.string().optional(),
  summary: z.string().optional(),
  bucket: z.enum([
    COMMUNICATION_BUCKETS.LEADS,
    COMMUNICATION_BUCKETS.INVOICES,
    COMMUNICATION_BUCKETS.DISPATCH,
    COMMUNICATION_BUCKETS.CARRIER_UPDATES,
    COMMUNICATION_BUCKETS.ACCOUNTING,
    COMMUNICATION_BUCKETS.CLAIMS,
    COMMUNICATION_BUCKETS.OTHER
  ]),
  intent: z.enum([
    INTENT_TYPES.RATE_REQUEST,
    INTENT_TYPES.CAPACITY_INQUIRY,
    INTENT_TYPES.QUOTE_FOLLOW_UP,
    INTENT_TYPES.PAYMENT_REMINDER,
    INTENT_TYPES.INVOICE_DISPUTE,
    INTENT_TYPES.PAYMENT_CONFIRMATION,
    INTENT_TYPES.LOAD_UPDATE,
    INTENT_TYPES.PICKUP_CONFIRMATION,
    INTENT_TYPES.DELIVERY_CONFIRMATION,
    INTENT_TYPES.DELAY_NOTIFICATION,
    INTENT_TYPES.AVAILABILITY_UPDATE,
    INTENT_TYPES.RATE_NEGOTIATION,
    INTENT_TYPES.EQUIPMENT_INQUIRY,
    INTENT_TYPES.PAYMENT_INQUIRY,
    INTENT_TYPES.FACTORING_NOTICE,
    INTENT_TYPES.TAX_DOCUMENT,
    INTENT_TYPES.DAMAGE_REPORT,
    INTENT_TYPES.INSURANCE_CLAIM,
    INTENT_TYPES.CARGO_ISSUE
  ]).optional(),
  priority: z.enum([
    PRIORITY_LEVELS.LOW,
    PRIORITY_LEVELS.MEDIUM,
    PRIORITY_LEVELS.HIGH,
    PRIORITY_LEVELS.URGENT
  ]),
  processed: z.boolean().default(false)
});

export const InvoiceSchema = z.object({
  id: z.string(),
  invoiceNumber: z.string(),
  vendor: z.string(),
  amount: z.number().positive(),
  currency: z.string().default("USD"),
  dueDate: z.string().datetime(),
  issueDate: z.string().datetime(),
  status: z.enum(["pending", "paid", "overdue", "disputed"]),
  lineItems: z.array(z.object({
    description: z.string(),
    quantity: z.number(),
    unitPrice: z.number(),
    total: z.number()
  })).optional(),
  extractedData: z.record(z.any()).optional(),
  sourceEmailId: z.string().optional()
});

export const LeadSchema = z.object({
  id: z.string(),
  companyName: z.string(),
  contactName: z.string(),
  email: z.string().email(),
  phone: z.string().optional(),
  origin: z.string(),
  destination: z.string(),
  commodity: z.string(),
  weight: z.number().positive().optional(),
  equipmentType: z.string().optional(),
  rate: z.number().positive().optional(),
  notes: z.string().optional(),
  status: z.enum(["new", "contacted", "quoted", "won", "lost"]),
  priority: z.enum([
    PRIORITY_LEVELS.LOW,
    PRIORITY_LEVELS.MEDIUM,
    PRIORITY_LEVELS.HIGH,
    PRIORITY_LEVELS.URGENT
  ]),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  sourceEmailId: z.string().optional(),
  sourceCallId: z.string().optional()
});

export const JournalEntrySchema = z.object({
  id: z.string(),
  date: z.string().datetime(),
  description: z.string(),
  reference: z.string().optional(),
  entries: z.array(z.object({
    account: z.string(),
    accountNumber: z.string().optional(),
    debit: z.number().optional(),
    credit: z.number().optional(),
    description: z.string().optional()
  })),
  status: z.enum(["draft", "posted", "reversed"]),
  totalDebits: z.number(),
  totalCredits: z.number(),
  sourceInvoiceId: z.string().optional(),
  createdAt: z.string().datetime()
});

// API Response schemas
export const ClassificationResponseSchema = z.object({
  bucket: z.enum([
    COMMUNICATION_BUCKETS.LEADS,
    COMMUNICATION_BUCKETS.INVOICES,
    COMMUNICATION_BUCKETS.DISPATCH,
    COMMUNICATION_BUCKETS.CARRIER_UPDATES,
    COMMUNICATION_BUCKETS.ACCOUNTING,
    COMMUNICATION_BUCKETS.CLAIMS,
    COMMUNICATION_BUCKETS.OTHER
  ]),
  intent: z.enum([
    INTENT_TYPES.RATE_REQUEST,
    INTENT_TYPES.CAPACITY_INQUIRY,
    INTENT_TYPES.QUOTE_FOLLOW_UP,
    INTENT_TYPES.PAYMENT_REMINDER,
    INTENT_TYPES.INVOICE_DISPUTE,
    INTENT_TYPES.PAYMENT_CONFIRMATION,
    INTENT_TYPES.LOAD_UPDATE,
    INTENT_TYPES.PICKUP_CONFIRMATION,
    INTENT_TYPES.DELIVERY_CONFIRMATION,
    INTENT_TYPES.DELAY_NOTIFICATION,
    INTENT_TYPES.AVAILABILITY_UPDATE,
    INTENT_TYPES.RATE_NEGOTIATION,
    INTENT_TYPES.EQUIPMENT_INQUIRY,
    INTENT_TYPES.PAYMENT_INQUIRY,
    INTENT_TYPES.FACTORING_NOTICE,
    INTENT_TYPES.TAX_DOCUMENT,
    INTENT_TYPES.DAMAGE_REPORT,
    INTENT_TYPES.INSURANCE_CLAIM,
    INTENT_TYPES.CARGO_ISSUE
  ]).optional(),
  priority: z.enum([
    PRIORITY_LEVELS.LOW,
    PRIORITY_LEVELS.MEDIUM,
    PRIORITY_LEVELS.HIGH,
    PRIORITY_LEVELS.URGENT
  ]),
  confidence: z.number().min(0).max(1),
  reasoning: z.string().optional()
});

export const BidDraftResponseSchema = z.object({
  content: z.string(),
  suggestedRate: z.number().optional(),
  reasoning: z.string().optional(),
  nextSteps: z.array(z.string()).optional()
});

export const SummarizationResponseSchema = z.object({
  summary: z.string(),
  keyPoints: z.array(z.string()),
  actionItems: z.array(z.string()).optional(),
  urgency: z.enum([
    PRIORITY_LEVELS.LOW,
    PRIORITY_LEVELS.MEDIUM,
    PRIORITY_LEVELS.HIGH,
    PRIORITY_LEVELS.URGENT
  ])
});

// Type exports
export type Email = z.infer<typeof EmailSchema>;
export type Call = z.infer<typeof CallSchema>;
export type Invoice = z.infer<typeof InvoiceSchema>;
export type Lead = z.infer<typeof LeadSchema>;
export type JournalEntry = z.infer<typeof JournalEntrySchema>;
export type ClassificationResponse = z.infer<typeof ClassificationResponseSchema>;
export type BidDraftResponse = z.infer<typeof BidDraftResponseSchema>;
export type SummarizationResponse = z.infer<typeof SummarizationResponseSchema>;