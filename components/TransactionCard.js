import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useDemoMode } from '../src/context/DemoContext';

const TransactionCard = ({ transaction, navigation }) => {
  const { demoMode, showDemoAlert } = useDemoMode();
  const getStatusColor = (status) => {
    switch (status) {
      case 'paid': return '#10B981';
      case 'overdue': return '#EF4444';
      case 'pending': return '#F59E0B';
      default: return '#6B7280';
    }
  };

  const getStatusText = (transaction) => {
    switch (transaction.status) {
      case 'paid': return '✓ Paid';
      case 'overdue': return `⏰ ${transaction.overdueDays} days overdue`;
      case 'pending': return '⏳ Pending';
      default: return '';
    }
  };

  return (
    <View style={[styles.transactionCard, { borderLeftColor: getStatusColor(transaction.status) }]}>
      <View style={styles.transactionHeader}>
        <View>
          <Text style={styles.transactionCompany}>{transaction.company}</Text>
          <Text style={styles.transactionDetails}>Invoice #{transaction.invoice} • {transaction.date}</Text>
        </View>
        <View style={styles.transactionRight}>
          <Text style={[styles.transactionAmount, { color: getStatusColor(transaction.status) }]}>
            ₹{transaction.amount.toLocaleString()}
          </Text>
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor(transaction.status) + '20' }]}>
            <Text style={[styles.statusBadgeText, { color: getStatusColor(transaction.status) }]}>
              {getStatusText(transaction)}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.transactionFooter}>
        <Text style={styles.transactionPaymentMethod}>
          {transaction.status === 'overdue' ? `Penalty: +₹${transaction.penalty}` : transaction.paymentMethod}
        </Text>
        {transaction.status === 'overdue' && (
          <TouchableOpacity 
            style={styles.reminderButton}
            onPress={() => demoMode && showDemoAlert()}
          >
            <Text style={styles.reminderButtonText}>Send Reminder</Text>
          </TouchableOpacity>
        )}
        {transaction.status === 'pending' && (
          <TouchableOpacity 
            style={styles.payButton}
            onPress={() => demoMode && showDemoAlert()}
          >
            <Text style={styles.payButtonText}>Pay Now</Text>
          </TouchableOpacity>
        )}
        {transaction.status === 'paid' && (
          <TouchableOpacity onPress={() => demoMode && showDemoAlert()}>
            <Text style={styles.viewProofText}>View Proof</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  transactionCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  transactionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  transactionCompany: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  transactionDetails: {
    fontSize: 14,
    color: '#6B7280',
  },
  transactionRight: {
    alignItems: 'flex-end',
  },
  transactionAmount: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 20,
    marginTop: 4,
  },
  statusBadgeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  transactionFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  transactionPaymentMethod: {
    fontSize: 14,
    color: '#6B7280',
  },
  reminderButton: {
    backgroundColor: '#EF4444',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
  },
  reminderButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  payButton: {
    backgroundColor: '#6366F1',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
  },
  payButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  viewProofText: {
    color: '#6366F1',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default TransactionCard;