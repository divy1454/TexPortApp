import React from 'react';
import { View, ScrollView, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Header from '../../components/Header';
import TransactionCard from '../../components/TransactionCard';

const PaymentsScreen = ({ navigation }) => {
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

  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} />
      
      <ScrollView style={styles.content}>
        {/* Due Payment Alert */}
        <LinearGradient
          colors={['#ef4444', '#ec4899']}
          style={styles.alertCard}
        >
          <View style={styles.alertHeader}>
            <Text style={styles.alertTitle}>⚠️ Payment Alerts</Text>
            <View style={styles.alertBadge}>
              <Text style={styles.alertBadgeText}>12 Due</Text>
            </View>
          </View>
          <Text style={styles.alertSubtext}>Total overdue: ₹2,45,000 + ₹12,500 penalty</Text>
          <TouchableOpacity 
            style={styles.alertButton} 
            onPress={() => navigation.navigate('DuePayments')}
          >
            <Text style={styles.alertButtonText}>View All Due Payments</Text>
          </TouchableOpacity>
        </LinearGradient>

        {/* Section Header */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Transactions</Text>
          <TouchableOpacity 
            style={styles.sortButton} 
            onPress={() => navigation.navigate('BillSorting')}
          >
            <Text style={styles.sortButtonText}>📊 Sort Bills</Text>
          </TouchableOpacity>
        </View>

        {/* Transaction List */}
        {transactions.map((transaction) => (
          <TransactionCard
            key={transaction.id}
            transaction={transaction}
            navigation={navigation}
          />
        ))}
      </ScrollView>

      {/* Floating Voice Button */}
      <TouchableOpacity 
        style={styles.floatingVoiceButton} 
        onPress={() => navigation.navigate('VoiceCommand')}
      >
        <LinearGradient
          colors={['#EF4444', '#EC4899']}
          style={styles.floatingVoiceGradient}
        >
          <Text style={styles.micIcon}>🎤</Text>
        </LinearGradient>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  content: {
    flex: 1,
    padding: 16,
    paddingBottom: 100,
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