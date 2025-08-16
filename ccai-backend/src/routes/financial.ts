import express from 'express';

const router = express.Router();

const dummyTransactions = [
  {
    id: 'TXN-2024-001',
    type: 'revenue',
    description: 'Load Payment - INV-2024-001',
    amount: 2450.00,
    date: '2024-01-18',
    category: 'load_revenue',
    customerName: 'ABC Manufacturing',
    loadId: 'LD-2024-156',
    status: 'completed',
    paymentMethod: 'ACH Transfer'
  },
  {
    id: 'TXN-2024-002',
    type: 'expense',
    description: 'Carrier Payment - Elite Transport LLC',
    amount: -1960.00,
    date: '2024-01-19',
    category: 'carrier_payment',
    carrierName: 'Elite Transport LLC',
    loadId: 'LD-2024-156',
    status: 'completed',
    paymentMethod: 'Wire Transfer'
  },
  {
    id: 'TXN-2024-003',
    type: 'expense',
    description: 'Fuel Surcharge Adjustment',
    amount: -125.50,
    date: '2024-01-15',
    category: 'fuel_surcharge',
    carrierName: 'Desert Freight Lines',
    loadId: 'LD-2024-157',
    status: 'pending',
    paymentMethod: 'Check'
  },
  {
    id: 'TXN-2024-004',
    type: 'revenue',
    description: 'Factoring Advance',
    amount: 1480.00,
    date: '2024-01-14',
    category: 'factoring',
    factoringCompany: 'QuickPay Factoring',
    invoiceId: 'INV-2024-002',
    status: 'completed',
    paymentMethod: 'Wire Transfer'
  },
  {
    id: 'TXN-2024-005',
    type: 'expense',
    description: 'Insurance Premium - Monthly',
    amount: -850.00,
    date: '2024-01-01',
    category: 'insurance',
    vendor: 'TruckGuard Insurance',
    status: 'completed',
    paymentMethod: 'ACH Transfer'
  },
  {
    id: 'TXN-2024-006',
    type: 'expense',
    description: 'Office Rent - January',
    amount: -3200.00,
    date: '2024-01-01',
    category: 'overhead',
    vendor: 'Prime Office Complex',
    status: 'completed',
    paymentMethod: 'Check'
  }
];

const dummyAccounts = [
  {
    id: 'ACC-001',
    name: 'Operating Account',
    type: 'checking',
    balance: 45280.75,
    bank: 'First National Bank',
    accountNumber: '****-1234'
  },
  {
    id: 'ACC-002',
    name: 'Payroll Account',
    type: 'checking',
    balance: 12500.00,
    bank: 'First National Bank',
    accountNumber: '****-5678'
  },
  {
    id: 'ACC-003',
    name: 'Equipment Reserve',
    type: 'savings',
    balance: 78950.25,
    bank: 'Commerce Bank',
    accountNumber: '****-9012'
  }
];

router.get('/transactions', (req, res) => {
  res.json(dummyTransactions);
});

router.get('/accounts', (req, res) => {
  res.json(dummyAccounts);
});

router.get('/summary', (req, res) => {
  const totalRevenue = dummyTransactions
    .filter(txn => txn.type === 'revenue')
    .reduce((sum, txn) => sum + txn.amount, 0);

  const totalExpenses = Math.abs(dummyTransactions
    .filter(txn => txn.type === 'expense')
    .reduce((sum, txn) => sum + txn.amount, 0));

  const netIncome = totalRevenue - totalExpenses;

  const categoryBreakdown = {
    load_revenue: dummyTransactions.filter(txn => txn.category === 'load_revenue').reduce((sum, txn) => sum + txn.amount, 0),
    carrier_payment: Math.abs(dummyTransactions.filter(txn => txn.category === 'carrier_payment').reduce((sum, txn) => sum + txn.amount, 0)),
    fuel_surcharge: Math.abs(dummyTransactions.filter(txn => txn.category === 'fuel_surcharge').reduce((sum, txn) => sum + txn.amount, 0)),
    factoring: dummyTransactions.filter(txn => txn.category === 'factoring').reduce((sum, txn) => sum + txn.amount, 0),
    insurance: Math.abs(dummyTransactions.filter(txn => txn.category === 'insurance').reduce((sum, txn) => sum + txn.amount, 0)),
    overhead: Math.abs(dummyTransactions.filter(txn => txn.category === 'overhead').reduce((sum, txn) => sum + txn.amount, 0))
  };

  const totalCashBalance = dummyAccounts.reduce((sum, acc) => sum + acc.balance, 0);

  res.json({
    totalRevenue,
    totalExpenses,
    netIncome,
    categoryBreakdown,
    totalCashBalance,
    pendingTransactions: dummyTransactions.filter(txn => txn.status === 'pending').length,
    grossMargin: ((totalRevenue - categoryBreakdown.carrier_payment) / totalRevenue) * 100
  });
});

export default router;