import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import TransactionCard from '../../components/TransactionCard';
import Header from '../../components/Header';
import DemoBanner from '../../components/DemoBanner';
import { useDemoMode } from '../context/DemoContext';
import { demoPayments, demoPaymentStats } from '../data/demoPayments';
import styles from '../../components/Css/PaymentsScreen.styles';

const PaymentsScreen = ({ navigation }) => {
  const { demoMode, showDemoAlert } = useDemoMode();
  const [filterType, setFilterType] = useState('all'); // 'all', 'given', 'received'

  // Updated transaction data based on your database structure
  const transactions = [
    {
      id: 1,
      party_id: 101,
      party_name: 'Rajesh Cotton Mills',
      payment_type: 'received',
      amount: 45000.00,
      payment_mode: 'online',
      payment_date: '2025-01-20',
      proof_url: 'proof_001.jpg',
      remarks: 'Payment for cotton supply order #CS-2024-156',
      created_at: '2025-01-20 10:30:00'
    },
    {
      id: 2,
      party_id: 102,
      party_name: 'Mumbai Silk House',
      payment_type: 'given',
      amount: 78500.00,
      payment_mode: 'cheque',
      payment_date: '2025-01-15',
      proof_url: null,
      remarks: 'Advance payment for silk fabric order',
      created_at: '2025-01-15 14:22:00'
    },
    {
      id: 3,
      party_id: 103,
      party_name: 'Gujarat Textiles Ltd',
      payment_type: 'received',
      amount: 125000.00,
      payment_mode: 'cash',
      payment_date: '2025-01-25',
      proof_url: 'proof_003.jpg',
      remarks: 'Final payment for textile machinery purchase',
      created_at: '2025-01-25 16:45:00'
    },
    {
      id: 4,
      party_id: 104,
      party_name: 'Delhi Fashion Hub',
      payment_type: 'given',
      amount: 56200.00,
      payment_mode: 'online',
      payment_date: '2025-01-18',
      proof_url: 'proof_004.jpg',
      remarks: 'Payment for designer fabric collection',
      created_at: '2025-01-18 11:15:00'
    },
    {
      id: 5,
      party_id: 105,
      party_name: 'Chennai Weaving Co.',
      payment_type: 'received',
      amount: 89300.00,
      payment_mode: 'cheque',
      payment_date: '2025-01-22',
      proof_url: null,
      remarks: 'Monthly weaving contract payment',
      created_at: '2025-01-22 09:30:00'
    }
  ];

  // Get current data based on demo mode
  const currentTransactions = demoMode ? demoPayments : transactions;
  
  // Filter transactions based on payment type
  const filteredTransactions = currentTransactions.filter(transaction => {
    if (filterType === 'all') return true;
    return transaction.payment_type === filterType;
  });

  // Calculate stats
  const totalReceived = currentTransactions
    .filter(t => t.payment_type === 'received')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const totalGiven = currentTransactions
    .filter(t => t.payment_type === 'given')
    .reduce((sum, t) => sum + t.amount, 0);

  const currentStats = demoMode ? demoPaymentStats : {
    totalReceived,
    totalGiven,
    netBalance: totalReceived - totalGiven,
    transactionCount: currentTransactions.length
  };

  const handleAddPaymentPress = () => {
    if (demoMode) {
      showDemoAlert();
      return;
    }
    navigation.navigate('AddPayment');
  };

  const handleDuePaymentsPress = () => {
    if (demoMode) {
      showDemoAlert();
      return;
    }
    navigation.navigate('DuePayments');
  };

  const handleBillSortingPress = () => {
    if (demoMode) {
      showDemoAlert();
      return;
    }
    navigation.navigate('BillSorting');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} />
      <DemoBanner navigation={navigation} />
      <ScrollView style={styles.content}>
        {/* Payment Summary Card */}
        <LinearGradient
          colors={['#6366F1', '#8B5CF6']}
          style={styles.alertCard}
        >
          <View style={styles.alertHeader}>
            <Text style={styles.alertTitle}>💰 Payment Summary</Text>
            <TouchableOpacity 
              style={styles.alertBadge}
              onPress={handleAddPaymentPress}
            >
              <Icon name="add" size={16} color="white" />
              <Text style={styles.alertBadgeText}>Add Payment</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.summaryRow}>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Received</Text>
              <Text style={styles.summaryValue}>₹{(currentStats.totalReceived / 1000).toFixed(0)}K</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Given</Text>
              <Text style={styles.summaryValue}>₹{(currentStats.totalGiven / 1000).toFixed(0)}K</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Net Balance</Text>
              <Text style={[styles.summaryValue, { 
                color: currentStats.netBalance >= 0 ? '#10B981' : '#EF4444' 
              }]}>
                ₹{(Math.abs(currentStats.netBalance) / 1000).toFixed(0)}K
              </Text>
            </View>
          </View>
        </LinearGradient>

        {/* Filter Buttons */}
        <View style={styles.filterContainer}>
          <TouchableOpacity 
            style={[styles.filterButton, filterType === 'all' && styles.filterButtonActive]}
            onPress={() => setFilterType('all')}
          >
            <Text style={[styles.filterButtonText, filterType === 'all' && styles.filterButtonTextActive]}>
              All ({currentTransactions.length})
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.filterButton, filterType === 'received' && styles.filterButtonActive]}
            onPress={() => setFilterType('received')}
          >
            <Text style={[styles.filterButtonText, filterType === 'received' && styles.filterButtonTextActive]}>
              ↓ Received ({currentTransactions.filter(t => t.payment_type === 'received').length})
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.filterButton, filterType === 'given' && styles.filterButtonActive]}
            onPress={() => setFilterType('given')}
          >
            <Text style={[styles.filterButtonText, filterType === 'given' && styles.filterButtonTextActive]}>
              ↑ Given ({currentTransactions.filter(t => t.payment_type === 'given').length})
            </Text>
          </TouchableOpacity>
        </View>

        {/* Section Header */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Payment Transactions</Text>
          <TouchableOpacity 
            style={styles.sortButton} 
            onPress={handleBillSortingPress}
          >
            <Text style={styles.sortButtonText}>📊 Sort</Text>
          </TouchableOpacity>
        </View>

        {/* Transaction List */}
        {filteredTransactions.length > 0 ? (
          filteredTransactions.map((transaction) => (
            <TransactionCard
              key={transaction.id}
              transaction={transaction}
              navigation={navigation}
            />
          ))
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No {filterType === 'all' ? '' : filterType} payments found</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default PaymentsScreen;