import express from 'express';

const router = express.Router();

const dummyCalls = [
  {
    id: 'CALL-2024-001',
    caller: 'ABC Shipping Co.',
    phone: '+1-555-0123',
    duration: '4:32',
    type: 'inbound',
    status: 'completed',
    timestamp: '2024-01-15T10:20:00Z',
    assignedTo: 'Mike Rodriguez',
    category: 'lead_inquiry',
    summary: 'Interested in regular route from LA to Phoenix, 3 loads per week',
    transcript: 'Caller interested in establishing regular shipping route. Discussed rates and capacity requirements.',
    followUpRequired: true,
    followUpDate: '2024-01-16T10:00:00Z',
    priority: 'high'
  },
  {
    id: 'CALL-2024-002',
    caller: 'Elite Transport LLC',
    phone: '+1-555-0456',
    duration: '2:15',
    type: 'inbound',
    status: 'completed',
    timestamp: '2024-01-15T14:10:00Z',
    assignedTo: 'Lisa Wang',
    category: 'carrier_check_in',
    summary: 'Driver update on delivery status',
    transcript: 'Driver reporting on-time delivery completion. No issues encountered.',
    followUpRequired: false,
    followUpDate: null,
    priority: 'low'
  },
  {
    id: 'CALL-2024-003',
    caller: 'MegaCorp Industries',
    phone: '+1-555-0789',
    duration: '6:45',
    type: 'outbound',
    status: 'completed',
    timestamp: '2024-01-15T11:30:00Z',
    assignedTo: 'Tom Wilson',
    category: 'sales_call',
    summary: 'Follow-up on quote submission',
    transcript: 'Discussed pricing options and service levels. Customer considering proposal.',
    followUpRequired: true,
    followUpDate: '2024-01-17T14:00:00Z',
    priority: 'high'
  },
  {
    id: 'CALL-2024-004',
    caller: 'John Driver',
    phone: '+1-555-0321',
    duration: '0:00',
    type: 'inbound',
    status: 'missed',
    timestamp: '2024-01-15T16:45:00Z',
    assignedTo: 'Mike Rodriguez',
    category: 'driver_emergency',
    summary: 'Missed call - potential breakdown',
    transcript: null,
    followUpRequired: true,
    followUpDate: '2024-01-15T17:00:00Z',
    priority: 'urgent'
  },
  {
    id: 'CALL-2024-005',
    caller: 'Fresh Foods Distribution',
    phone: '+1-555-0234',
    duration: '3:20',
    type: 'inbound',
    status: 'completed',
    timestamp: '2024-01-15T09:15:00Z',
    assignedTo: 'Lisa Wang',
    category: 'customer_service',
    summary: 'Temperature monitoring question',
    transcript: 'Customer inquiry about reefer monitoring capabilities for produce shipment.',
    followUpRequired: false,
    followUpDate: null,
    priority: 'medium'
  }
];

router.get('/', (req, res) => {
  res.json(dummyCalls);
});

router.get('/summary', (req, res) => {
  const statusCounts = {
    completed: dummyCalls.filter(call => call.status === 'completed').length,
    missed: dummyCalls.filter(call => call.status === 'missed').length,
    in_progress: dummyCalls.filter(call => call.status === 'in_progress').length
  };

  const categoryCounts = {
    lead_inquiry: dummyCalls.filter(call => call.category === 'lead_inquiry').length,
    carrier_check_in: dummyCalls.filter(call => call.category === 'carrier_check_in').length,
    sales_call: dummyCalls.filter(call => call.category === 'sales_call').length,
    driver_emergency: dummyCalls.filter(call => call.category === 'driver_emergency').length,
    customer_service: dummyCalls.filter(call => call.category === 'customer_service').length
  };

  const totalDuration = dummyCalls
    .filter(call => call.status === 'completed')
    .reduce((total, call) => {
      const [minutes, seconds] = call.duration.split(':').map(Number);
      return total + minutes + seconds / 60;
    }, 0);

  res.json({
    totalCalls: dummyCalls.length,
    statusBreakdown: statusCounts,
    categoryBreakdown: categoryCounts,
    followUpRequired: dummyCalls.filter(call => call.followUpRequired).length,
    averageCallDuration: `${Math.floor(totalDuration / statusCounts.completed)}:${Math.round((totalDuration / statusCounts.completed % 1) * 60).toString().padStart(2, '0')}`,
    urgentCalls: dummyCalls.filter(call => call.priority === 'urgent').length
  });
});

export default router;