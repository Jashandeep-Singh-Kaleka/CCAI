import express from 'express';

const router = express.Router();

const dummyCustomers = [
  {
    id: 'CUST-001',
    companyName: 'ABC Manufacturing',
    contactPerson: 'Sarah Johnson',
    title: 'Logistics Manager',
    email: 'sarah.j@abcmfg.com',
    phone: '+1-555-0123',
    address: {
      street: '1250 Industrial Blvd',
      city: 'Chicago',
      state: 'IL',
      zip: '60616'
    },
    industry: 'Manufacturing',
    customerSince: '2022-03-15',
    status: 'active',
    creditLimit: 50000,
    paymentTerms: 'Net 30',
    paymentScore: 98,
    totalRevenue: 31400,
    totalLoads: 12,
    lastOrderDate: '2024-01-15',
    preferredLanes: ['Chicago, IL → Denver, CO', 'Chicago, IL → Dallas, TX'],
    notes: 'High-volume shipper, excellent payment history. Prefers morning pickups.',
    accountManager: 'Mike Rodriguez'
  },
  {
    id: 'CUST-002',
    companyName: 'Global Logistics Corp',
    contactPerson: 'David Chen',
    title: 'Transportation Director',
    email: 'd.chen@globallog.com',
    phone: '+1-555-0234',
    address: {
      street: '890 Commerce Way',
      city: 'Los Angeles',
      state: 'CA',
      zip: '90210'
    },
    industry: 'Logistics',
    customerSince: '2021-08-22',
    status: 'active',
    creditLimit: 75000,
    paymentTerms: 'Net 15',
    paymentScore: 95,
    totalRevenue: 16850,
    totalLoads: 8,
    lastOrderDate: '2024-01-14',
    preferredLanes: ['Los Angeles, CA → Phoenix, AZ', 'Los Angeles, CA → Las Vegas, NV'],
    notes: 'Regular weekly shipments, requires temperature-controlled transport.',
    accountManager: 'Lisa Wang'
  },
  {
    id: 'CUST-003',
    companyName: 'Tech Solutions Inc',
    contactPerson: 'Jennifer Liu',
    title: 'Supply Chain Manager',
    email: 'j.liu@techsol.com',
    phone: '+1-555-0345',
    address: {
      street: '2100 Technology Dr',
      city: 'Austin',
      state: 'TX',
      zip: '78701'
    },
    industry: 'Technology',
    customerSince: '2023-01-10',
    status: 'active',
    creditLimit: 25000,
    paymentTerms: 'Net 30',
    paymentScore: 100,
    totalRevenue: 12200,
    totalLoads: 5,
    lastOrderDate: '2024-01-12',
    preferredLanes: ['Austin, TX → San Francisco, CA', 'Austin, TX → Seattle, WA'],
    notes: 'New customer with growth potential. High-value electronic equipment.',
    accountManager: 'Tom Wilson'
  }
];

const dummyInteractions = [
  {
    id: 'INT-001',
    customerId: 'CUST-001',
    type: 'call',
    subject: 'Q1 Capacity Planning',
    description: 'Discussed upcoming volume increases for spring season',
    date: '2024-01-15T14:30:00Z',
    duration: '25 minutes',
    outcome: 'positive',
    followUpRequired: true,
    followUpDate: '2024-01-22T10:00:00Z',
    assignedTo: 'Mike Rodriguez'
  },
  {
    id: 'INT-002',
    customerId: 'CUST-002',
    type: 'email',
    subject: 'Rate Quote Request',
    description: 'Requested pricing for additional lane: LA to Denver',
    date: '2024-01-14T09:15:00Z',
    outcome: 'quote_sent',
    followUpRequired: true,
    followUpDate: '2024-01-16T15:00:00Z',
    assignedTo: 'Lisa Wang'
  },
  {
    id: 'INT-003',
    customerId: 'CUST-003',
    type: 'meeting',
    subject: 'Contract Renewal Discussion',
    description: 'Annual contract review and renewal negotiations',
    date: '2024-01-12T11:00:00Z',
    duration: '60 minutes',
    outcome: 'contract_renewed',
    followUpRequired: false,
    assignedTo: 'Tom Wilson'
  }
];

router.get('/', (req, res) => {
  res.json(dummyCustomers);
});

router.get('/:id', (req, res) => {
  const customer = dummyCustomers.find(c => c.id === req.params.id);
  if (!customer) {
    return res.status(404).json({ message: 'Customer not found' });
  }
  res.json(customer);
});

router.get('/:id/interactions', (req, res) => {
  const customerInteractions = dummyInteractions.filter(i => i.customerId === req.params.id);
  res.json(customerInteractions);
});

router.get('/summary/stats', (req, res) => {
  const totalCustomers = dummyCustomers.length;
  const activeCustomers = dummyCustomers.filter(c => c.status === 'active').length;
  const totalRevenue = dummyCustomers.reduce((sum, c) => sum + c.totalRevenue, 0);
  const avgPaymentScore = dummyCustomers.reduce((sum, c) => sum + c.paymentScore, 0) / totalCustomers;

  const industryBreakdown = dummyCustomers.reduce((acc, customer) => {
    acc[customer.industry] = (acc[customer.industry] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  res.json({
    totalCustomers,
    activeCustomers,
    totalRevenue,
    avgPaymentScore: Math.round(avgPaymentScore * 10) / 10,
    industryBreakdown,
    recentInteractions: dummyInteractions.slice(0, 5),
    followUpsDue: dummyInteractions.filter(i => i.followUpRequired).length
  });
});

export default router;