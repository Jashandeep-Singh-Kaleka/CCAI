import express from 'express';

const router = express.Router();

const dummyInvoices = [
  {
    id: 'INV-2024-001',
    customerName: 'ABC Manufacturing',
    loadId: 'LD-2024-156',
    route: 'Chicago, IL → Denver, CO',
    amount: 2450.00,
    status: 'paid',
    dueDate: '2024-01-20',
    issueDate: '2024-01-05',
    paymentDate: '2024-01-18',
    carrierName: 'Elite Transport LLC',
    commodityType: 'Electronics',
    weight: '45,000 lbs',
    distance: '1,003 miles'
  },
  {
    id: 'INV-2024-002',
    customerName: 'Global Logistics Corp',
    loadId: 'LD-2024-157',
    route: 'Los Angeles, CA → Phoenix, AZ',
    amount: 1850.00,
    status: 'pending',
    dueDate: '2024-01-25',
    issueDate: '2024-01-10',
    paymentDate: null,
    carrierName: 'Desert Freight Lines',
    commodityType: 'Automotive Parts',
    weight: '38,500 lbs',
    distance: '357 miles'
  },
  {
    id: 'INV-2024-003',
    customerName: 'Northeast Distribution',
    loadId: 'LD-2024-158',
    route: 'Atlanta, GA → Miami, FL',
    amount: 1320.00,
    status: 'overdue',
    dueDate: '2024-01-15',
    issueDate: '2024-01-01',
    paymentDate: null,
    carrierName: 'Sunshine Carriers',
    commodityType: 'Food Products',
    weight: '42,000 lbs',
    distance: '663 miles'
  },
  {
    id: 'INV-2024-004',
    customerName: 'Tech Solutions Inc',
    loadId: 'LD-2024-159',
    route: 'Seattle, WA → Portland, OR',
    amount: 890.00,
    status: 'draft',
    dueDate: '2024-01-30',
    issueDate: '2024-01-15',
    paymentDate: null,
    carrierName: 'Pacific Northwest Transport',
    commodityType: 'Computer Equipment',
    weight: '25,000 lbs',
    distance: '173 miles'
  }
];

router.get('/', (req, res) => {
  res.json(dummyInvoices);
});

router.get('/summary', (req, res) => {
  const totalAmount = dummyInvoices.reduce((sum, inv) => sum + inv.amount, 0);
  const paidAmount = dummyInvoices.filter(inv => inv.status === 'paid').reduce((sum, inv) => sum + inv.amount, 0);
  const pendingAmount = dummyInvoices.filter(inv => inv.status === 'pending').reduce((sum, inv) => sum + inv.amount, 0);
  const overdueAmount = dummyInvoices.filter(inv => inv.status === 'overdue').reduce((sum, inv) => sum + inv.amount, 0);

  res.json({
    totalInvoices: dummyInvoices.length,
    totalAmount,
    paidAmount,
    pendingAmount,
    overdueAmount,
    statusBreakdown: {
      paid: dummyInvoices.filter(inv => inv.status === 'paid').length,
      pending: dummyInvoices.filter(inv => inv.status === 'pending').length,
      overdue: dummyInvoices.filter(inv => inv.status === 'overdue').length,
      draft: dummyInvoices.filter(inv => inv.status === 'draft').length
    }
  });
});

export default router;