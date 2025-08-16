import express from 'express';

const router = express.Router();

const dummyCarriers = [
  {
    id: 'CAR-001',
    companyName: 'Elite Transport LLC',
    contactPerson: 'Robert Martinez',
    title: 'Fleet Manager',
    email: 'r.martinez@elitetransport.com',
    phone: '+1-555-0567',
    mcNumber: 'MC-123456',
    dotNumber: '987654',
    address: {
      street: '456 Freight Ave',
      city: 'Dallas',
      state: 'TX',
      zip: '75201'
    },
    equipmentTypes: ['Dry Van', 'Refrigerated', 'Flatbed'],
    fleetSize: 45,
    insuranceCoverage: 1000000,
    safetyRating: 'Satisfactory',
    preferredLanes: ['Texas Triangle', 'I-35 Corridor'],
    onTimeRate: 98.5,
    rating: 4.8,
    status: 'approved',
    carrierSince: '2021-05-15',
    totalLoads: 156,
    totalRevenue: 387500,
    lastLoadDate: '2024-01-15',
    notes: 'Reliable carrier with excellent safety record. Preferred for high-value loads.'
  },
  {
    id: 'CAR-002',
    companyName: 'Desert Freight Lines',
    contactPerson: 'Maria Garcia',
    title: 'Operations Manager',
    email: 'm.garcia@desertfreight.com',
    phone: '+1-555-0678',
    mcNumber: 'MC-234567',
    dotNumber: '876543',
    address: {
      street: '789 Desert Rd',
      city: 'Phoenix',
      state: 'AZ',
      zip: '85001'
    },
    equipmentTypes: ['Dry Van', 'Flatbed'],
    fleetSize: 28,
    insuranceCoverage: 1000000,
    safetyRating: 'Satisfactory',
    preferredLanes: ['Southwest Region', 'CA-AZ-NV Triangle'],
    onTimeRate: 96.2,
    rating: 4.6,
    status: 'approved',
    carrierSince: '2020-11-22',
    totalLoads: 98,
    totalRevenue: 245600,
    lastLoadDate: '2024-01-14',
    notes: 'Strong regional presence in Southwest. Good rates for shorter hauls.'
  },
  {
    id: 'CAR-003',
    companyName: 'Pacific Northwest Transport',
    contactPerson: 'Kevin Thompson',
    title: 'Dispatch Manager',
    email: 'k.thompson@pnwtrans.com',
    phone: '+1-555-0789',
    mcNumber: 'MC-345678',
    dotNumber: '765432',
    address: {
      street: '321 Cargo Blvd',
      city: 'Seattle',
      state: 'WA',
      zip: '98101'
    },
    equipmentTypes: ['Dry Van', 'Refrigerated'],
    fleetSize: 12,
    insuranceCoverage: 1000000,
    safetyRating: 'Satisfactory',
    preferredLanes: ['Pacific Coast', 'Northwest Region'],
    onTimeRate: 99.1,
    rating: 4.9,
    status: 'approved',
    carrierSince: '2022-02-10',
    totalLoads: 45,
    totalRevenue: 89250,
    lastLoadDate: '2024-01-13',
    notes: 'Small but highly reliable carrier. Excellent for time-sensitive deliveries.'
  },
  {
    id: 'CAR-004',
    companyName: 'Sunshine Carriers',
    contactPerson: 'Carlos Rodriguez',
    title: 'Owner Operator',
    email: 'c.rodriguez@sunshinecarriers.com',
    phone: '+1-555-0890',
    mcNumber: 'MC-456789',
    dotNumber: '654321',
    address: {
      street: '654 Sunshine St',
      city: 'Miami',
      state: 'FL',
      zip: '33101'
    },
    equipmentTypes: ['Refrigerated', 'Dry Van'],
    fleetSize: 8,
    insuranceCoverage: 1000000,
    safetyRating: 'Satisfactory',
    preferredLanes: ['Southeast Region', 'Florida Intrastate'],
    onTimeRate: 94.8,
    rating: 4.4,
    status: 'approved',
    carrierSince: '2019-08-30',
    totalLoads: 67,
    totalRevenue: 134500,
    lastLoadDate: '2024-01-12',
    notes: 'Family-owned business with competitive rates. Good for produce and perishables.'
  }
];

const dummyCarrierPerformance = [
  {
    carrierId: 'CAR-001',
    month: 'January 2024',
    loadsCompleted: 12,
    onTimeDeliveries: 12,
    revenue: 29400,
    averageRate: 2450,
    fuelEfficiency: 6.8,
    customerRating: 4.8
  },
  {
    carrierId: 'CAR-002',
    month: 'January 2024',
    loadsCompleted: 8,
    onTimeDeliveries: 7,
    revenue: 14800,
    averageRate: 1850,
    fuelEfficiency: 6.5,
    customerRating: 4.6
  },
  {
    carrierId: 'CAR-003',
    month: 'January 2024',
    loadsCompleted: 5,
    onTimeDeliveries: 5,
    revenue: 4450,
    averageRate: 890,
    fuelEfficiency: 7.2,
    customerRating: 4.9
  }
];

router.get('/', (req, res) => {
  res.json(dummyCarriers);
});

router.get('/:id', (req, res) => {
  const carrier = dummyCarriers.find(c => c.id === req.params.id);
  if (!carrier) {
    return res.status(404).json({ message: 'Carrier not found' });
  }
  res.json(carrier);
});

router.get('/:id/performance', (req, res) => {
  const performance = dummyCarrierPerformance.filter(p => p.carrierId === req.params.id);
  res.json(performance);
});

router.get('/summary/stats', (req, res) => {
  const totalCarriers = dummyCarriers.length;
  const approvedCarriers = dummyCarriers.filter(c => c.status === 'approved').length;
  const totalFleetSize = dummyCarriers.reduce((sum, c) => sum + c.fleetSize, 0);
  const avgOnTimeRate = dummyCarriers.reduce((sum, c) => sum + c.onTimeRate, 0) / totalCarriers;
  const avgRating = dummyCarriers.reduce((sum, c) => sum + c.rating, 0) / totalCarriers;

  const equipmentBreakdown = dummyCarriers.reduce((acc, carrier) => {
    carrier.equipmentTypes.forEach(type => {
      acc[type] = (acc[type] || 0) + 1;
    });
    return acc;
  }, {} as Record<string, number>);

  const regionBreakdown = dummyCarriers.reduce((acc, carrier) => {
    carrier.preferredLanes.forEach(lane => {
      acc[lane] = (acc[lane] || 0) + 1;
    });
    return acc;
  }, {} as Record<string, number>);

  res.json({
    totalCarriers,
    approvedCarriers,
    totalFleetSize,
    avgOnTimeRate: Math.round(avgOnTimeRate * 10) / 10,
    avgRating: Math.round(avgRating * 10) / 10,
    equipmentBreakdown,
    regionBreakdown,
    topPerformers: dummyCarriers
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 3)
      .map(c => ({ name: c.companyName, rating: c.rating, onTimeRate: c.onTimeRate }))
  });
});

export default router;