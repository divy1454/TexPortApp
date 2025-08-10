import React from 'react';
import { View, ScrollView, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import TransactionCard from '../../../components/TransactionCard';
import Header from '../../../components/Header';
import DemoBanner from '../../../components/DemoBanner';
import { useDemoMode } from '../../context/DemoContext';
import { demoPayments, demoPaymentStats } from '../../data/demoPayments';

const PaymentsScreen = ({ navigation }) => {
  const { demoMode, showDemoAlert } = useDemoMode();

  const transactions = [
    {
      id: 1,
      company: 'Rajesh Cotton Mills',
      invoice: 'TX-2024-156',
      date: 'Jan 20',
      amount: 45000,
      status: 'paid',
      paymentMethod: 'UPI Payment'
    },
    {
      id: 2,
      company: 'Mumbai Silk House',
      invoice: 'TX-2024-142',
      date: 'Jan 15',
      amount: 78500,
      status: 'overdue',
      overdueDays: 5,
      penalty: 1570
    },
    {
      id: 3,
      company: 'Gujarat Textiles Ltd',
      invoice: 'TX-2024-138',
      date: 'Jan 25',
      amount: 125000,
      status: 'pending',
      dueInDays: 5
    }
  ];

  // Get current data based on demo mode
  const currentTransactions = demoMode ? demoPayments : transactions;
  const currentStats = demoMode ? demoPaymentStats : {
    totalOverdue: 245000,
    overdueCount: 12,
    penalty: 12500
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
        {/* Due Payment Alert */}
        <LinearGradient
          colors={['#ef4444', '#ec4899']}
          style={styles.alertCard}
        >
          <View style={styles.alertHeader}>
            <Text style={styles.alertTitle}>⚠️ Payment Alerts</Text>
            <View style={styles.alertBadge}>
              <Text style={styles.alertBadgeText}>{currentStats.overdueCount} Due</Text>
            </View>
          </View>
          <Text style={styles.alertSubtext}>Total overdue: ₹{(currentStats.totalOverdue / 1000).toFixed(0)}K + ₹{(currentStats.penalty / 1000).toFixed(1)}K penalty</Text>
          <TouchableOpacity 
            style={styles.alertButton} 
            onPress={handleDuePaymentsPress}
          >
            <Text style={styles.alertButtonText}>View All Due Payments</Text>
          </TouchableOpacity>
        </LinearGradient>

        {/* Section Header */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Transactions</Text>
          <TouchableOpacity 
            style={styles.sortButton} 
            onPress={handleBillSortingPress}
          >
            <Text style={styles.sortButtonText}>📊 Sort Bills</Text>
          </TouchableOpacity>
        </View>

        {/* Transaction List */}
        {currentTransactions.map((transaction) => (
          <TransactionCard
            key={transaction.id}
            transaction={transaction}
            navigation={navigation}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    paddingTop: 0,
  },
  content: {
    flex: 1,
    padding: 16,
    paddingBottom: 100,
  },
  screenHeader: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  alertCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
  },
  alertHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  alertTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  alertBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },
  alertBadgeText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  alertSubtext: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 14,
    marginBottom: 12,
  },
  alertButton: {
    backgroundColor: 'white',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  alertButtonText: {
    color: '#EF4444',
    fontWeight: '600',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  sortButton: {
    backgroundColor: '#DBEAFE',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
  },
  sortButtonText: {
    color: '#2563EB',
    fontSize: 14,
    fontWeight: '600',
  },
  floatingVoiceButton: {
    position: 'absolute',
    bottom: 120,
    right: 20,
    width: 64,
    height: 64,
    borderRadius: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  floatingVoiceGradient: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  micIcon: {
    fontSize: 32,
  },
});

export default PaymentsScreen;