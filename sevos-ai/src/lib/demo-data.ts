import { Email, Call, Invoice, Lead, JournalEntry } from "./schema";
import { COMMUNICATION_BUCKETS, INTENT_TYPES, PRIORITY_LEVELS } from "./buckets";

export const demoEmails: Email[] = [
  {
    id: "email-1",
    from: "sarah.johnson@megacorp.com",
    to: "demo@sevos.ai",
    subject: "Rate Request: Chicago to Denver - Electronics Load",
    body: "Hi there,\n\nWe have a high-value electronics shipment from Chicago, IL to Denver, CO that needs to move next week. The load is 45,000 lbs and requires white glove service. Can you provide a competitive rate for pickup on Monday?\n\nThanks,\nSarah Johnson\nMegaCorp Industries",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
    bucket: COMMUNICATION_BUCKETS.LEADS,
    intent: INTENT_TYPES.RATE_REQUEST,
    priority: PRIORITY_LEVELS.HIGH,
    processed: false
  },
  {
    id: "email-2", 
    from: "billing@elitefreight.com",
    to: "demo@sevos.ai",
    subject: "Invoice #EF-2024-1156 - Load Confirmation",
    body: "Please find attached invoice #EF-2024-1156 for load delivered on January 15th.\n\nAmount: $2,450.00\nLoad ID: LD-456789\nRoute: Dallas, TX to Houston, TX\nPayment terms: Net 30\n\nThank you for your business.",
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(), // 4 hours ago
    bucket: COMMUNICATION_BUCKETS.INVOICES,
    intent: INTENT_TYPES.PAYMENT_REMINDER,
    priority: PRIORITY_LEVELS.MEDIUM,
    processed: false,
    attachments: ["invoice-ef-2024-1156.pdf"]
  },
  {
    id: "email-3",
    from: "dispatch@truckline.com", 
    to: "demo@sevos.ai",
    subject: "Load Update: Delayed pickup due to weather",
    body: "Load ID: LD-789123\nOriginal pickup: 8:00 AM\nRevised pickup: 12:00 PM\n\nDelay due to severe weather conditions in Oklahoma. Driver is safe and will proceed once conditions improve.",
    timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(), // 1 hour ago
    bucket: COMMUNICATION_BUCKETS.DISPATCH,
    intent: INTENT_TYPES.DELAY_NOTIFICATION,
    priority: PRIORITY_LEVELS.URGENT,
    processed: false
  },
  {
    id: "email-4",
    from: "accounting@freightpay.com",
    to: "demo@sevos.ai", 
    subject: "Payment Processed - Load #LD-456789",
    body: "Payment confirmation for Load #LD-456789\n\nAmount: $2,450.00\nProcessed: January 16, 2024\nReference: FP-2024-0116\n\nFunds will be available within 24 hours.",
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(), // 6 hours ago
    bucket: COMMUNICATION_BUCKETS.ACCOUNTING,
    intent: INTENT_TYPES.PAYMENT_CONFIRMATION,
    priority: PRIORITY_LEVELS.LOW,
    processed: true
  },
  {
    id: "email-5",
    from: "claims@insuranceco.com",
    to: "demo@sevos.ai",
    subject: "Cargo Damage Claim #CL-2024-0158", 
    body: "We have received your cargo damage claim for load LD-987654. Initial assessment shows minor packaging damage to 3 pallets.\n\nClaim Amount: $1,250.00\nAdjuster: Mike Rodriguez\nNext Steps: Photos and documentation required\n\nPlease submit additional documentation within 5 business days.",
    timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(), // 12 hours ago
    bucket: COMMUNICATION_BUCKETS.CLAIMS,
    intent: INTENT_TYPES.CARGO_ISSUE,
    priority: PRIORITY_LEVELS.HIGH,
    processed: false
  }
];

export const demoCalls: Call[] = [
  {
    id: "call-1",
    from: "+1-555-0123",
    to: "+1-555-SEVOS",
    duration: 420, // 7 minutes
    timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(), // 3 hours ago
    transcript: "Caller inquired about capacity for regular lane between LA and Phoenix. Discussed rates, mentioned they have 3-4 loads per week. Interested in dedicated service. Asked for quote by EOD.",
    summary: "Capacity inquiry for LA-Phoenix lane, 3-4 loads/week, needs quote today",
    bucket: COMMUNICATION_BUCKETS.LEADS,
    intent: INTENT_TYPES.CAPACITY_INQUIRY,
    priority: PRIORITY_LEVELS.HIGH,
    processed: false
  },
  {
    id: "call-2", 
    from: "+1-555-0456",
    duration: 180, // 3 minutes
    timestamp: new Date(Date.now() - 1.5 * 60 * 60 * 1000).toISOString(), // 1.5 hours ago
    transcript: "Driver called to confirm pickup at 2 PM. Load is ready, all paperwork complete. Estimated delivery time is 6 PM tomorrow.",
    summary: "Driver confirmation - pickup at 2 PM, delivery tomorrow 6 PM",
    bucket: COMMUNICATION_BUCKETS.DISPATCH,
    intent: INTENT_TYPES.PICKUP_CONFIRMATION,
    priority: PRIORITY_LEVELS.MEDIUM,
    processed: true
  },
  {
    id: "call-3",
    from: "+1-555-0789", 
    duration: 600, // 10 minutes
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), // 5 hours ago
    transcript: "Carrier negotiating rates for next month's contract. Current rate $2.10/mile, requesting $2.25/mile due to fuel increases. Discussed volume commitments and payment terms.",
    summary: "Rate negotiation - carrier wants $2.25/mile vs current $2.10/mile",
    bucket: COMMUNICATION_BUCKETS.CARRIER_UPDATES,
    intent: INTENT_TYPES.RATE_NEGOTIATION,
    priority: PRIORITY_LEVELS.MEDIUM,
    processed: false
  }
];

export const demoInvoices: Invoice[] = [
  {
    id: "inv-1",
    invoiceNumber: "EF-2024-1156",
    vendor: "Elite Freight LLC",
    amount: 2450.00,
    currency: "USD",
    dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days from now
    issueDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
    status: "pending",
    lineItems: [
      {
        description: "Transportation: Dallas, TX to Houston, TX",
        quantity: 1,
        unitPrice: 2450.00,
        total: 2450.00
      }
    ],
    sourceEmailId: "email-2"
  },
  {
    id: "inv-2",
    invoiceNumber: "TL-2024-0892",
    vendor: "TruckLine Express",
    amount: 3200.00,
    currency: "USD", 
    dueDate: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000).toISOString(), // 25 days from now
    issueDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
    status: "pending",
    lineItems: [
      {
        description: "Transportation: Chicago, IL to Denver, CO",
        quantity: 1,
        unitPrice: 3000.00,
        total: 3000.00
      },
      {
        description: "Fuel Surcharge",
        quantity: 1,
        unitPrice: 200.00,
        total: 200.00
      }
    ]
  },
  {
    id: "inv-3",
    invoiceNumber: "FF-2024-0156",
    vendor: "Fast Freight Inc",
    amount: 1850.00,
    currency: "USD",
    dueDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days overdue
    issueDate: new Date(Date.now() - 35 * 24 * 60 * 60 * 1000).toISOString(), // 35 days ago
    status: "overdue"
  }
];

export const demoLeads: Lead[] = [
  {
    id: "lead-1",
    companyName: "MegaCorp Industries",
    contactName: "Sarah Johnson",
    email: "sarah.johnson@megacorp.com",
    phone: "+1-555-0123",
    origin: "Chicago, IL",
    destination: "Denver, CO", 
    commodity: "Electronics",
    weight: 45000,
    equipmentType: "Dry Van",
    rate: 3200.00,
    notes: "High-value load, white glove service required",
    status: "quoted",
    priority: PRIORITY_LEVELS.HIGH,
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
    sourceEmailId: "email-1"
  },
  {
    id: "lead-2",
    companyName: "ABC Logistics",
    contactName: "Mike Rodriguez", 
    email: "mike@abclogistics.com",
    phone: "+1-555-0456",
    origin: "Los Angeles, CA",
    destination: "Phoenix, AZ",
    commodity: "Consumer Goods",
    weight: 35000,
    equipmentType: "Dry Van",
    notes: "Regular weekly lane, 3-4 loads per week",
    status: "new",
    priority: PRIORITY_LEVELS.HIGH,
    createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    sourceCallId: "call-1"
  },
  {
    id: "lead-3",
    companyName: "Fresh Foods Distribution",
    contactName: "Jennifer Lee",
    email: "j.lee@freshfoods.com",
    origin: "Miami, FL",
    destination: "Atlanta, GA",
    commodity: "Refrigerated Produce",
    weight: 42000,
    equipmentType: "Reefer",
    rate: 1800.00,
    status: "contacted",
    priority: PRIORITY_LEVELS.MEDIUM,
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString()
  }
];

export const demoJournalEntries: JournalEntry[] = [
  {
    id: "je-1",
    date: new Date().toISOString(),
    description: "Invoice payment to Elite Freight LLC",
    reference: "EF-2024-1156",
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
    status: "draft",
    totalDebits: 2450.00,
    totalCredits: 2450.00,
    sourceInvoiceId: "inv-1",
    createdAt: new Date().toISOString()
  },
  {
    id: "je-2",
    date: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // Yesterday
    description: "Revenue recognition for Load #LD-456789",
    reference: "LD-456789",
    entries: [
      {
        account: "Accounts Receivable",
        accountNumber: "1200",
        debit: 3200.00,
        description: "MegaCorp Industries - Load LD-456789"
      },
      {
        account: "Freight Revenue", 
        accountNumber: "4000",
        credit: 3200.00,
        description: "Revenue - Chicago to Denver"
      }
    ],
    status: "posted",
    totalDebits: 3200.00,
    totalCredits: 3200.00,
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
  }
];

// Utility functions for demo data
export function getNewEmails() {
  return demoEmails.filter(email => !email.processed);
}

export function getEmailsByBucket(bucket: string) {
  return demoEmails.filter(email => email.bucket === bucket);
}

export function getHighPriorityCommunications() {
  const highPriorityEmails = demoEmails.filter(email => 
    email.priority === PRIORITY_LEVELS.HIGH || email.priority === PRIORITY_LEVELS.URGENT
  );
  const highPriorityCalls = demoCalls.filter(call =>
    call.priority === PRIORITY_LEVELS.HIGH || call.priority === PRIORITY_LEVELS.URGENT  
  );
  return [...highPriorityEmails, ...highPriorityCalls];
}

export function getActiveLeads() {
  return demoLeads.filter(lead => 
    lead.status === "new" || lead.status === "contacted" || lead.status === "quoted"
  );
}

export function getOverdueInvoices() {
  return demoInvoices.filter(invoice => invoice.status === "overdue");
}

export function getPendingJournalEntries() {
  return demoJournalEntries.filter(je => je.status === "draft");
}