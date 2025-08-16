import express from 'express';

const router = express.Router();

const dummyLeads = [
  {
    id: 'LD-2024-001',
    companyName: 'MegaCorp Industries',
    contactPerson: 'Sarah Johnson',
    email: 'sarah.j@megacorp.com',
    phone: '+1-555-0789',
    origin: 'Dallas, TX',
    destination: 'Houston, TX',
    commodityType: 'Steel Products',
    weight: '48,000 lbs',
    frequency: 'Weekly',
    budget: '$1,200 - $1,500',
    status: 'hot',
    source: 'website',
    assignedTo: 'Mike Rodriguez',
    lastContact: '2024-01-15T10:30:00Z',
    notes: 'Interested in long-term contract. Decision maker available.',
    priority: 'high'
  },
  {
    id: 'LD-2024-002',
    companyName: 'Fresh Foods Distribution',
    contactPerson: 'David Chen',
    email: 'd.chen@freshfoods.com',
    phone: '+1-555-0234',
    origin: 'California Central Valley',
    destination: 'Las Vegas, NV',
    commodityType: 'Refrigerated Produce',
    weight: '40,000 lbs',
    frequency: 'Twice Weekly',
    budget: '$1,800 - $2,200',
    status: 'warm',
    source: 'referral',
    assignedTo: 'Lisa Wang',
    lastContact: '2024-01-14T14:20:00Z',
    notes: 'Requires reefer trucks. Temperature sensitive cargo.',
    priority: 'high'
  },
  {
    id: 'LD-2024-003',
    companyName: 'Construction Materials Co',
    contactPerson: 'Robert Martinez',
    email: 'r.martinez@constructmat.com',
    phone: '+1-555-0567',
    origin: 'Phoenix, AZ',
    destination: 'Denver, CO',
    commodityType: 'Building Materials',
    weight: '50,000 lbs',
    frequency: 'Monthly',
    budget: '$2,000 - $2,500',
    status: 'cold',
    source: 'cold_call',
    assignedTo: 'Tom Wilson',
    lastContact: '2024-01-12T09:15:00Z',
    notes: 'Price sensitive. Needs competitive rates.',
    priority: 'medium'
  },
  {
    id: 'LD-2024-004',
    companyName: 'E-Commerce Fulfillment Hub',
    contactPerson: 'Jennifer Liu',
    email: 'j.liu@ecommhub.com',
    phone: '+1-555-0890',
    origin: 'Memphis, TN',
    destination: 'Multiple destinations',
    commodityType: 'Consumer Goods',
    weight: '20,000 - 35,000 lbs',
    frequency: 'Daily',
    budget: '$800 - $1,200',
    status: 'qualified',
    source: 'trade_show',
    assignedTo: 'Mike Rodriguez',
    lastContact: '2024-01-15T16:45:00Z',
    notes: 'High volume potential. Looking for dedicated lanes.',
    priority: 'high'
  }
];

router.get('/', (req, res) => {
  res.json(dummyLeads);
});

router.get('/summary', (req, res) => {
  const statusCounts = {
    hot: dummyLeads.filter(lead => lead.status === 'hot').length,
    warm: dummyLeads.filter(lead => lead.status === 'warm').length,
    cold: dummyLeads.filter(lead => lead.status === 'cold').length,
    qualified: dummyLeads.filter(lead => lead.status === 'qualified').length
  };

  const sourceCounts = {
    website: dummyLeads.filter(lead => lead.source === 'website').length,
    referral: dummyLeads.filter(lead => lead.source === 'referral').length,
    cold_call: dummyLeads.filter(lead => lead.source === 'cold_call').length,
    trade_show: dummyLeads.filter(lead => lead.source === 'trade_show').length
  };

  res.json({
    totalLeads: dummyLeads.length,
    statusBreakdown: statusCounts,
    sourceBreakdown: sourceCounts,
    highPriorityLeads: dummyLeads.filter(lead => lead.priority === 'high').length
  });
});

export default router;