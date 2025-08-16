export const COMMUNICATION_BUCKETS = {
  LEADS: "leads",
  INVOICES: "invoices", 
  DISPATCH: "dispatch",
  CARRIER_UPDATES: "carrier_updates",
  ACCOUNTING: "accounting",
  CLAIMS: "claims",
  OTHER: "other"
} as const;

export type CommunicationBucket = typeof COMMUNICATION_BUCKETS[keyof typeof COMMUNICATION_BUCKETS];

export const BUCKET_LABELS = {
  [COMMUNICATION_BUCKETS.LEADS]: "Leads",
  [COMMUNICATION_BUCKETS.INVOICES]: "Invoices",
  [COMMUNICATION_BUCKETS.DISPATCH]: "Dispatch",
  [COMMUNICATION_BUCKETS.CARRIER_UPDATES]: "Carrier Updates",
  [COMMUNICATION_BUCKETS.ACCOUNTING]: "Accounting", 
  [COMMUNICATION_BUCKETS.CLAIMS]: "Claims",
  [COMMUNICATION_BUCKETS.OTHER]: "Other"
} as const;

export const INTENT_TYPES = {
  // Lead intents
  RATE_REQUEST: "rate_request",
  CAPACITY_INQUIRY: "capacity_inquiry",
  QUOTE_FOLLOW_UP: "quote_follow_up",
  
  // Invoice intents
  PAYMENT_REMINDER: "payment_reminder",
  INVOICE_DISPUTE: "invoice_dispute",
  PAYMENT_CONFIRMATION: "payment_confirmation",
  
  // Dispatch intents
  LOAD_UPDATE: "load_update",
  PICKUP_CONFIRMATION: "pickup_confirmation",
  DELIVERY_CONFIRMATION: "delivery_confirmation",
  DELAY_NOTIFICATION: "delay_notification",
  
  // Carrier intents
  AVAILABILITY_UPDATE: "availability_update",
  RATE_NEGOTIATION: "rate_negotiation",
  EQUIPMENT_INQUIRY: "equipment_inquiry",
  
  // Accounting intents
  PAYMENT_INQUIRY: "payment_inquiry",
  FACTORING_NOTICE: "factoring_notice",
  TAX_DOCUMENT: "tax_document",
  
  // Claims intents
  DAMAGE_REPORT: "damage_report",
  INSURANCE_CLAIM: "insurance_claim",
  CARGO_ISSUE: "cargo_issue"
} as const;

export type IntentType = typeof INTENT_TYPES[keyof typeof INTENT_TYPES];

export const PRIORITY_LEVELS = {
  LOW: "low",
  MEDIUM: "medium", 
  HIGH: "high",
  URGENT: "urgent"
} as const;

export type PriorityLevel = typeof PRIORITY_LEVELS[keyof typeof PRIORITY_LEVELS];

export const COMMUNICATION_TYPES = {
  EMAIL: "email",
  CALL: "call",
  SMS: "sms"
} as const;

export type CommunicationType = typeof COMMUNICATION_TYPES[keyof typeof COMMUNICATION_TYPES];