export const demoPayments = [
  {
    id: 1,
    company: 'Rajesh Cotton Mills',
    invoice: 'TX-2024-156',
    date: 'Jan 20',
    amount: 45000,
    status: 'paid',
    paymentMethod: 'UPI Payment',
    transactionId: 'TXN123456789',
    description: 'Cotton fabric order payment'
  },
  {
    id: 2,
    company: 'Mumbai Silk House',
    invoice: 'TX-2024-142',
    date: 'Jan 15',
    amount: 78500,
    status: 'overdue',
    overdueDays: 5,
    penalty: 1570,
    description: 'Silk fabric bulk order'
  },
  {
    id: 3,
    company: 'Gujarat Textiles Ltd',
    invoice: 'TX-2024-138',
    date: 'Jan 25',
    amount: 125000,
    status: 'pending',
    dueInDays: 5,
    description: 'Premium fabric collection'
  },
  {
    id: 4,
    company: 'Delhi Fashion Hub',
    invoice: 'TX-2024-134',
    date: 'Jan 18',
    amount: 89200,
    status: 'paid',
    paymentMethod: 'Bank Transfer',
    transactionId: 'TXN987654321',
    description: 'Designer fabric order'
  },
  {
    id: 5,
    company: 'Chennai Textiles',
    invoice: 'TX-2024-129',
    date: 'Jan 12',
    amount: 67800,
    status: 'overdue',
    overdueDays: 12,
    penalty: 2034,
    description: 'Traditional fabric order'
  },
  {
    id: 6,
    company: 'Bangalore Weavers',
    invoice: 'TX-2024-125',
    date: 'Jan 28',
    amount: 156000,
    status: 'pending',
    dueInDays: 2,
    description: 'Handloom fabric collection'
  },
  {
    id: 7,
    company: 'Punjab Fabrics',
    invoice: 'TX-2024-121',
    date: 'Jan 10',
    amount: 234500,
    status: 'paid',
    paymentMethod: 'Cash',
    transactionId: 'CASH001234',
    description: 'Bulk fabric order payment'
  },
  {
    id: 8,
    company: 'Hyderabad Silk Mills',
    invoice: 'TX-2024-118',
    date: 'Jan 22',
    amount: 98700,
    status: 'pending',
    dueInDays: 8,
    description: 'Premium silk order'
  }
];

export const demoPaymentStats = {
  totalReceivable: 856400,
  totalPaid: 523200,
  totalOverdue: 245000,
  totalPending: 369700,
  overdueCount: 12,
  paidCount: 45,
  pendingCount: 18,
  
  monthlyStats: {
    January: { paid: 523200, pending: 245000, overdue: 88200 },
    February: { paid: 0, pending: 124500, overdue: 0 },
    March: { paid: 0, pending: 0, overdue: 0 }
  },

  paymentMethods: [
    { method: 'UPI Payment', count: 18, amount: 245000 },
    { method: 'Bank Transfer', count: 15, amount: 189200 },
    { method: 'Cash', count: 8, amount: 89000 },
    { method: 'Cheque', count: 4, amount: 156000 }
  ]
};
