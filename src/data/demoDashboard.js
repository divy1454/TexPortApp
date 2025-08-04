export const demoDashboard = {
  totalParties: 156,
  totalReceivablePayment: 856400,
  totalGivablePayment: 234500,
  
  // Recent receivable payments (what customers owe us)
  receivablePayments: [
    { 
      id: 1, 
      name: 'Rajesh Cotton Mills', 
      amount: '₹2,45,000', 
      dueDate: '2 days', 
      status: 'overdue' 
    },
    { 
      id: 2, 
      name: 'Mumbai Silk House', 
      amount: '₹78,500', 
      dueDate: '5 days', 
      status: 'due' 
    },
    { 
      id: 3, 
      name: 'Delhi Fashion Hub', 
      amount: '₹1,56,000', 
      dueDate: '1 week', 
      status: 'upcoming' 
    },
    { 
      id: 4, 
      name: 'Chennai Textiles', 
      amount: '₹89,200', 
      dueDate: '3 days', 
      status: 'overdue' 
    },
    { 
      id: 5, 
      name: 'Bangalore Weavers', 
      amount: '₹67,800', 
      dueDate: '1 day', 
      status: 'urgent' 
    }
  ],

  // Recent givable payments (what we owe to suppliers)
  givablePayments: [
    { 
      id: 1, 
      name: 'Gujarat Yarn Suppliers', 
      amount: '₹45,600', 
      dueDate: '4 days', 
      status: 'due' 
    },
    { 
      id: 2, 
      name: 'Cotton Traders Co.', 
      amount: '₹23,400', 
      dueDate: '1 week', 
      status: 'upcoming' 
    },
    { 
      id: 3, 
      name: 'Fabric Wholesalers', 
      amount: '₹78,900', 
      dueDate: '2 days', 
      status: 'overdue' 
    },
    { 
      id: 4, 
      name: 'Thread & Co.', 
      amount: '₹34,200', 
      dueDate: '6 days', 
      status: 'due' 
    },
    { 
      id: 5, 
      name: 'Dye Works Ltd.', 
      amount: '₹52,400', 
      dueDate: '3 days', 
      status: 'upcoming' 
    }
  ],

  // Quick stats for dashboard
  stats: {
    todaysCollection: 45000,
    weeklyGrowth: 12.5,
    monthlyRevenue: 1250000,
    activeCustomers: 89,
    pendingOrders: 23,
    completedDeliveries: 156
  }
};
