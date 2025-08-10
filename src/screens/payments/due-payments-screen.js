import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, SafeAreaView, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';

const DuePaymentsScreen = ({ navigation }) => {
  const duePayments = [
    {
      id: 1,
      company: 'Mumbai Silk House',
      amount: 78500,
      penalty: 1570,
      overdueDays: 5,
      invoice: 'TX-2024-142'
    },
    {
      id: 2,
      company: 'Delhi Fashion Hub',
      amount: 45200,
      penalty: 904,
      overdueDays: 2,
      invoice: 'TX-2024-135'
    },
    {
      id: 3,
      company: 'Chennai Textiles',
      amount: 92300,
      penalty: 1846,
      overdueDays: 8,
      invoice: 'TX-2024-128'
    },
    {
      id: 4,
      company: 'Kolkata Cotton Co.',
      amount: 34500,
      penalty: 690,
      overdueDays: 3,
      invoice: 'TX-2024-140'
    }
  ];

  const totalDue = duePayments.reduce((sum, payment) => sum + payment.amount + payment.penalty, 0);

  const sendReminder = (company) => {
    Alert.alert(
      'Reminder Sent!',
      `Payment reminder sent to ${company} via SMS, WhatsApp, and Email.`,
      [{ text: 'OK' }]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="close" size={24} color="#1F2937" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>⚠️ Due Payment Panel</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content}>
        {duePayments.map((payment) => (
          <LinearGradient 
            key={payment.id}
            colors={payment.overdueDays > 5 ? ['#DC2626', '#EF4444'] : ['#F97316', '#EF4444']} 
            style={styles.duePaymentCard}
          >
            <View style={styles.duePaymentHeader}>
              <View>
                <Text style={styles.duePaymentCompany}>{payment.company}</Text>
                <Text style={styles.duePaymentInvoice}>Invoice: {payment.invoice}</Text>
                <Text style={styles.duePaymentOverdue}>{payment.overdueDays} days overdue</Text>
              </View>
              <View style={styles.duePaymentRight}>
                <Text style={styles.duePaymentAmount}>₹{payment.amount.toLocaleString()}</Text>
                <Text style={styles.duePaymentPenalty}>+₹{payment.penalty} penalty</Text>
                <Text style={styles.duePaymentTotal}>₹{(payment.amount + payment.penalty).toLocaleString()}</Text>
              </View>
            </View>
            <View style={styles.duePaymentActions}>
              <TouchableOpacity 
                style={styles.sendReminderButton}
                onPress={() => sendReminder(payment.company)}
              >
                <Text style={styles.sendReminderButtonText}>📱 Send Reminder</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.callButton}>
                <Text style={styles.callButtonText}>📞 Call</Text>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.totalContainer}>
          <View style={styles.duePaymentTotalRow}>
            <Text style={styles.duePaymentTotalLabel}>Total Due + Penalty:</Text>
            <Text style={styles.duePaymentTotalAmount}>₹{totalDue.toLocaleString()}</Text>
          </View>
          <TouchableOpacity style={styles.sendAllRemindersButton}>
            <Text style={styles.sendAllRemindersButtonText}>📢 Send All Reminders</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  duePaymentCard: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  duePaymentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  duePaymentCompany: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  duePaymentInvoice: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 12,
    marginTop: 2,
  },
  duePaymentOverdue: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 14,
    marginTop: 4,
  },
  duePaymentRight: {
    alignItems: 'flex-end',
  },
  duePaymentAmount: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  duePaymentPenalty: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 12,
  },
  duePaymentTotal: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 4,
    textDecorationLine: 'underline',
  },
  duePaymentActions: {
    flexDirection: 'row',
    gap: 12,
  },
  sendReminderButton: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: 'center',
  },
  sendReminderButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  callButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: 'center',
  },
  callButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  footer: {
    backgroundColor: 'white',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  totalContainer: {
    // Added this container
  },
  duePaymentTotalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  duePaymentTotalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  duePaymentTotalAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#EF4444',
  },
  sendAllRemindersButton: {
    backgroundColor: '#EF4444',
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
  },
  sendAllRemindersButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default DuePaymentsScreen;