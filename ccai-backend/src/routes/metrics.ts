import express from 'express';

const router = express.Router();

const dummyMetrics = {
  overview: {
    totalRevenue: 125480.50,
    totalLoads: 47,
    avgMargin: 18.5,
    activeCarriers: 23,
    activeCustomers: 12,
    onTimeDelivery: 96.8,
    customerSatisfaction: 4.7
  },
  
  monthlyTrends: [
    { month: 'Oct 2023', revenue: 89250, loads: 34, margin: 17.2 },
    { month: 'Nov 2023', revenue: 98750, loads: 38, margin: 18.1 },
    { month: 'Dec 2023', revenue: 107820, loads: 41, margin: 17.8 },
    { month: 'Jan 2024', revenue: 125480, loads: 47, margin: 18.5 }
  ],

  topRoutes: [
    { route: 'Chicago, IL → Denver, CO', loads: 8, revenue: 19600, avgRate: 2450 },
    { route: 'Los Angeles, CA → Phoenix, AZ', loads: 6, revenue: 11100, avgRate: 1850 },
    { route: 'Dallas, TX → Houston, TX', loads: 5, revenue: 6800, avgRate: 1360 },
    { route: 'Atlanta, GA → Miami, FL', loads: 4, revenue: 5280, avgRate: 1320 },
    { route: 'Seattle, WA → Portland, OR', loads: 3, revenue: 2670, avgRate: 890 }
  ],

  topCustomers: [
    { name: 'ABC Manufacturing', loads: 12, revenue: 31400, paymentScore: 98 },
    { name: 'Global Logistics Corp', loads: 8, revenue: 16850, paymentScore: 95 },
    { name: 'MegaCorp Industries', loads: 6, revenue: 18750, paymentScore: 92 },
    { name: 'Tech Solutions Inc', loads: 5, revenue: 12200, paymentScore: 100 },
    { name: 'Fresh Foods Distribution', loads: 4, revenue: 9180, paymentScore: 88 }
  ],

  topCarriers: [
    { name: 'Elite Transport LLC', loads: 15, revenue: 29400, onTimeRate: 98.5, rating: 4.8 },
    { name: 'Desert Freight Lines', loads: 12, revenue: 22200, onTimeRate: 96.2, rating: 4.6 },
    { name: 'Sunshine Carriers', loads: 8, revenue: 10560, onTimeRate: 94.8, rating: 4.4 },
    { name: 'Pacific Northwest Transport', loads: 6, revenue: 5340, onTimeRate: 99.1, rating: 4.9 },
    { name: 'Mountain Express', loads: 4, revenue: 7280, onTimeRate: 97.3, rating: 4.7 }
  ],

  commodityTypes: [
    { type: 'Electronics', loads: 12, revenue: 32150, avgWeight: 35000 },
    { type: 'Automotive Parts', loads: 10, revenue: 18500, avgWeight: 38500 },
    { type: 'Food Products', loads: 8, revenue: 15840, avgWeight: 42000 },
    { type: 'Building Materials', loads: 6, revenue: 14400, avgWeight: 48000 },
    { type: 'Consumer Goods', loads: 5, revenue: 8600, avgWeight: 28000 },
    { type: 'Steel Products', loads: 4, revenue: 12800, avgWeight: 47500 },
    { type: 'Computer Equipment', loads: 2, revenue: 1780, avgWeight: 25000 }
  ],

  performanceMetrics: {
    loadBookingRate: 78.5,
    carrierUtilization: 82.3,
    avgLoadCycleTime: '2.3 days',
    customerRetentionRate: 94.2,
    carrierRetentionRate: 88.7,
    disputeRate: 1.2,
    claimRate: 0.8
  },

  weeklyActivity: [
    { week: 'Week 1', calls: 45, emails: 78, bids: 23, bookings: 12 },
    { week: 'Week 2', calls: 52, emails: 89, bids: 28, bookings: 15 },
    { week: 'Week 3', calls: 48, emails: 82, bids: 25, bookings: 11 },
    { week: 'Week 4', calls: 58, emails: 95, bids: 32, bookings: 18 }
  ]
};

router.get('/overview', (req, res) => {
  res.json(dummyMetrics.overview);
});

router.get('/trends', (req, res) => {
  res.json(dummyMetrics.monthlyTrends);
});

router.get('/routes', (req, res) => {
  res.json(dummyMetrics.topRoutes);
});

router.get('/customers', (req, res) => {
  res.json(dummyMetrics.topCustomers);
});

router.get('/carriers', (req, res) => {
  res.json(dummyMetrics.topCarriers);
});

router.get('/commodities', (req, res) => {
  res.json(dummyMetrics.commodityTypes);
});

router.get('/performance', (req, res) => {
  res.json(dummyMetrics.performanceMetrics);
});

router.get('/activity', (req, res) => {
  res.json(dummyMetrics.weeklyActivity);
});

router.get('/dashboard', (req, res) => {
  res.json({
    overview: dummyMetrics.overview,
    recentTrends: dummyMetrics.monthlyTrends.slice(-3),
    topPerformers: {
      routes: dummyMetrics.topRoutes.slice(0, 3),
      customers: dummyMetrics.topCustomers.slice(0, 3),
      carriers: dummyMetrics.topCarriers.slice(0, 3)
    },
    keyMetrics: dummyMetrics.performanceMetrics
  });
});

export default router;