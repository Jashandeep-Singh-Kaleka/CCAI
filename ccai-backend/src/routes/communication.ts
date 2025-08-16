import express from 'express';

const router = express.Router();

const dummyEmails = [
  {
    id: 1,
    type: 'email',
    subject: 'Load Booking Request - Chicago to Denver',
    from: 'shipper@logisticscorp.com',
    content: 'Looking for a reliable carrier for our Chicago to Denver route. Load ready Monday.',
    category: 'lead',
    priority: 'high',
    timestamp: new Date('2024-01-15T09:30:00Z'),
    status: 'unread'
  },
  {
    id: 2,
    type: 'email',
    subject: 'Invoice Payment Confirmation',
    from: 'accounting@truckingco.com',
    content: 'Payment processed for invoice #INV-2024-001. Amount: $2,450.00',
    category: 'financial',
    priority: 'medium',
    timestamp: new Date('2024-01-15T11:15:00Z'),
    status: 'read'
  },
  {
    id: 3,
    type: 'email',
    subject: 'Urgent: Delivery Delay Notification',
    from: 'driver@freightlines.com',
    content: 'Delayed due to weather conditions. ETA pushed to 3 PM.',
    category: 'operations',
    priority: 'urgent',
    timestamp: new Date('2024-01-15T13:45:00Z'),
    status: 'unread'
  }
];

const dummyCalls = [
  {
    id: 4,
    type: 'call',
    caller: 'ABC Shipping Co.',
    phone: '+1-555-0123',
    duration: '4:32',
    category: 'lead',
    priority: 'high',
    timestamp: new Date('2024-01-15T10:20:00Z'),
    status: 'completed',
    summary: 'Interested in regular route from LA to Phoenix, 3 loads per week'
  },
  {
    id: 5,
    type: 'call',
    caller: 'John Driver',
    phone: '+1-555-0456',
    duration: '2:15',
    category: 'operations',
    priority: 'medium',
    timestamp: new Date('2024-01-15T14:10:00Z'),
    status: 'missed',
    summary: 'Callback needed - truck breakdown on I-80'
  }
];

router.get('/all', (req, res) => {
  const allCommunications = [...dummyEmails, ...dummyCalls]
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  
  res.json(allCommunications);
});

router.get('/emails', (req, res) => {
  res.json(dummyEmails);
});

router.get('/calls', (req, res) => {
  res.json(dummyCalls);
});

router.get('/categories', (req, res) => {
  res.json({
    lead: [...dummyEmails, ...dummyCalls].filter(item => item.category === 'lead'),
    financial: [...dummyEmails, ...dummyCalls].filter(item => item.category === 'financial'),
    operations: [...dummyEmails, ...dummyCalls].filter(item => item.category === 'operations')
  });
});

export default router;